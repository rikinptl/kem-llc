export const PORTAL_ORIGIN = 'https://kemtrade.us'

export function isPortalLoginHost(hostname = '') {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === 'kemtrade.us' ||
    hostname === 'www.kemtrade.us'
  )
}

export function redirectToPortalLogin() {
  if (typeof window === 'undefined') return
  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const loginPath = path.startsWith('/login') ? path : '/login'
  window.location.replace(`${PORTAL_ORIGIN}${loginPath}`)
}

/** Only call getRedirectResult after an actual Firebase redirect round-trip. */
export function shouldHandleRedirectResult() {
  if (typeof window === 'undefined') return false

  try {
    const pending = Object.keys(sessionStorage).some((key) => key.includes('firebase:pendingRedirect'))
    if (pending) return true
  } catch {
    // ignore storage errors
  }

  const params = new URLSearchParams(window.location.search)
  if (params.has('apiKey')) return true
  if (window.location.hash.includes('apiKey')) return true

  return false
}

export function friendlyAuthError(err) {
  const code = err?.code || ''
  switch (code) {
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for sign-in. Use kemtrade.us/login.'
    case 'auth/popup-blocked':
      return 'Pop-up blocked. Allow pop-ups for kemtrade.us and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    case 'auth/web-storage-unsupported':
      return 'Sign-in requires browser storage. Disable private mode for kemtrade.us.'
    default:
      return code ? `Sign-in failed (${code}). Please try again.` : 'Sign-in failed. Please try again.'
  }
}
