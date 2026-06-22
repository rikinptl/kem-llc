export function formatRelative(iso) {
  if (!iso) return '—'
  const then = new Date(iso).getTime()
  const diff = Date.now() - then
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return 'just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  if (day < 7) return `${day}d ago`
  return new Date(iso).toLocaleDateString()
}

export function formatDuration(sec) {
  if (sec == null) return '—'
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m < 60) return s ? `${m}m ${s}s` : `${m}m`
  const h = Math.floor(m / 60)
  return `${h}h ${m % 60}m`
}

export function formatUsd(value) {
  if (value == null) return '—'
  return `$${Number(value).toFixed(2)}`
}

export function leadKey(lead) {
  return `${lead.name}::${lead.phone || lead.city}`
}

export function isLive(lead) {
  return Boolean(lead.liveUrl?.trim().startsWith('http'))
}

export function isCopyDone(lead) {
  return (lead.copyStatus || '').trim().toLowerCase() === 'done'
}

export function isReached(lead) {
  return Boolean(lead.reachedOut?.trim()) && lead.reachedOut.trim().toUpperCase() !== 'N'
}

export function statusKind(value, type = 'generic') {
  const v = (value || '').toLowerCase()
  if (v === 'done' || v === 'success') return 'success'
  if (v === 'failure' || v === 'failed' || v === 'cancelled') return 'danger'
  if (v === 'in_progress' || v === 'queued' || v === 'pending') return 'pending'
  if (type === 'scraped' && v) return v === 'done' ? 'success' : 'neutral'
  return 'neutral'
}

export function formatTokens(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}
