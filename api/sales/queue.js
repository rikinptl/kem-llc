import { verifySalesRequest } from '../lib/verifyAuth.js'
import { fetchLeadsFromSheet } from '../lib/sheets/leads.js'
import { buildSalesQueue, salesQueueStats } from '../lib/sales/queue.js'
import { applyCors, checkRateLimit, getClientIp, rejectDisallowedOrigin } from '../lib/security.js'

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
  const rate = checkRateLimit(`sales-queue:${ip}`, { windowMs: 60 * 1000, max: 120 })
  if (!rate.ok) {
    res.setHeader('Retry-After', String(rate.retryAfter))
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const auth = await verifySalesRequest(req)
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.error })
  }

  const filter = String(req.query.filter || 'to_call').toLowerCase()

  try {
    const leads = await fetchLeadsFromSheet()
    const queue = buildSalesQueue(leads, filter)
    const stats = salesQueueStats(leads)

    return res.status(200).json({
      fetchedAt: new Date().toISOString(),
      filter,
      stats,
      queue,
      links: {
        sheets: process.env.GOOGLE_SHEETS_URL ?? null,
      },
    })
  } catch (error) {
    console.error('Sales queue error:', error)
    return res.status(500).json({ error: 'Failed to load sales queue' })
  }
}
