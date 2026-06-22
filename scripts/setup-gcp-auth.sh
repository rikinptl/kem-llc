#!/usr/bin/env bash
# KEM LLC — GCP + Firebase Auth setup (run after: gcloud auth login && firebase login)
set -euo pipefail

export PATH="/opt/homebrew/bin:$PATH"

# ── Config (override via env) ────────────────────────────────────────────────
PROJECT_ID="${GCP_PROJECT_ID:-kem-llc-web}"
PROJECT_NAME="${GCP_PROJECT_NAME:-KEM LLC Web}"
REGION="${GCP_REGION:-us-central1}"
BILLING_EMAIL="${BILLING_ALERT_EMAIL:-kem.sales.us@gmail.com}"
WEB_APP_NAME="${FIREBASE_WEB_APP_NAME:-kem-llc-website}"
ALLOWED_EMAILS="${ALLOWED_EMAILS:-kem.sales.us@gmail.com,rikinpatel03@gmail.com}"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> KEM GCP + Firebase setup"
echo "    Project: $PROJECT_ID"
echo "    Region:  $REGION"
echo ""

# ── Auth check ───────────────────────────────────────────────────────────────
if ! gcloud auth list --format='value(account)' 2>/dev/null | grep -q .; then
  echo "ERROR: Not logged in. Run:  gcloud auth login"
  exit 1
fi

ACCOUNT=$(gcloud auth list --format='value(account)' 2>/dev/null | head -1)
echo "    Account: $ACCOUNT"
echo ""

API_HEADERS=(-H "Authorization: Bearer $(gcloud auth print-access-token)" -H "x-goog-user-project: ${PROJECT_ID}")

# ── Project ──────────────────────────────────────────────────────────────────
if gcloud projects describe "$PROJECT_ID" &>/dev/null; then
  echo "==> Project '$PROJECT_ID' already exists"
else
  echo "==> Creating project '$PROJECT_ID'..."
  gcloud projects create "$PROJECT_ID" --name="$PROJECT_NAME"
fi

gcloud config set project "$PROJECT_ID"

# ── Billing ──────────────────────────────────────────────────────────────────
BILLING_ACCOUNT=$(gcloud billing accounts list --filter="open=true" --format='value(name)' | head -1 || true)
if [[ -z "$BILLING_ACCOUNT" ]]; then
  echo "WARN: No open billing account found. Link billing in Console:"
  echo "      https://console.cloud.google.com/billing/linkedaccount?project=$PROJECT_ID"
else
  LINKED=$(gcloud billing projects describe "$PROJECT_ID" --format='value(billingEnabled)' 2>/dev/null || echo "False")
  if [[ "$LINKED" != "True" ]]; then
    echo "==> Linking billing account..."
    gcloud billing projects link "$PROJECT_ID" --billing-account="${BILLING_ACCOUNT#billingAccounts/}"
  fi
fi

# ── APIs ─────────────────────────────────────────────────────────────────────
echo "==> Enabling APIs..."
gcloud services enable \
  firebase.googleapis.com \
  identitytoolkit.googleapis.com \
  firestore.googleapis.com \
  cloudbilling.googleapis.com \
  monitoring.googleapis.com \
  --project="$PROJECT_ID"

# ── Firebase project ─────────────────────────────────────────────────────────
echo "==> Linking Firebase..."
TOKEN=$(gcloud auth print-access-token)
if curl -sf -H "Authorization: Bearer ${TOKEN}" -H "x-goog-user-project: ${PROJECT_ID}" \
  "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}" &>/dev/null; then
  echo "    Firebase already linked"
else
  RESP=$(curl -s -X POST \
    "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}:addFirebase" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "x-goog-user-project: ${PROJECT_ID}" \
    -H "Content-Type: application/json" \
    -d '{}')
  if echo "$RESP" | grep -q '"name"'; then
    echo "    Firebase linked (operation started)"
    sleep 10
  else
    echo "    WARN: addFirebase failed — open once in Console:"
    echo "      https://console.firebase.google.com/project/${PROJECT_ID}/overview"
    echo "      Response: $RESP"
  fi
fi

