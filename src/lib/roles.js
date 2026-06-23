const DEFAULT_OWNERS = 'kem.sales.us@gmail.com,rikinpatel03@gmail.com'

function parseList(raw) {
  return String(raw || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function getOwnerEmails() {
  const raw = import.meta.env.VITE_OWNER_EMAILS?.trim()
  if (raw) return parseList(raw)
  return parseList(DEFAULT_OWNERS)
}

export function getColleagueEmails() {
  const raw = import.meta.env.VITE_COLLEAGUE_EMAILS?.trim()
  if (raw) return parseList(raw)

  const allowed = parseList(import.meta.env.VITE_ALLOWED_EMAILS || '')
  const owners = getOwnerEmails()
  return allowed.filter((email) => !owners.includes(email))
}

export function getAllowedEmails() {
  return [...new Set([...getOwnerEmails(), ...getColleagueEmails()])]
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
  return getAllowedEmails().includes(email.toLowerCase())
}
