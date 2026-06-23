#!/usr/bin/env bash
# Sync kemtrade.us OAuth settings via Firebase (Option 3 from Firebase redirect best practices).
# Registers kemtrade.us with the GCP OAuth client used by Google sign-in.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROJECT_ID="${GCP_PROJECT_ID:-kem-llc-web}"

echo "==> Syncing Google OAuth for ${PROJECT_ID} (kemtrade.us custom auth domain)..."
firebase deploy --only auth --project "$PROJECT_ID"
echo "✓ OAuth client updated. authDomain must be kemtrade.us with /__/auth proxied on Vercel."