# ── Firestore ────────────────────────────────────────────────────────────────
if gcloud firestore databases describe --database='(default)' --project="$PROJECT_ID" &>/dev/null; then
  echo "==> Firestore already exists"
else
  echo "==> Creating Firestore (Native mode)..."
  gcloud firestore databases create \
    --location="$REGION" \
    --type=firestore-native \
    --project="$PROJECT_ID"
fi

# ── Firebase web app + config ─────────────────────────────────────────────────
echo "==> Firebase web app..."
TOKEN=$(gcloud auth print-access-token)
APP_ID=$(curl -sf -H "Authorization: Bearer ${TOKEN}" \
  "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}/webApps" \
  | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);console.log(j.apps?.[0]?.appId||'');}catch{console.log('')}})" 2>/dev/null || true)

if [[ -z "$APP_ID" ]]; then
  CREATE_RESP=$(curl -sf -X POST \
    "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}/webApps" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"displayName\":\"${WEB_APP_NAME}\"}" 2>/dev/null || true)
  APP_ID=$(echo "$CREATE_RESP" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(d).appId||'');}catch{}})" 2>/dev/null || true)
  # addFirebase is async — wait for operation
  if [[ -z "$APP_ID" && -n "$CREATE_RESP" ]]; then
    sleep 5
    APP_ID=$(curl -sf -H "Authorization: Bearer ${TOKEN}" \
      "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}/webApps" \
      | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(d).apps?.[0]?.appId||'');}catch{}})" 2>/dev/null || true)
  fi
fi

if [[ -n "$APP_ID" ]]; then
  echo "    Web app: $APP_ID"
  curl -sf -H "Authorization: Bearer ${TOKEN}" \
    "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}/webApps/${APP_ID}/config" \
    > /tmp/kem-firebase-sdk.json
  ALLOWED_EMAILS="$ALLOWED_EMAILS" node <<'NODE'
const fs = require('fs');
const sdk = JSON.parse(fs.readFileSync('/tmp/kem-firebase-sdk.json', 'utf8'));
const lines = [
  '# Generated by scripts/setup-gcp-auth.sh — do NOT commit secrets beyond public Firebase keys',
  `VITE_FIREBASE_API_KEY=${sdk.apiKey}`,
  `VITE_FIREBASE_AUTH_DOMAIN=${sdk.authDomain}`,
  `VITE_FIREBASE_PROJECT_ID=${sdk.projectId}`,
  `VITE_FIREBASE_STORAGE_BUCKET=${sdk.storageBucket || sdk.projectId + '.appspot.com'}`,
  `VITE_FIREBASE_MESSAGING_SENDER_ID=${sdk.messagingSenderId}`,
  `VITE_FIREBASE_APP_ID=${sdk.appId}`,
  `VITE_ALLOWED_EMAILS=${process.env.ALLOWED_EMAILS || 'kem.sales.us@gmail.com'}`,
  `GCP_PROJECT_ID=${sdk.projectId}`,
  `BILLING_ALERT_EMAIL=${process.env.BILLING_ALERT_EMAIL || 'kem.sales.us@gmail.com'}`,
];
fs.writeFileSync('.env.local', lines.join('\n') + '\n');
console.log('    Wrote .env.local');
NODE
else
  echo "WARN: Could not create/find Firebase web app. Create one in Console."
fi

# ── Enable Google sign-in + authorized domains ───────────────────────────────
echo "==> Enabling Google sign-in..."
TOKEN=$(gcloud auth print-access-token)

curl -sf -X POST \
  "https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/defaultSupportedIdpConfigs?supportedIdpId=google.com" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"enabled":true,"clientId":"","clientSecret":""}' \
  2>/dev/null || echo "    (Google provider may already be enabled)"

curl -sf -X PATCH \
  "https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/config?updateMask=authorizedDomains" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "x-goog-user-project: ${PROJECT_ID}" \
  -H "Content-Type: application/json" \
  -d '{"authorizedDomains":["localhost","kemtrade.us","www.kemtrade.us","'"${PROJECT_ID}"'.firebaseapp.com","'"${PROJECT_ID}"'.web.app"]}' \
  >/dev/null && echo "    Authorized domains: localhost, kemtrade.us, www.kemtrade.us" \
  || echo "    WARN: Authorized domains update failed — run ./scripts/firebase-gcp.sh sync-domains"

