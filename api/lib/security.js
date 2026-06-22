/** Shared security helpers for Vercel serverless API routes */

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  message: 5000,
}

const DEFAULT_ORIGINS = [
  'https://kemtrade.us',
  'https://www.kemtrade.us',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Escape HTML for email templates and reflected output */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function isValidEmail(email) {
  return typeof email === 'string' && email.length <= CONTACT_LIMITS.email && EMAIL_RE.test(email)
}

export function sanitizeContactInput(body = {}) {
  const trim = (v, max) => String(v ?? '').trim().slice(0, max)
  return {
    name: trim(body.name, CONTACT_LIMITS.name),
    email: trim(body.email, CONTACT_LIMITS.email).toLowerCase(),
    phone: trim(body.phone, CONTACT_LIMITS.phone),
    company: trim(body.company, CONTACT_LIMITS.company),
    message: trim(body.message, CONTACT_LIMITS.message),
    website: trim(body.website, 200),
  }
}

export function validateContactPayload(data) {
  if (data.website) {
    return { ok: false, message: 'Invalid submission' }
  }
  if (!data.name || !data.email || !data.message) {
    return { ok: false, message: 'Name, email, and message are required' }
  }
  if (!isValidEmail(data.email)) {
    return { ok: false, message: 'Please enter a valid email address' }
  }
  return { ok: true }
}

function getAllowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  const origins = [...DEFAULT_ORIGINS, ...extra]
  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`)
  }
  if (process.env.NODE_ENV !== 'production') {
    origins.push('http://localhost:5173', 'http://localhost:3000')
  }
  return [...new Set(origins)]
}

/** Restrict CORS to known site origins (not *) */
export function applyCors(req, res, { methods = 'POST, OPTIONS', headers = 'Content-Type, Authorization' } = {}) {
  const origin = req.headers.origin
  const allowed = getAllowedOrigins()

  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', methods)
  res.setHeader('Access-Control-Allow-Headers', headers)
}

export function rejectDisallowedOrigin(req, res) {
  const origin = req.headers.origin
  if (!origin) return false
  if (!getAllowedOrigins().includes(origin)) {
    res.status(403).json({ success: false, message: 'Origin not allowed', error: 'Origin not allowed' })
    return true
  }
  return false
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  if (typeof req.headers['x-real-ip'] === 'string') {
    return req.headers['x-real-ip']
  }
  return 'unknown'
}

const rateBuckets = new Map()

/** In-memory rate limiter (best-effort per serverless instance) */
export function checkRateLimit(key, { windowMs = 15 * 60 * 1000, max = 5 } = {}) {
  const now = Date.now()
  let bucket = rateBuckets.get(key)

  if (!bucket || now - bucket.start > windowMs) {
    bucket = { start: now, count: 0 }
    rateBuckets.set(key, bucket)
  }

  bucket.count += 1

  if (rateBuckets.size > 5000) {
    for (const [k, b] of rateBuckets) {
      if (now - b.start > windowMs) rateBuckets.delete(k)
    }
  }

  if (bucket.count > max) {
    const retryAfter = Math.ceil((bucket.start + windowMs - now) / 1000)
    return { ok: false, retryAfter }
  }

  return { ok: true }
}

export function safeSubjectName(name) {
  return String(name ?? '')
    .replace(/[\r\n]/g, ' ')
    .trim()
    .slice(0, CONTACT_LIMITS.name)
}
