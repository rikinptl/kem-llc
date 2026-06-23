import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'

const DEFAULT_CLIENT_ID =
  '238231316646-49fs5h50deg6b6cmsa9kvp1qfq2nb4hs.apps.googleusercontent.com'

let scriptPromise = null

export function getGoogleOAuthClientId() {
  return import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID?.trim() || DEFAULT_CLIENT_ID
}

export function loadGoogleIdentityScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google sign-in requires a browser.'))
  }

  if (window.google?.accounts?.oauth2) {
    return Promise.resolve()
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true })
        existing.addEventListener('error', () => reject(new Error('Failed to load Google sign-in.')), {
          once: true,
        })
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Google sign-in.'))
      document.head.appendChild(script)
    })
  }

  return scriptPromise
}

/** Firebase Option 5: GIS token + signInWithCredential (no /__/auth redirect). */
export async function signInWithGoogleCredential(auth) {
  await loadGoogleIdentityScript()

  const clientId = getGoogleOAuthClientId()

  return new Promise((resolve, reject) => {
    let settled = false

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'openid email profile',
      callback: async (response) => {
        if (settled) return

        if (response.error) {
          settled = true
          if (response.error === 'popup_closed_by_user') return
          reject(Object.assign(new Error(response.error), { code: response.error }))
          return
        }

        try {
          const credential = GoogleAuthProvider.credential(null, response.access_token)
          const result = await signInWithCredential(auth, credential)
          settled = true
          resolve(result)
        } catch (err) {
          settled = true
          reject(err)
        }
      },
    })

    client.requestAccessToken({ prompt: 'select_account' })
  })
}
