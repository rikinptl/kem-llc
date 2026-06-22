import React from 'react'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isOwnerEmail } from '../lib/roles'
import PageHeader from '../components/PageHeader'

export default function Portal() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kem-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (user && isOwnerEmail(user.email)) {
    return <Navigate to="/portal/owner" replace />
  }

  return (
    <>
      <PageHeader
        eyebrow="Portal"
        title="Welcome back"
        subtitle="You're signed in to KEM. This area will host client dashboards, project status, and internal tools."
      />

      <section className="landing-section bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-kem-stone p-8 md:p-10">
            <div className="flex items-start gap-4 mb-8">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-14 h-14 rounded-full border border-slate-200"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-kem-accent-soft flex items-center justify-center text-kem-accent font-bold text-xl">
                  {user?.email?.[0]?.toUpperCase() || 'K'}
                </div>
              )}
              <div>
                <p className="font-display font-bold text-xl text-slate-900">
                  {user?.displayName || 'KEM User'}
                </p>
                <p className="text-slate-600 text-sm mt-1">{user?.email}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-slate-400 mb-2">Status</p>
                <p className="text-slate-900 font-semibold">Authenticated</p>
                <p className="text-slate-500 text-sm mt-1">Google sign-in verified</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-slate-400 mb-2">Access</p>
                <p className="text-slate-900 font-semibold">Authorized</p>
                <p className="text-slate-500 text-sm mt-1">Email allowlist passed</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/" className="landing-pill-secondary !text-sm">
                Back to site
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="landing-pill-primary !text-sm !bg-slate-900 hover:!brightness-110"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}