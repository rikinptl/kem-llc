export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  message: 5000,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data) {
  const name = String(data.name ?? '').trim()
  const email = String(data.email ?? '').trim()
  const message = String(data.message ?? '').trim()

  if (!name || !email || !message) {
    return 'Name, email, and message are required.'
  }
  if (name.length > CONTACT_LIMITS.name) {
    return `Name must be ${CONTACT_LIMITS.name} characters or fewer.`
  }
  if (email.length > CONTACT_LIMITS.email || !EMAIL_RE.test(email)) {
    return 'Please enter a valid email address.'
  }
  if (message.length > CONTACT_LIMITS.message) {
    return `Message must be ${CONTACT_LIMITS.message} characters or fewer.`
  }
  if (String(data.phone ?? '').trim().length > CONTACT_LIMITS.phone) {
    return `Phone must be ${CONTACT_LIMITS.phone} characters or fewer.`
  }
  if (String(data.company ?? '').trim().length > CONTACT_LIMITS.company) {
    return `Company must be ${CONTACT_LIMITS.company} characters or fewer.`
  }
  return null
}
