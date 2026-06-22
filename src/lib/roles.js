const DEFAULT_OWNERS = 'kem.sales.us@gmail.com,rikinpatel03@gmail.com'

export function getOwnerEmails() {
  const raw = import.meta.env.VITE_OWNER_EMAILS || import.meta.env.VITE_ALLOWED_EMAILS || DEFAULT_OWNERS
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isOwnerEmail(email) {
  if (!email) return false
  return getOwnerEmails().includes(email.toLowerCase())
}

export function isAllowedEmail(email) {
  if (!email) return false
  const allowed = import.meta.env.VITE_ALLOWED_EMAILS || DEFAULT_OWNERS
  const list = allowed
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  if (list.length === 0) return true
  return list.includes(email.toLowerCase())
}
