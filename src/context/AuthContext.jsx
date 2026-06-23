import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import {
  auth,
  browserPopupRedirectResolver,
  db,
  googleProvider,
  isEmailAllowed,
  isFirebaseConfigured,
} from '../lib/firebase'
import {
  friendlyAuthError,
  isIgnorableRedirectError,
  prefersRedirectSignIn,
  shouldRetryWithRedirect,
} from '../lib/authSignIn'

const AuthContext = createContext(null)

async function persistUserProfile(firebaseUser) {
  if (!firebaseUser || !db) return
  try {
    await setDoc(
      doc(db, 'users', firebaseUser.uid),
      {
        email: firebaseUser.email,
        name: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      },
      { merge: true }
    )
  } catch {
    // Non-blocking — auth still valid if Firestore write fails
  }
}

async function rejectUnauthorizedUser(firebaseUser) {
  if (!firebaseUser || isEmailAllowed(firebaseUser.email)) {
    return { ok: true }
  }
  if (auth) await firebaseSignOut(auth)
  return { ok: false, error: 'This Google account is not authorized for KEM.' }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const redirectHandled = useRef(false)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return undefined
    }

    let active = true
    const timeout = window.setTimeout(() => {
      if (active) setLoading(false)
    }, 8000)

    const finishRedirectSignIn = async () => {
      if (redirectHandled.current) return
      redirectHandled.current = true

      try {
        const result = await getRedirectResult(auth, browserPopupRedirectResolver)
        if (!active || !result?.user) return

        const check = await rejectUnauthorizedUser(result.user)
        if (!check.ok) {
          setUser(null)
          setError(check.error)
          return
        }

        await persistUserProfile(result.user)
        setUser(result.user)
        setError(null)
      } catch (err) {
        if (!active) return
        if (isIgnorableRedirectError(err)) return
        console.error('Redirect sign-in error:', err)
        setError(friendlyAuthError(err))
      }
    }

    finishRedirectSignIn()

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!active) return
      window.clearTimeout(timeout)

      if (firebaseUser) {
        const check = await rejectUnauthorizedUser(firebaseUser)
        if (!check.ok) {
          setUser(null)
          setError(check.error)
          setLoading(false)
          return
        }
        await persistUserProfile(firebaseUser)
      }

      setUser(firebaseUser)
      setError(null)
      setLoading(false)
    })

    return () => {
      active = false
      window.clearTimeout(timeout)
      unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setError('Sign-in is not configured yet. Run scripts/setup-gcp-auth.sh first.')
      return
    }

    setError(null)

    const redirectSignIn = async () => {
      await signInWithRedirect(auth, googleProvider, browserPopupRedirectResolver)
    }

    try {
      if (prefersRedirectSignIn()) {
        await redirectSignIn()
        return
      }

      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      if (err?.code === 'auth/popup-closed-by-user' || isIgnorableRedirectError(err)) return

      if (shouldRetryWithRedirect(err)) {
        try {
          await redirectSignIn()
          return
        } catch (redirectErr) {
          console.error('Redirect fallback error:', redirectErr)
          setError(friendlyAuthError(redirectErr))
          return
        }
      }

      if (err?.code === 'auth/internal-error') {
        try {
          await redirectSignIn()
          return
        } catch (redirectErr) {
          console.error('Redirect fallback after internal-error:', redirectErr)
          setError(friendlyAuthError(redirectErr))
          return
        }
      }

      console.error('Sign-in error:', err)
      setError(friendlyAuthError(err))
    }
  }

  const signOut = async () => {
    if (!auth) return
    await firebaseSignOut(auth)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      signOut,
      isConfigured: isFirebaseConfigured,
    }),
    [user, loading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
