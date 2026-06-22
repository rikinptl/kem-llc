#!/usr/bin/env node
/**
 * Manage portal owner/colleague allowlists stored in Vercel env (production source of truth).
 *
 * Usage:
 *   node scripts/portal-access.mjs show [--redact]
 *   node scripts/portal-access.mjs add --email user@gmail.com --role owner|colleague
 *   node scripts/portal-access.mjs remove --email user@gmail.com --role owner|colleague
 *   node scripts/portal-access.mjs export-env [--redact]
 *
 * Requires VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID for remote read/write.
 * Without Vercel creds, reads/writes .env.local only (local dev).
 */

import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import {
  applyPortalUserChange,
  derivePortalEnv,
  loadConfigFromLocalEnv,
  loadConfigFromEnvMap,
  maskEmail,
  normalizeEmail,
  redactConfigSummary,
  saveConfigToLocalEnv,
} from './portal-access-lib.mjs'
import {
  deployVercelProduction,
  loadVercelAccessEnvMap,
  writeVercelAccessEnv,
} from './vercel-access.mjs'

function parseArgs(argv) {
  const args = { _: [], redact: false }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--redact') {
      args.redact = true
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) {
        args[key] = next
        i += 1
      } else {
        args[key] = true
      }
    } else {
      args._.push(arg)
    }
  }
  return args
}

function hasVercelCreds() {
  return Boolean(process.env.VERCEL_TOKEN && process.env.VERCEL_ORG_ID && process.env.VERCEL_PROJECT_ID)
}

async function loadConfig() {
  if (hasVercelCreds()) {
    const map = await loadVercelAccessEnvMap()
    return loadConfigFromEnvMap(map)
  }
  return loadConfigFromLocalEnv()
}

function setGithubSecret(key, value) {
  if (process.env.SKIP_GH_SECRETS === '1') return
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
  if (!token || !process.env.GITHUB_REPOSITORY) return

  const result = spawnSync('gh', ['secret', 'set', key, '--repo', process.env.GITHUB_REPOSITORY], {
    input: value || ' ',
    stdio: ['pipe', 'pipe', 'pipe'],
    encoding: 'utf8',
    env: { ...process.env, GH_TOKEN: token, GITHUB_TOKEN: token },
  })
  if (result.status !== 0) {
    console.warn(`  warn: could not set GitHub secret ${key}`)
    return
  }
  console.log(`  github secret ok ${key}`)
}

async function persistConfig(data, { deploy = true } = {}) {
  const env = derivePortalEnv(data)

  if (hasVercelCreds()) {
    console.log('Writing portal access env to Vercel...')
    await writeVercelAccessEnv(env)
    console.log('Updating GitHub secrets...')
    setGithubSecret('OWNER_EMAILS', env.OWNER_EMAILS)
    setGithubSecret('COLLEAGUE_EMAILS', env.COLLEAGUE_EMAILS)
    if (deploy) await deployVercelProduction()
  } else {
    saveConfigToLocalEnv(data)
    console.log('Updated .env.local (local dev). Set VERCEL_* creds to push to production.')
  }

  return env
}

function formatOutput(data, env, redact) {
  if (redact) {
    return {
      summary: redactConfigSummary(data),
      env: {
        ownerCount: data.owners.length,
        colleagueCount: data.colleagues.length,
      },
    }
  }
  return { ...data, env }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const command = args._[0] || 'show'

  if (command === 'show') {
    const data = await loadConfig()
    const env = derivePortalEnv(data)
    console.log(JSON.stringify(formatOutput(data, env, args.redact), null, 2))
    return
  }

  if (command === 'export-env') {
    const data = await loadConfig()
    const env = derivePortalEnv(data)
    if (args.redact) {
      console.log(JSON.stringify(redactConfigSummary(data), null, 2))
    } else {
      console.log(JSON.stringify(env, null, 2))
    }
    return
  }

  if (command === 'add' || command === 'remove') {
    const email = args.email
    const role = args.role
    if (!email || !role) {
      throw new Error('Usage: add|remove --email user@gmail.com --role owner|colleague')
    }

    const current = await loadConfig()
    const updated = applyPortalUserChange(current, email, role, command)
    const changed =
      updated.owners.join(',') !== current.owners.join(',') ||
      updated.colleagues.join(',') !== current.colleagues.join(',')

    if (!changed) {
      console.log(JSON.stringify({ action: command, changed: false, email: maskEmail(email), role }, null, 2))
      return
    }

    await persistConfig(updated, { deploy: args.deploy !== 'false' })
    console.log(
      JSON.stringify(
        {
          action: command,
          changed: true,
          email: args.redact ? maskEmail(email) : normalizeEmail(email),
          role,
          summary: redactConfigSummary(updated),
        },
        null,
        2
      )
    )
    return
  }

  throw new Error(`Unknown command: ${command}`)
}

const entry = process.argv[1] ? fileURLToPath(import.meta.url) : ''
if (process.argv[1] && entry === process.argv[1]) {
  main().catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })
}
