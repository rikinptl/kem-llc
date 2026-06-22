#!/usr/bin/env bash
# Wrapper for Firebase MCP — loads ADC + optional .env.local (FIREBASE_TOKEN)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export GOOGLE_CLOUD_QUOTA_PROJECT="${GOOGLE_CLOUD_QUOTA_PROJECT:-kem-llc-web}"

if [[ -f "$ROOT/.env.local" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env.local"
  set +a
fi

# Prefer FIREBASE_TOKEN from .env.local, else ADC
if [[ -z "${FIREBASE_TOKEN:-}" ]]; then
  export GOOGLE_APPLICATION_CREDENTIALS="${GOOGLE_APPLICATION_CREDENTIALS:-$HOME/.config/gcloud/application_default_credentials.json}"
fi

exec npx -y firebase-tools@latest mcp \
  --dir "$ROOT" \
  --only auth,firestore
