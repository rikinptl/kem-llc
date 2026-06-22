/**
 * Read/write portal access lists via Vercel project env vars.
 */

import fs from 'fs'
import path from 'path'
import { execSync, spawnSync } from 'child_process'
import { fileURLToPath } from 'url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TARGETS = ['production', 'preview', 'development']

export const ACCESS_ENV_KEYS = [
  'VITE_OWNER_EMAILS',
  'VITE_COLLEAGUE_EMAILS',
  'VITE_ALLOWED_EMAILS',
  'OWNER_EMAILS',
  'COLLEAGUE_EMAILS',
]

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

function vercelHeaders(token) {
  return { Authorization: `Bearer ${token}` }
}

export async function fetchVercelProjectEnv({ token, orgId, projectId, decrypt = true }) {
  const url = new URL(`https://api.vercel.com/v9/projects/${projectId}/env`)
  if (decrypt) url.searchParams.set('decrypt', 'true')
  if (orgId) url.searchParams.set('teamId', orgId)

  const res = await fetch(url, { headers: vercelHeaders(token) })
  if (!res.ok) {
    throw new Error(`Vercel env fetch failed (${res.status}): ${await res.text()}`)
  }

  const data = await res.json()
  return data.envs || []
}

export function envMapForTarget(envs, target = 'production') {
  const map = {}
  for (const entry of envs) {
    if (!entry.target?.includes(target)) continue
    if (map[entry.key] === undefined) {
      map[entry.key] = entry.value ?? ''
    }
  }
  return map
}

export async function loadVercelAccessEnvMap() {
  const token = requireEnv('VERCEL_TOKEN')
  const orgId = requireEnv('VERCEL_ORG_ID')
  const projectId = requireEnv('VERCEL_PROJECT_ID')
  const envs = await fetchVercelProjectEnv({ token, orgId, projectId })
  return envMapForTarget(envs, 'production')
}

export function linkVercelProject(rootDir = ROOT) {
  const orgId = requireEnv('VERCEL_ORG_ID')
  const projectId = requireEnv('VERCEL_PROJECT_ID')
  const dir = path.join(rootDir, '.vercel')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'project.json'), `${JSON.stringify({ orgId, projectId })}\n`)
}

export async function writeVercelAccessEnv(envValues, rootDir = ROOT) {
  linkVercelProject(rootDir)
  const token = requireEnv('VERCEL_TOKEN')

  for (const key of ACCESS_ENV_KEYS) {
    const value = envValues[key] ?? ''
    for (const target of TARGETS) {
      const result = spawnSync(
        'npx',
        ['--yes', 'vercel@latest', 'env', 'add', key, target, '--force', '--yes', '--token', token],
        {
          cwd: rootDir,
          input: value || ' ',
          stdio: ['pipe', 'pipe', 'pipe'],
          encoding: 'utf8',
          env: process.env,
        }
      )
      if (result.status !== 0) {
        throw new Error((result.stderr || result.stdout || `vercel env add ${key} failed`).trim())
      }
    }
    console.log(`  vercel ok ${key}`)
  }
}

export async function deployVercelProduction(rootDir = ROOT) {
  if (process.env.SKIP_DEPLOY === '1') {
    console.log('Skipping production deploy (SKIP_DEPLOY=1)')
    return
  }

  const token = requireEnv('VERCEL_TOKEN')
  console.log('Triggering Vercel production deploy (rebuilds client with new VITE_* vars)...')
  execSync(`npx --yes vercel@latest deploy --prod --yes --token "${token}"`, {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
  })
}
