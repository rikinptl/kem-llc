const DEV_DEFAULT_OWNERS = 'kem.sales.us@gmail.com,rikinpatel03@gmail.com'

function getOwnerEmails() {
  const raw =
    process.env.OWNER_EMAILS ||
    (process.env.NODE_ENV !== 'production' ? process.env.VITE_OWNER_EMAILS : '') ||
    (process.env.NODE_ENV !== 'production' ? DEV_DEFAULT_OWNERS : '')

  if (!raw) {
    return []
  }

  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

function getFirebaseApiKey() {
  if (process.env.FIREBASE_API_KEY) {
    return process.env.FIREBASE_API_KEY
  }
  if (process.env.NODE_ENV !== 'production') {
    return process.env.VITE_FIREBASE_API_KEY || ''
  }
  return ''
}

export async function verifyOwnerRequest(req) {
  const header = req.headers.authorization || req.headers.Authorization
  if (!header?.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: 'Missing authorization token' }
  }

  const owners = getOwnerEmails()
  if (owners.length === 0) {
    console.error('OWNER_EMAILS is not configured')
    return { ok: false, status: 500, error: 'Owner access is not configured' }
  }

  const idToken = header.slice(7).trim()
  const apiKey = getFirebaseApiKey()
  if (!apiKey) {
    console.error('FIREBASE_API_KEY is not configured on server')
    return { ok: false, status: 500, error: 'Authentication is not configured' }
  }

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    }
  )

  if (!res.ok) {
    return { ok: false, status: 401, error: 'Invalid or expired session' }
  }

  const data = await res.json()
  const email = data?.users?.[0]?.email?.toLowerCase()
  if (!email) {
    return { ok: false, status: 401, error: 'Could not verify user email' }
  }

  if (!owners.includes(email)) {
    return { ok: false, status: 403, error: 'Owner access required' }
  }

  return { ok: true, email, uid: data.users[0].localId }
}
