#!/usr/bin/env bash
# Sync owner-dashboard secrets from web-auto local config into .env.local + GitHub secrets
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAGS="${RAGS_ROOT:-/Users/rknptl/rags_2_riches}"
SA_KEY="${RAGS}/keys/web-auto-499817-522c3ddbb89d.json"
WEB_AUTO_ENV="${RAGS}/web-auto/.env"

if [[ ! -f "$SA_KEY" ]]; then
  echo "ERROR: Service account key not found at $SA_KEY"
  exit 1
fi
if [[ ! -f "$WEB_AUTO_ENV" ]]; then
  echo "ERROR: web-auto .env not found at $WEB_AUTO_ENV"
  exit 1
fi

# shellcheck disable=SC1090
source "$WEB_AUTO_ENV"

GITHUB_TOKEN_VAL="${OWNER_GITHUB_TOKEN:-${GITHUB_TOKEN:-$(gh auth token 2>/dev/null || true)}}"
SA_JSON="$(python3 -c "import json; print(json.dumps(json.load(open('$SA_KEY'))))")"

# Preserve Firebase API key from existing .env.local (not in web-auto .env)
EXISTING_FIREBASE_API_KEY=""
if [[ -f "$ROOT/.env.local" ]]; then
  EXISTING_FIREBASE_API_KEY="$(grep -E '^VITE_FIREBASE_API_KEY=' "$ROOT/.env.local" | head -1 | cut -d= -f2- || true)"
  if [[ -z "$EXISTING_FIREBASE_API_KEY" ]]; then
    EXISTING_FIREBASE_API_KEY="$(grep -E '^FIREBASE_API_KEY=' "$ROOT/.env.local" | head -1 | cut -d= -f2- || true)"
  fi
fi

OWNER_BLOCK="
# ── Owner dashboard (server-side — Vercel + local vercel dev) ───────────────
OWNER_EMAILS=kem.sales.us@gmail.com,rikinpatel03@gmail.com
VITE_OWNER_EMAILS=kem.sales.us@gmail.com,rikinpatel03@gmail.com
FIREBASE_API_KEY=${EXISTING_FIREBASE_API_KEY}
GOOGLE_SERVICE_ACCOUNT_JSON=${SA_JSON}
GOOGLE_SHEETS_SPREADSHEET_ID=${GOOGLE_SHEETS_SPREADSHEET_ID}
GOOGLE_SHEETS_URL=${GOOGLE_SHEETS_URL:-}
OWNER_GITHUB_TOKEN=${GITHUB_TOKEN_VAL}
OWNER_GITHUB_REPO=rikinptl/web-auto
GITHUB_ACTIONS_URL=https://github.com/rikinptl/web-auto/actions/workflows/deploy.yml
DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
DEEPSEEK_EST_COST_PER_SITE=0.03
DEEPSEEK_EST_TOKENS_PER_SITE=4500
DEPLOY_ORG=kem-llc
"

# Preserve existing .env.local lines not in owner block
if [[ -f "$ROOT/.env.local" ]]; then
  grep -v '^GOOGLE_SERVICE_ACCOUNT_JSON=' "$ROOT/.env.local" | \
    grep -v '^OWNER_GITHUB_TOKEN=' | \
    grep -v '^DEEPSEEK_API_KEY=' | \
    grep -v '^OWNER_EMAILS=' | \
    grep -v '^VITE_OWNER_EMAILS=' | \
    grep -v '^FIREBASE_API_KEY=' | \
    grep -v '^GOOGLE_SHEETS_' | \
    grep -v '^OWNER_GITHUB_REPO=' | \
    grep -v '^GITHUB_ACTIONS_URL=' | \
    grep -v '^DEEPSEEK_EST_' | \
    grep -v '^DEPLOY_ORG=' | \
    grep -v '^# ── Owner dashboard' > "$ROOT/.env.local.tmp" || true
  mv "$ROOT/.env.local.tmp" "$ROOT/.env.local"
fi

{
  cat "$ROOT/.env.local" 2>/dev/null || true
  echo "$OWNER_BLOCK"
} > "$ROOT/.env.local.next"
mv "$ROOT/.env.local.next" "$ROOT/.env.local"

echo "Updated $ROOT/.env.local"

if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
  REPO="rikinptl/kem-llc"
  echo "Setting GitHub secrets on $REPO..."
  gh secret set GOOGLE_SERVICE_ACCOUNT_JSON --body "$SA_JSON" --repo "$REPO"
  gh secret set GOOGLE_SHEETS_SPREADSHEET_ID --body "$GOOGLE_SHEETS_SPREADSHEET_ID" --repo "$REPO"
  gh secret set GOOGLE_SHEETS_URL --body "${GOOGLE_SHEETS_URL:-}" --repo "$REPO"
  gh secret set DEEPSEEK_API_KEY --body "$DEEPSEEK_API_KEY" --repo "$REPO"
  gh secret set OWNER_GITHUB_TOKEN --body "$GITHUB_TOKEN_VAL" --repo "$REPO"
  gh secret set OWNER_GITHUB_REPO --body "rikinptl/web-auto" --repo "$REPO"
  gh secret set OWNER_EMAILS --body "kem.sales.us@gmail.com,rikinpatel03@gmail.com" --repo "$REPO"
  gh secret set DEPLOY_ORG --body "kem-llc" --repo "$REPO"
  echo "GitHub secrets updated."
else
  echo "WARN: gh not authenticated — skipped GitHub secrets"
fi

echo "Done. Run ./scripts/sync-vercel-env.sh to push server-side vars to Vercel."
