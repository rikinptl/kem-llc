/**
 * Read/write portal access lists via Vercel project env vars.
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
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
    const prev = map[entry.key]
    const prevTs = prev?.updatedAt || prev?.createdAt || 0
    const nextTs = entry.updatedAt || entry.createdAt || 0
    if (prev === undefined || nextTs >= prevTs) {
      map[entry.key] = entry
    }
  }
  const out = {}
  for (const [key, entry] of Object.entries(map)) {
    out[key] = entry.value ?? ''
  }
  return out
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

function envTypeForKey(key) {
  return key.startsWith('VITE_') ? 'plain' : 'encrypted'
}

function teamQuery(orgId) {
  return orgId ? `?teamId=${encodeURIComponent(orgId)}` : ''
}

async function deleteVercelEnvEntry({ token, orgId, projectId, id }) {
  const res = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/env/${id}${teamQuery(orgId)}`,
    {
      method: 'DELETE',
      headers: vercelHeaders(token),
    }
  )
  if (!res.ok && res.status !== 404) {
    throw new Error(`DELETE env/${id} failed (${res.status}): ${await res.text()}`)
  }
}

async function upsertVercelEnvEntry({ token, orgId, projectId, key, value, target, envs }) {
  const matches = envs.filter((entry) => entry.key === key && entry.target?.includes(target))
  for (const entry of matches) {
    await deleteVercelEnvEntry({ token, orgId, projectId, id: entry.id })
  }

  const type = envTypeForKey(key)
  const res = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env${teamQuery(orgId)}`, {
    method: 'POST',
    headers: { ...vercelHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value, type, target: [target] }),
  })
  if (!res.ok) {
    throw new Error(`POST ${key}/${target} failed (${res.status}): ${await res.text()}`)
  }
  return res.json()
}

export async function writeVercelAccessEnv(envValues, rootDir = ROOT) {
  linkVercelProject(rootDir)
  const token = requireEnv('VERCEL_TOKEN')
  const orgId = requireEnv('VERCEL_ORG_ID')
  const projectId = requireEnv('VERCEL_PROJECT_ID')
  const envs = await fetchVercelProjectEnv({ token, orgId, projectId })

  for (const key of ACCESS_ENV_KEYS) {
    const value = envValues[key] ?? ''
    for (const target of TARGETS) {
      await upsertVercelEnvEntry({ token, orgId, projectId, key, value, target, envs })
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
