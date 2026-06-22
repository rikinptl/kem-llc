import { verifySalesRequest } from '../../server/lib/verifyAuth.js'
import { fetchLeadsFromSheet, updateLeadOutreach } from '../../server/lib/sheets/leads.js'
import { applyCors, checkRateLimit, getClientIp, rejectDisallowedOrigin } from '../../server/lib/security.js'

function findLeadRow(leads, name, phone) {
  const nameNorm = String(name || '').trim().toLowerCase()
  const phoneNorm = String(phone || '').trim()
  return leads.find(
    (l) =>
      l.name.trim().toLowerCase() === nameNorm &&
      String(l.phone || '').trim() === phoneNorm
  )
}

export default async function handler(req, res) {
  applyCors(req, res, {
    methods: 'PATCH, OPTIONS',
    headers: 'Authorization, Content-Type',
  })

  if (req.method === 'OPTIONS') {
    if (rejectDisallowedOrigin(req, res)) return
    return res.status(200).end()
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (rejectDisallowedOrigin(req, res)) return

  const ip = getClientIp(req)
  const rate = checkRateLimit(`sales-update:${ip}`, { windowMs: 60 * 1000, max: 60 })
  if (!rate.ok) {
    res.setHeader('Retry-After', String(rate.retryAfter))
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const auth = await verifySalesRequest(req)
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.error })
  }

  const { rowIndex, name, phone, comments, reachedOut, followUp, decline } = req.body || {}

  if (!rowIndex && (!name || !phone)) {
    return res.status(400).json({ error: 'rowIndex or name+phone required' })
  }

  try {
    let targetRow = rowIndex

    if (!targetRow) {
      const leads = await fetchLeadsFromSheet()
      const lead = findLeadRow(leads, name, phone)
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found in sheet' })
      }
      targetRow = lead.rowIndex
    }

    const payload = {}
    if (comments !== undefined) payload.comments = comments
    if (reachedOut !== undefined) payload.reachedOut = reachedOut
    if (followUp !== undefined) payload.followUp = followUp
    if (decline !== undefined) payload.decline = Boolean(decline)

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    await updateLeadOutreach(targetRow, payload)

    return res.status(200).json({
      success: true,
      rowIndex: targetRow,
      updated: payload,
    })
  } catch (error) {
    console.error('Sales update error:', error)
    return res.status(500).json({ error: 'Failed to update Google Sheet' })
  }
}
