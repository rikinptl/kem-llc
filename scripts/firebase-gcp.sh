#!/usr/bin/env bash
# KEM — Firebase/GCP operations via gcloud (no firebase login required)
set -euo pipefail

export PATH="/opt/homebrew/bin:$PATH"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Load project env
if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

PROJECT_ID="${GCP_PROJECT_ID:-kem-llc-web}"
PROJECT_NUMBER="${GCP_PROJECT_NUMBER:-238231316646}"

require_gcloud() {
  if ! gcloud auth list --format='value(account)' 2>/dev/null | grep -q .; then
    echo "ERROR: Run: gcloud auth login"
    exit 1
  fi
}

token() {
  gcloud auth print-access-token
}

api() {
  local method="$1"
  local url="$2"
  local data="${3:-}"
  local t
  t=$(token)
  if [[ -n "$data" ]]; then
    curl -sf -X "$method" "$url" \
      -H "Authorization: Bearer ${t}" \
      -H "x-goog-user-project: ${PROJECT_ID}" \
      -H "Content-Type: application/json" \
      -d "$data"
  else
    curl -sf -X "$method" "$url" \
      -H "Authorization: Bearer ${t}" \
      -H "x-goog-user-project: ${PROJECT_ID}"
  fi
}

cmd_status() {
  require_gcloud
  echo "Account: $(gcloud auth list --format='value(account)' | head -1)"
  echo "Project: ${PROJECT_ID} (${PROJECT_NUMBER})"
  api GET "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}" | node -e \
    "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d);console.log('Firebase state:', j.state);})"
  api GET "https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/defaultSupportedIdpConfigs" | node -e \
    "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d);const g=j.defaultSupportedIdpConfigs?.find(x=>x.name?.includes('google'));console.log('Google sign-in:', g?.enabled ? 'enabled' : 'disabled');})"
}

cmd_deploy_rules() {
  require_gcloud
  local ruleset
  ruleset=$(python3 -c "import json; print(json.dumps(open('firestore.rules').read()))")
  local resp name
  resp=$(api POST "https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/rulesets" \
    "{\"source\":{\"files\":[{\"name\":\"firestore.rules\",\"content\":${ruleset}}]}}")
  name=$(echo "$resp" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{console.log(JSON.parse(d).name||'')})")
  api POST "https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/releases" \
    "{\"name\":\"projects/${PROJECT_ID}/releases/cloud.firestore\",\"rulesetName\":\"${name}\"}" >/dev/null
  echo "Firestore rules deployed: ${name}"
}

cmd_sync_domains() {
  require_gcloud
  local domains
  domains='["localhost","kemtrade.us","www.kemtrade.us","'"${PROJECT_ID}"'.firebaseapp.com","'"${PROJECT_ID}"'.web.app"]'
  api PATCH \
    "https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/config?updateMask=authorizedDomains" \
    "{\"authorizedDomains\":${domains}}" \
    | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d);console.log('Authorized domains:',(j.authorizedDomains||[]).join(', '));})"
}

cmd_help() {
  cat <<EOF
Usage: ./scripts/firebase-gcp.sh <command>

Commands:
  status         Show Firebase + Google sign-in status
  sync-domains   Add kemtrade.us + localhost to Firebase authorized domains
  deploy-rules   Deploy firestore.rules to ${PROJECT_ID}

Uses gcloud auth + .env.local (no firebase login required).
EOF
}

case "${1:-help}" in
  status) cmd_status ;;
  sync-domains) cmd_sync_domains ;;
  deploy-rules) cmd_deploy_rules ;;
  *) cmd_help ;;
esac
