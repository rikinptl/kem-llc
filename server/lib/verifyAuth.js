const DEV_DEFAULT_OWNERS = 'kem.sales.us@gmail.com,rikinpatel03@gmail.com'

function parseEmailList(raw) {
  if (!raw) return []
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function getOwnerEmailsServer() {
  const raw =
    process.env.OWNER_EMAILS?.trim() ||
    process.env.VITE_OWNER_EMAILS?.trim() ||
    DEV_DEFAULT_OWNERS
  return parseEmailList(raw)
}

export function getColleagueEmailsServer() {
  const raw =
    process.env.COLLEAGUE_EMAILS?.trim() ||
    process.env.VITE_COLLEAGUE_EMAILS?.trim() ||
    ''
  const colleagues = parseEmailList(raw)
  if (colleagues.length > 0) return colleagues

  const allowed = parseEmailList(process.env.VITE_ALLOWED_EMAILS || '')
  const owners = getOwnerEmailsServer()
  return allowed.filter((email) => !owners.includes(email))
}

function getFirebaseApiKey() {
  if (process.env.FIREBASE_API_KEY) return process.env.FIREBASE_API_KEY
  if (process.env.NODE_ENV !== 'production') return process.env.VITE_FIREBASE_API_KEY || ''
  return ''
}

export async function verifyFirebaseToken(req) {
  const header = req.headers.authorization || req.headers.Authorization
  if (!header?.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: 'Missing authorization token' }
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

  return { ok: true, email, uid: data.users[0].localId }
}

export async function verifyOwnerRequest(req) {
  const auth = await verifyFirebaseToken(req)
  if (!auth.ok) return auth

  const owners = getOwnerEmailsServer()
  if (owners.length === 0) {
    console.error('OWNER_EMAILS is not configured')
    return { ok: false, status: 500, error: 'Owner access is not configured' }
  }

  if (!owners.includes(auth.email)) {
    return { ok: false, status: 403, error: 'Owner access required' }
  }

  return auth
}

export async function verifySalesRequest(req) {
  const auth = await verifyFirebaseToken(req)
  if (!auth.ok) return auth

  const owners = getOwnerEmailsServer()
  const colleagues = getColleagueEmailsServer()
  const allowed = [...new Set([...owners, ...colleagues])]

  if (allowed.length === 0) {
    console.error('COLLEAGUE_EMAILS / OWNER_EMAILS not configured')
    return { ok: false, status: 500, error: 'Sales access is not configured' }
  }

  if (!allowed.includes(auth.email)) {
    return { ok: false, status: 403, error: 'Sales dashboard access required' }
  }

  return { ...auth, isOwner: owners.includes(auth.email) }
}
