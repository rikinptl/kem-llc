#!/usr/bin/env bash
# One-time: store Vercel IDs/tokens in GitHub Actions secrets for portal onboarding workflows.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO="${GITHUB_REPO:-rikinptl/kem-llc}"

if ! command -v gh >/dev/null; then
  echo "ERROR: GitHub CLI (gh) required."
  exit 1
fi

if ! command -v vercel >/dev/null; then
  echo "ERROR: Vercel CLI required. Run: npm install -g vercel"
  exit 1
fi

if [[ ! -d .vercel ]]; then
  echo "Linking Vercel project kem-llc..."
  vercel link --yes --project kem-llc --scope rknptls-projects
fi

ORG_ID="$(node -pe "JSON.parse(require('fs').readFileSync('.vercel/project.json','utf8')).orgId")"
PROJECT_ID="$(node -pe "JSON.parse(require('fs').readFileSync('.vercel/project.json','utf8')).projectId")"

echo "Detected Vercel orgId=$ORG_ID projectId=$PROJECT_ID"
echo ""
echo "Create a Vercel token at https://vercel.com/account/tokens (Full Account scope)."
read -r -s -p "Paste VERCEL_TOKEN: " VERCEL_TOKEN
echo ""

if [[ -z "$VERCEL_TOKEN" ]]; then
  echo "ERROR: VERCEL_TOKEN empty"
  exit 1
fi

echo "Setting GitHub secrets on $REPO..."
gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN" --repo "$REPO"
gh secret set VERCEL_ORG_ID --body "$ORG_ID" --repo "$REPO"
gh secret set VERCEL_PROJECT_ID --body "$PROJECT_ID" --repo "$REPO"

echo "Done."
echo ""
echo "Optional: restrict who can run portal GitHub Actions (default is rikinptl only):"
echo "  gh variable set PORTAL_WORKFLOW_ACTORS --body 'rikinptl' --repo $REPO"
echo ""
echo "You can now run the GitHub Action: Onboard portal user"
echo "  https://github.com/$REPO/actions/workflows/onboard-portal-user.yml"
