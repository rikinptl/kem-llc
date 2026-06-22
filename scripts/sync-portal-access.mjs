#!/usr/bin/env node
/**
 * Resync portal access env vars on Vercel from current production values, then redeploy.
 *
 * Required env:
 *   VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
 */

import { spawnSync } from 'child_process'
import { derivePortalEnv, loadConfigFromEnvMap, redactConfigSummary } from './portal-access-lib.mjs'
import {
  deployVercelProduction,
  loadVercelAccessEnvMap,
  writeVercelAccessEnv,
} from './vercel-access.mjs'

function setGithubSecret(key, value) {
  if (process.env.SKIP_GH_SECRETS === '1') return
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
  if (!token || !process.env.GITHUB_REPOSITORY) {
    console.log('  skip GitHub secrets (no token/repo)')
    return
  }

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

async function main() {
  const map = await loadVercelAccessEnvMap()
  const data = loadConfigFromEnvMap(map)
  const env = derivePortalEnv(data)

  console.log('Current portal access (counts only):')
  console.log(JSON.stringify(redactConfigSummary(data), null, 2))

  console.log('\nSyncing to Vercel (production, preview, development)...')
  await writeVercelAccessEnv(env)

  console.log('\nSyncing GitHub secrets...')
  setGithubSecret('OWNER_EMAILS', env.OWNER_EMAILS)
  setGithubSecret('COLLEAGUE_EMAILS', env.COLLEAGUE_EMAILS)

  await deployVercelProduction()
  console.log('\nPortal access sync complete.')
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
