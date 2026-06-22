/** Mobile browsers (especially iOS Safari) block Google OAuth popups — use redirect instead. */
export function prefersRedirectSignIn() {
  if (typeof window === 'undefined') return false

  const ua = navigator.userAgent || ''
  const isMobileUa = /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(ua)
  const isIpadOs = navigator.maxTouchPoints > 1 && /MacIntel|Macintosh/i.test(navigator.platform || '')

  return isMobileUa || isIpadOs
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
    default:
      return 'Sign-in failed. Please try again.'
  }
}

export function shouldRetryWithRedirect(err) {
  const code = err?.code || ''
  return (
    code === 'auth/popup-blocked' ||
    code === 'auth/cancelled-popup-request' ||
    code === 'auth/operation-not-supported-in-this-environment'
  )
}
