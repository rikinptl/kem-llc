# Vercel Deployment Setup Guide

## Environment Variables in Vercel

After deploying to Vercel, you need to add environment variables:

### Step 1: Go to Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your `kem-llc` project

### Step 2: Add Environment Variables
1. Click on **Settings** → **Environment Variables**
2. Add the following variables:

**Variable 1:**
- **Key:** `GMAIL_USER`
- **Value:** `kem.sales.us@gmail.com`
- **Environments:** Production, Preview, Development

**Variable 2:**
- **Key:** `GMAIL_APP_PASSWORD`
- **Value:** Your 16-character Gmail App Password (with or without spaces)
- **Environments:** Production, Preview, Development

**Variable 3 (optional):**
- **Key:** `PORT`
- **Value:** `3001`
- **Environments:** Production, Preview, Development

### Step 3: Redeploy
After adding environment variables:
1. Go to **Deployments** tab
2. Click the **⋮** menu on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeploy

## API Route Structure

The contact form uses a Vercel serverless function located at:
- **File:** `/api/contact.js`
- **Endpoint:** `https://your-domain.vercel.app/api/contact`

## Local Development

For local development with Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run development server with serverless functions
vercel dev
```

Or use the traditional backend server:
```bash
# Terminal 1: Backend
cd server
npm start

# Terminal 2: Frontend
npm run dev
```

## Testing

1. Deploy to Vercel
2. Add environment variables in Vercel dashboard
3. Redeploy
4. Test the contact form at: `https://your-domain.vercel.app/contact`

## Troubleshooting

### Form not sending emails?
- ✅ Check environment variables are set in Vercel
- ✅ Make sure GMAIL_APP_PASSWORD is correct (16 characters)
- ✅ Check Vercel function logs in dashboard
- ✅ Verify the API route is deployed correctly

### Checking Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the deployment
3. Go to **Functions** tab
4. Click on `/api/contact` to see logs

