#!/usr/bin/env bash
# Sync kemtrade.us OAuth redirect URIs via Firebase auth deploy (updates GCP OAuth client).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROJECT_ID="${GCP_PROJECT_ID:-kem-llc-web}"

echo "==> Syncing Google OAuth redirect URIs for ${PROJECT_ID}..."
echo "    Domains: kemtrade.us, www.kemtrade.us, firebaseapp.com, localhost"
firebase deploy --only auth --project "$PROJECT_ID"
echo "✓ Done. Retry Google sign-in at https://kemtrade.us/login"
