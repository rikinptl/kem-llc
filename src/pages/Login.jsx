import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getLoginDestination } from '../lib/roles'
import { DARK_SECTION } from '../lib/theme'

export default function Login() {
  const { user, loading, error, signInWithGoogle, isConfigured } = useAuth()
  const location = useLocation()
  const from = location.state?.from || '/portal'

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${DARK_SECTION}`}>
        <div className="w-8 h-8 border-2 border-kem-accent-light border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (user) {
    const dest = getLoginDestination(user.email)
    return <Navigate to={dest} replace />
  }

  return (
    <div className={`min-h-screen flex flex-col ${DARK_SECTION}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-kem-accent/20 via-transparent to-transparent blur-3xl" />
      </div>

      <header className="relative z-10 px-6 lg:px-12 py-6">
        <Link to="/" className="font-display font-extrabold text-xl tracking-tight text-kem-accent-light">
          KEM
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-20">
        <motion.div
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-kem-accent to-kem-accent-light mb-6" />

          <h1 className="font-display font-extrabold text-3xl tracking-tight text-white mb-2">
            Sign in
          </h1>
          <p className="text-white/65 text-sm leading-relaxed mb-8">
            Use your authorized Google account to access the KEM portal.
          </p>

          {!isConfigured && (
            <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-amber-100 text-sm">
              Firebase is not configured. Run <code className="text-amber-50">./scripts/setup-gcp-auth.sh</code> after
              logging in with gcloud.
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-red-100 text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={!isConfigured}
            className="w-full flex items-center justify-center gap-3 rounded-full bg-white text-slate-900 font-semibold py-3.5 px-6 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-white/40 text-xs">
            Intelligence, uncomplicated
          </p>
        </motion.div>
      </main>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
