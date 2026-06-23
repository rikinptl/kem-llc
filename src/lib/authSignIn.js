export const PORTAL_ORIGIN = 'https://kemtrade.us'

/** Firebase authorized domains for Google sign-in (must match Identity Platform config). */
export function isPortalLoginHost(hostname = '') {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === 'kemtrade.us' ||
    hostname === 'www.kemtrade.us'
  )
}

/** Production uses redirect (required for kemtrade.us + custom authDomain per Firebase docs). */
export function useRedirectSignIn() {
  if (typeof window === 'undefined') return false
  return isPortalLoginHost(window.location.hostname)
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
  const host = typeof window !== 'undefined' ? window.location.hostname : ''

  switch (code) {
    case 'auth/unauthorized-domain':
      if (host && !isPortalLoginHost(host)) {
        return `Sign in only works on kemtrade.us (not ${host}). You will be redirected.`
      }
      return 'This domain is not authorized for sign-in. Use kemtrade.us/login.'
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

export function redirectToPortalLogin() {
  if (typeof window === 'undefined') return
  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const loginPath = path.startsWith('/login') ? path : '/login'
  window.location.replace(`${PORTAL_ORIGIN}${loginPath}`)
}
