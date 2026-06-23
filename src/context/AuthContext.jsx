import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import {
  auth,
  db,
  googleProvider,
  isEmailAllowed,
  isFirebaseConfigured,
} from '../lib/firebase'
import { friendlyAuthError, shouldHandleRedirectResult } from '../lib/authSignIn'
import { signInWithGoogleCredential } from '../lib/googleSignIn'

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
    // Non-blocking
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return undefined
    }

    let active = true
    let redirectHandled = false

    const redirectResultPromise = shouldHandleRedirectResult()
      ? getRedirectResult(auth)
          .then((result) => {
            redirectHandled = true
            return result
          })
          .catch((err) => {
            redirectHandled = true
            if (err?.code === 'auth/no-auth-event') return null
            console.error('Redirect sign-in failed:', err)
            if (active) setError(friendlyAuthError(err))
            return null
          })
      : Promise.resolve(null).finally(() => {
          redirectHandled = true
        })

    const timeout = window.setTimeout(() => {
      if (active) setLoading(false)
    }, 8000)

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      await redirectResultPromise

      if (!active) return

      window.clearTimeout(timeout)
      setError(null)

      if (firebaseUser?.email && !isEmailAllowed(firebaseUser.email)) {
        await firebaseSignOut(auth)
        setUser(null)
        setError('This Google account is not authorized for KEM.')
        setLoading(false)
        return
      }

      setUser(firebaseUser)
      setLoading(false)

      if (firebaseUser) {
        persistUserProfile(firebaseUser)
      }
    })

    redirectResultPromise.finally(() => {
      if (!redirectHandled || !active) return
    })

    return () => {
      active = false
      window.clearTimeout(timeout)
      unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setError('Sign-in is not configured yet.')
      return
    }

    setError(null)

    try {
      await signInWithGoogleCredential(auth)
      return
    } catch (err) {
      if (err?.code === 'popup_closed_by_user') return
      console.warn('GIS sign-in failed, trying redirect:', err)
    }

    try {
      await signInWithRedirect(auth, googleProvider)
    } catch (redirectErr) {
      console.error('Redirect sign-in error:', redirectErr)
      setError(friendlyAuthError(redirectErr))
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