# ── Deploy Firestore rules ────────────────────────────────────────────────────
echo "==> Deploying Firestore security rules..."
TOKEN=$(gcloud auth print-access-token)
RULES_CONTENT=$(python3 -c "import json; print(json.dumps(open('firestore.rules').read()))")
RULESET=$(curl -sf -X POST \
  "https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/rulesets" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"source\":{\"files\":[{\"name\":\"firestore.rules\",\"content\":${RULES_CONTENT}}]}}" 2>/dev/null || true)
RULESET_NAME=$(echo "$RULESET" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{console.log(JSON.parse(d).name||'');}catch{}})" 2>/dev/null || true)
if [[ -n "$RULESET_NAME" ]]; then
  curl -sf -X PATCH \
    "https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/releases/cloud.firestore?updateMask=rulesetName" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"projects/${PROJECT_ID}/releases/cloud.firestore\",\"rulesetName\":\"${RULESET_NAME}\"}" \
    >/dev/null && echo "    Firestore rules deployed" \
    || echo "    WARN: Rules release failed — deploy via Console"
else
  echo "    WARN: Rules upload failed — deploy via Console"
fi

# ── Billing budget alerts (alert on any spend) ───────────────────────────────
if [[ -n "$BILLING_ACCOUNT" ]]; then
  echo "==> Setting billing alerts..."
  gcloud services enable billingbudgets.googleapis.com --project="$PROJECT_ID" --quiet 2>/dev/null || true
  BILLING_ID="${BILLING_ACCOUNT#billingAccounts/}"
  PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')

  CHANNEL=$(gcloud beta monitoring channels list \
    --project="$PROJECT_ID" \
    --filter="displayName='KEM Billing Alerts'" \
    --format='value(name)' 2>/dev/null | head -1 || true)

  if [[ -z "$CHANNEL" ]]; then
    CHANNEL=$(gcloud beta monitoring channels create \
      --project="$PROJECT_ID" \
      --display-name="KEM Billing Alerts" \
      --type=email \
      --channel-labels=email_address="$BILLING_EMAIL" \
      --format='value(name)' 2>/dev/null || true)
  fi

  EXISTING_BUDGET=$(gcloud billing budgets list \
    --billing-account="$BILLING_ID" \
    --filter="displayName:KEM Auth Spend Alert" \
    --format='value(name)' 2>/dev/null | head -1 || true)

  if [[ -z "$EXISTING_BUDGET" ]]; then
    NOTIF_FLAG=""
    if [[ -n "$CHANNEL" ]]; then
      NOTIF_FLAG="--notifications-rule=monitoring-notification-channels=${CHANNEL},schema-version=1.0"
    fi

    # $1/month budget — alerts at 1%, 50%, 90%, 100% (catches any non-zero spend)
    gcloud billing budgets create \
      --billing-account="$BILLING_ID" \
      --display-name="KEM Auth Spend Alert" \
      --budget-amount=1USD \
      --threshold-rule=percent=0.01,basis=current-spend \
      --threshold-rule=percent=0.5,basis=current-spend \
      --threshold-rule=percent=0.9,basis=forecasted-spend \
      --threshold-rule=percent=1.0,basis=current-spend \
      --filter-projects="projects/${PROJECT_NUMBER}" \
      $NOTIF_FLAG \
      --quiet \
      2>/dev/null && echo "    Budget alert created → $BILLING_EMAIL" \
      || echo "    WARN: Budget creation failed — set alert manually in Console"
  else
    echo "    Budget alert already exists"
  fi
else
  echo "WARN: Skipping billing alerts (no billing account)"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Add .env.local vars to Vercel (Project → Settings → Environment Variables)"
echo "  2. OAuth consent screen (if prompted): https://console.cloud.google.com/apis/credentials/consent?project=$PROJECT_ID"
echo "  3. Run locally: npm run dev → http://localhost:5173/login"
echo "  4. Production: https://kemtrade.us/login"
