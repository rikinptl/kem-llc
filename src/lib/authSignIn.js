/** Production uses redirect (required for kemtrade.us + custom authDomain per Firebase docs). */
export function useRedirectSignIn() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  return host !== 'localhost' && host !== '127.0.0.1'
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
      return 'Sign-in is not enabled for kemtrade.us. Contact support.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    case 'auth/web-storage-unsupported':
      return 'Sign-in requires browser storage. Disable private mode for kemtrade.us.'
    case 'auth/invalid-credential':
    case 'auth/user-disabled':
      return 'This Google account cannot sign in. Try another account or contact support.'
    default:
      return code ? `Sign-in failed (${code}). Please try again.` : 'Sign-in failed. Please try again.'
  }
}
