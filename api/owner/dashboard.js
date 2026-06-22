import { verifyOwnerRequest } from '../lib/verifyOwner.js'
import { getDashboardData } from '../lib/owner/dashboard.js'
import {
  applyCors,
  checkRateLimit,
  getClientIp,
  rejectDisallowedOrigin,
} from '../lib/security.js'

export default async function handler(req, res) {
  applyCors(req, res, {
    methods: 'GET, OPTIONS',
    headers: 'Authorization, Content-Type',
  })

  if (req.method === 'OPTIONS') {
    if (rejectDisallowedOrigin(req, res)) return
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (rejectDisallowedOrigin(req, res)) return

  const ip = getClientIp(req)
  const rate = checkRateLimit(`owner-dashboard:${ip}`, { windowMs: 60 * 1000, max: 60 })
  if (!rate.ok) {
    res.setHeader('Retry-After', String(rate.retryAfter))
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const auth = await verifyOwnerRequest(req)
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.error })
  }

  try {
    const data = await getDashboardData()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Owner dashboard error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
