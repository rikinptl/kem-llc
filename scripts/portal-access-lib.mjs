import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const LOCAL_ENV_PATH = path.join(ROOT, '.env.local')

/** Never start onboarding from an empty owner list — avoids wiping production access. */
export const BOOTSTRAP_OWNERS = ['kem.sales.us@gmail.com', 'rikinpatel03@gmail.com']

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function parseEmailCsv(raw) {
  return String(raw || '')
    .split(',')
    .map(normalizeEmail)
    .filter(Boolean)
}

function uniqueSorted(list) {
  return [...new Set(list.map(normalizeEmail).filter(Boolean))].sort()
}

export function loadConfigFromEnvMap(map) {
  let owners = parseEmailCsv(map.VITE_OWNER_EMAILS || map.OWNER_EMAILS)
  const colleagues = parseEmailCsv(map.VITE_COLLEAGUE_EMAILS || map.COLLEAGUE_EMAILS)
  if (owners.length === 0) {
    owners = [...BOOTSTRAP_OWNERS]
  }
  return { owners: uniqueSorted(owners), colleagues: uniqueSorted(colleagues) }
}

function parseEnvFile(content) {
  const out = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    out[trimmed.slice(0, eq)] = trimmed.slice(eq + 1)
  }
  return out
}

export function loadConfigFromLocalEnv() {
  if (!fs.existsSync(LOCAL_ENV_PATH)) {
    throw new Error('Missing .env.local — run ./scripts/sync-owner-env.sh or set Vercel credentials for remote access')
  }
  return loadConfigFromEnvMap(parseEnvFile(fs.readFileSync(LOCAL_ENV_PATH, 'utf8')))
}

export function saveConfigToLocalEnv(data) {
  const env = derivePortalEnv(data)
  let lines = []
  if (fs.existsSync(LOCAL_ENV_PATH)) {
    lines = fs.readFileSync(LOCAL_ENV_PATH, 'utf8').split('\n')
  }

  const keysToReplace = new Set([
    'OWNER_EMAILS',
    'COLLEAGUE_EMAILS',
    'VITE_OWNER_EMAILS',
    'VITE_COLLEAGUE_EMAILS',
    'VITE_ALLOWED_EMAILS',
  ])

  const kept = lines.filter((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return true
    const key = trimmed.split('=')[0]
    return !keysToReplace.has(key)
  })

  const block = [
    '',
    '# Portal access (local only — production source of truth is Vercel env)',
    `OWNER_EMAILS=${env.OWNER_EMAILS}`,
    `COLLEAGUE_EMAILS=${env.COLLEAGUE_EMAILS}`,
    `VITE_OWNER_EMAILS=${env.VITE_OWNER_EMAILS}`,
    `VITE_COLLEAGUE_EMAILS=${env.VITE_COLLEAGUE_EMAILS}`,
    `VITE_ALLOWED_EMAILS=${env.VITE_ALLOWED_EMAILS}`,
  ]

  fs.writeFileSync(LOCAL_ENV_PATH, `${kept.join('\n').replace(/\n+$/, '')}${block.join('\n')}\n`)
  return {
    owners: uniqueSorted(data.owners),
    colleagues: uniqueSorted(data.colleagues),
  }
}

export function derivePortalEnv(data) {
  const owners = uniqueSorted(data.owners)
  const colleagues = uniqueSorted(data.colleagues)
  const allowed = uniqueSorted([...owners, ...colleagues])

  return {
    VITE_OWNER_EMAILS: owners.join(','),
    VITE_COLLEAGUE_EMAILS: colleagues.join(','),
    VITE_ALLOWED_EMAILS: allowed.join(','),
    OWNER_EMAILS: owners.join(','),
    COLLEAGUE_EMAILS: colleagues.join(','),
  }
}

export function applyPortalUserChange(data, email, role, action) {
  const normalized = normalizeEmail(email)
  if (!isValidEmail(normalized)) throw new Error(`Invalid email: ${email}`)
  if (role !== 'owner' && role !== 'colleague') {
    throw new Error(`Role must be owner or colleague (got ${role})`)
  }
  if (action !== 'add' && action !== 'remove') {
    throw new Error(`Action must be add or remove (got ${action})`)
  }

  const next = {
    owners: [...data.owners],
    colleagues: [...data.colleagues],
  }

  if (action === 'add') {
    if (role === 'owner') {
      next.colleagues = next.colleagues.filter((e) => e !== normalized)
      if (!next.owners.includes(normalized)) next.owners.push(normalized)
    } else {
      if (next.owners.includes(normalized)) {
        throw new Error(`${normalized} is already an owner — remove owner access first if demoting`)
      }
      if (!next.colleagues.includes(normalized)) next.colleagues.push(normalized)
    }
  } else if (role === 'owner') {
    next.owners = next.owners.filter((e) => e !== normalized)
    if (next.owners.length === 0) throw new Error('Cannot remove the last owner')
  } else {
    next.colleagues = next.colleagues.filter((e) => e !== normalized)
  }

  return {
    owners: uniqueSorted(next.owners),
    colleagues: uniqueSorted(next.colleagues),
  }
}

export function redactConfigSummary(data) {
  return {
    ownerCount: data.owners.length,
    colleagueCount: data.colleagues.length,
  }
}

export function maskEmail(email) {
  const normalized = normalizeEmail(email)
  const [local, domain] = normalized.split('@')
  if (!domain) return '***'
  const visible = local.slice(0, 2)
  return `${visible}***@${domain}`
}
