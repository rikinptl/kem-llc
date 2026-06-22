# KEM — Google Sign-In (GCP + Firebase)

## One-time: log in to Google Cloud

```bash
gcloud auth login
firebase login
```

Use the Google account that owns your GCP billing.

## Run automated setup

```bash
cd "/Users/rknptl/Desktop/kem llc website "
./scripts/setup-gcp-auth.sh
```

Optional overrides:

```bash
GCP_PROJECT_ID=your-existing-project \
BILLING_ALERT_EMAIL=kem.sales.us@gmail.com \
ALLOWED_EMAILS=kem.sales.us@gmail.com,other@example.com \
./scripts/setup-gcp-auth.sh
```

The script will:

- Create/link GCP project `kem-llc-web`
- Enable Firebase Auth + Firestore
- Enable Google sign-in + authorized domains
- Deploy Firestore security rules
- Write `.env.local` with Firebase config
- Create a **$1/month billing budget** with alerts at **1%, 50%, 90%, 100%** → email when any spend occurs

## Vercel env vars

After `.env.local` is populated:

```bash
./scripts/sync-owner-env.sh   # owner dashboard secrets (from rags_2_riches)
./scripts/sync-vercel-env.sh  # push everything to Vercel (production + preview + development)
vercel --prod                 # redeploy so VITE_* vars are baked into the build
```

Project is linked as `rknptls-projects/kem-llc` → [kemtrade.us](https://kemtrade.us).

## Routes

| URL | Purpose |
|-----|---------|
| `/login` | Google sign-in |
| `/portal` | Protected area (requires allowed email) |

## OAuth consent screen

If Google blocks sign-in for external users, complete the OAuth consent screen:

https://console.cloud.google.com/apis/credentials/consent?project=kem-llc-web

Add test users while in "Testing" mode, or publish when ready.

## Cost

Google sign-in: free up to 50,000 monthly active users. Billing alerts notify you before meaningful charges.
