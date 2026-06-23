/** Use redirect sign-in on production — popups break in many desktop browsers (third-party cookies). */
export function prefersRedirectSignIn() {
  if (typeof window === 'undefined') return false

  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') return false
  return true
}

const IGNORABLE_REDIRECT_ERRORS = new Set([
  'auth/popup-closed-by-user',
  'auth/redirect-cancelled-by-user',
  'auth/no-auth-event',
])

export function isIgnorableRedirectError(err) {
  return IGNORABLE_REDIRECT_ERRORS.has(err?.code || '')
}

export function friendlyAuthError(err) {
  const code = err?.code || ''
  switch (code) {
    case 'auth/unauthorized-domain':
      return 'Sign-in is not enabled for this domain. Contact support.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a minute and try again.'
    case 'auth/account-exists-with-different-credential':
      return 'This email is linked to another sign-in method.'
    case 'auth/web-storage-unsupported':
      return 'Sign-in requires browser storage. Disable private mode or allow cookies for kemtrade.us.'
    case 'auth/invalid-credential':
    case 'auth/user-disabled':
      return 'This Google account cannot sign in. Try another account or contact support.'
    case 'auth/popup-blocked':
    case 'auth/cancelled-popup-request':
      return 'Pop-up was blocked. Redirecting to Google sign-in…'
    default:
      return code ? `Sign-in failed (${code}). Please try again.` : 'Sign-in failed. Please try again.'
  }
}

export function shouldRetryWithRedirect(err) {
  const code = err?.code || ''
  return (
    code === 'auth/popup-blocked' ||
    code === 'auth/cancelled-popup-request' ||
    code === 'auth/operation-not-supported-in-this-environment' ||
    code === 'auth/popup-closed-by-user'
  )
}
