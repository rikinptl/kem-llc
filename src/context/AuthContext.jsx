import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider, isEmailAllowed, isFirebaseConfigured } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return undefined
    }

    const timeout = window.setTimeout(() => setLoading(false), 5000)

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      window.clearTimeout(timeout)
      setError(null)

      if (firebaseUser && !isEmailAllowed(firebaseUser.email)) {
        await firebaseSignOut(auth)
        setUser(null)
        setError('This Google account is not authorized for KEM.')
        setLoading(false)
        return
      }

      if (firebaseUser && db) {
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

      setUser(firebaseUser)
      setLoading(false)
    })

    return () => {
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
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      if (err?.code === 'auth/popup-closed-by-user') return
      console.error('Sign-in error:', err)
      setError('Sign-in failed. Please try again.')
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
