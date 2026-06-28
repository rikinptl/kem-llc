import { verifyOwnerRequest } from '../../server/lib/verifyOwner.js'
import { getPipelineStatus, setPipelineEnabled } from '../../server/lib/owner/pipeline.js'
import {
  applyCors,
  checkRateLimit,
  getClientIp,
  rejectDisallowedOrigin,
} from '../../server/lib/security.js'

export default async function handler(req, res) {
  applyCors(req, res, {
    methods: 'GET, PATCH, OPTIONS',
    headers: 'Authorization, Content-Type',
  })

  if (req.method === 'OPTIONS') {
    if (rejectDisallowedOrigin(req, res)) return
    return res.status(200).end()
  }

  if (req.method !== 'GET' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (rejectDisallowedOrigin(req, res)) return

  const ip = getClientIp(req)
  const rate = checkRateLimit(`owner-pipeline:${ip}`, { windowMs: 60 * 1000, max: 30 })
  if (!rate.ok) {
    res.setHeader('Retry-After', String(rate.retryAfter))
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const auth = await verifyOwnerRequest(req)
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.error })
  }

  try {
    if (req.method === 'GET') {
      const status = await getPipelineStatus()
      return res.status(200).json(status)
    }

    const enabled = req.body?.enabled
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({ error: 'Request body must include enabled: true or false' })
    }

    const result = await setPipelineEnabled(enabled)
    return res.status(200).json(result)
  } catch (error) {
    console.error('Owner pipeline error:', error)
    return res.status(500).json({ error: error.message || 'Failed to update pipeline' })
  }
}
