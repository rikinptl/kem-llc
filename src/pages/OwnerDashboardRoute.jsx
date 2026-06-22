import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isOwnerEmail } from '../lib/roles'
import OwnerDashboard from './OwnerDashboard'

export default function OwnerDashboardRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kem-stone">
        <div className="w-8 h-8 border-2 border-kem-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: '/portal/owner' }} replace />
  }

  if (!isOwnerEmail(user.email)) {
    return <Navigate to="/portal" replace />
  }

  return <OwnerDashboard />
}
