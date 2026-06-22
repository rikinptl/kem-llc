#!/usr/bin/env bash
# One-time Firebase auth setup for CLI + MCP (pick one method)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> KEM Firebase auth setup"
echo ""

# Method 1 (recommended): Application Default Credentials via gcloud
if [[ -f "$HOME/.config/gcloud/application_default_credentials.json" ]]; then
  echo "✓ ADC already exists: ~/.config/gcloud/application_default_credentials.json"
  echo "  Firebase MCP uses this automatically (via scripts/firebase-mcp.sh)."
else
  echo "==> Setting up Application Default Credentials (recommended)..."
  echo "    A browser window will open — sign in with rikinpatel03@gmail.com"
  gcloud auth application-default login
  echo "✓ ADC created."
fi

echo ""
echo "==> Verifying gcloud account..."
gcloud auth list --filter=status:ACTIVE --format='value(account)' | head -1

echo ""
echo "==> Verifying Firebase project access..."
firebase projects:list --project kem-llc-web 2>/dev/null | grep kem-llc-web || true

echo ""
echo "Optional — CI token (only if ADC is not enough for MCP):"
echo "  firebase login:ci --no-localhost"
echo "  Then add to .env.local:  FIREBASE_TOKEN=<token>"
echo "  (Never commit .env.local)"
echo ""
echo "Done. Reload Cursor to pick up MCP changes."
