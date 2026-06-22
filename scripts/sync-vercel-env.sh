#!/usr/bin/env bash
# Push .env.local variables to Vercel (production + preview + development)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env.local ]]; then
  echo "ERROR: .env.local not found. Run ./scripts/setup-gcp-auth.sh and ./scripts/sync-owner-env.sh first."
  exit 1
fi

if ! command -v vercel >/dev/null; then
  echo "ERROR: vercel CLI not installed. Run: npm install -g vercel"
  exit 1
fi

if [[ ! -d .vercel ]]; then
  echo "Linking to Vercel project kem-llc..."
  vercel link --yes --project kem-llc --scope rknptls-projects
fi

node <<'NODE'
const fs = require('fs')
const { spawnSync } = require('child_process')

const ENV_FILE = '.env.local'
const SKIP = new Set(['GCP_PROJECT_ID', 'GCP_PROJECT_NUMBER', 'FIREBASE_WEB_APP_ID', 'FIREBASE_HOSTING_SITE', 'BILLING_ALERT_EMAIL', 'PORT'])
const SENSITIVE = new Set([
  'FIREBASE_API_KEY',
  'GOOGLE_SERVICE_ACCOUNT_JSON',
  'OWNER_GITHUB_TOKEN',
  'DEEPSEEK_API_KEY',
  'GMAIL_APP_PASSWORD',
])

function parseEnv(content) {
  const out = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq)
    const value = trimmed.slice(eq + 1)
    if (value !== '') out[key] = value
  }
  return out
}

const env = parseEnv(fs.readFileSync(ENV_FILE, 'utf8'))
const keys = Object.keys(env).filter((k) => !SKIP.has(k)).sort()

console.log(`Pushing ${keys.length} variables to Vercel (production, preview, development)...`)

const TARGETS = ['production', 'preview', 'development']

for (const key of keys) {
  const value = env[key]
  for (const target of TARGETS) {
    const args = [
      'env', 'add', key, target,
      '--yes', '--force',
    ]
    if (SENSITIVE.has(key) && target !== 'development') args.push('--sensitive')
    else args.push('--no-sensitive')

    const result = spawnSync('vercel', args, {
      input: value,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf8',
    })

    if (result.status !== 0) {
      console.error(`FAIL ${key} (${target}): ${(result.stderr || result.stdout || '').trim()}`)
      process.exit(1)
    }
  }
  console.log(`  ok ${key}`)
}

console.log('Vercel env sync complete.')
NODE

echo "Run 'vercel --prod' to redeploy with new env vars."
