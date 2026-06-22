#!/usr/bin/env bash
# Interactive: browser OAuth → writes FIREBASE_TOKEN to .env.local
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
ENV_FILE="$ROOT/.env.local"
OUTPUT="/tmp/kem-firebase-login-ci.txt"

echo "=============================================="
echo "  KEM — Firebase CI token setup"
echo "=============================================="
echo ""
echo "A browser window will open. Sign in with rikinpatel03@gmail.com"
echo "When done, this script saves FIREBASE_TOKEN to .env.local"
echo ""

firebase login:ci 2>&1 | tee "$OUTPUT"

TOKEN="$(node <<'NODE'
const fs = require('fs')
const text = fs.readFileSync('/tmp/kem-firebase-login-ci.txt', 'utf8')
const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
// Token is the line after "Success!" or a long token-like string
for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i]
  if (line.startsWith('Error') || line.startsWith('⚠') || line.startsWith('✔')) continue
  if (line.length > 20 && !line.includes(' ')) {
    console.log(line)
    process.exit(0)
  }
}
process.exit(1)
NODE
)" || {
  echo ""
  echo "ERROR: Could not parse token from firebase login:ci output."
  echo "Check $OUTPUT and add FIREBASE_TOKEN manually to .env.local"
  exit 1
}

# Merge into .env.local (preserve other vars)
if [[ -f "$ENV_FILE" ]]; then
  grep -v '^FIREBASE_TOKEN=' "$ENV_FILE" | grep -v '^# Firebase CLI token' > "$ENV_FILE.tmp" || true
  mv "$ENV_FILE.tmp" "$ENV_FILE"
fi

{
  echo "# Firebase CLI token (from firebase login:ci — never commit)"
  echo "FIREBASE_TOKEN=${TOKEN}"
  echo ""
  cat "$ENV_FILE" 2>/dev/null || true
} > "$ENV_FILE.new"
mv "$ENV_FILE.new" "$ENV_FILE"

echo ""
echo "✓ FIREBASE_TOKEN saved to .env.local"
echo "  Reload Cursor so Firebase MCP picks it up."
echo ""
read -r -p "Press Enter to close this window..."
