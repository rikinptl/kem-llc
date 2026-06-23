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
import { friendlyAuthError, isIgnorableRedirectError } from '../lib/authSignIn'

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

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return undefined
    }

    let active = true
    let unsubscribe = () => {}

    async function boot() {
      try {
        const result = await getRedirectResult(auth)
        if (!active) return

        if (result?.user) {
          const check = await rejectUnauthorizedUser(result.user)
          if (!check.ok) {
            setError(check.error)
            setUser(null)
          } else {
            await persistUserProfile(result.user)
            setUser(result.user)
            setError(null)
          }
        }
      } catch (err) {
        if (active && !isIgnorableRedirectError(err)) {
          console.error('Redirect sign-in error:', err)
          setError(friendlyAuthError(err))
        }
      }

      if (!active) return

      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!active) return

        if (firebaseUser) {
          const check = await rejectUnauthorizedUser(firebaseUser)
          if (!check.ok) {
            setUser(null)
            setError(check.error)
            setLoading(false)
            return
          }
          await persistUserProfile(firebaseUser)
          setUser(firebaseUser)
          setError(null)
        } else {
          setUser(null)
        }
        setLoading(false)
      })
    }

    boot()

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setError('Sign-in is not configured yet.')
      return
    }

    setError(null)

    const host = window.location.hostname
    const useRedirect = host !== 'localhost' && host !== '127.0.0.1'

    try {
      if (useRedirect) {
        await signInWithRedirect(auth, googleProvider)
        return
      }

      const { signInWithPopup } = await import('firebase/auth')
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      if (isIgnorableRedirectError(err) || err?.code === 'auth/popup-closed-by-user') return
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
