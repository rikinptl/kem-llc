const DEFAULT_OWNERS = 'kem.sales.us@gmail.com,rikinpatel03@gmail.com'

function parseList(raw) {
  return String(raw || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function getOwnerEmails() {
  const raw = import.meta.env.VITE_OWNER_EMAILS || import.meta.env.VITE_ALLOWED_EMAILS || DEFAULT_OWNERS
  return parseList(raw)
}

export function getColleagueEmails() {
  const raw = import.meta.env.VITE_COLLEAGUE_EMAILS || ''
  return parseList(raw)
}

export function isOwnerEmail(email) {
  if (!email) return false
  return getOwnerEmails().includes(email.toLowerCase())
}

export function isColleagueEmail(email) {
  if (!email) return false
  const colleagues = getColleagueEmails()
  if (colleagues.length === 0) return false
  return colleagues.includes(email.toLowerCase())
}

export function canAccessSalesDashboard(email) {
  if (!email) return false
  return isOwnerEmail(email) || isColleagueEmail(email)
}

export function getLoginDestination(email) {
  if (isOwnerEmail(email)) return '/portal/owner'
  if (isColleagueEmail(email)) return '/portal/sales'
  return '/portal'
}

export function isAllowedEmail(email) {
  if (!email) return false
  const allowed = import.meta.env.VITE_ALLOWED_EMAILS || DEFAULT_OWNERS
  const colleagues = import.meta.env.VITE_COLLEAGUE_EMAILS || ''
  const list = [...new Set([...parseList(allowed), ...parseList(colleagues)])]
  if (list.length === 0) return true
  return list.includes(email.toLowerCase())
}
