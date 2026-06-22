import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { canAccessSalesDashboard } from '../lib/roles'
import SalesDashboard from './SalesDashboard'

export default function SalesDashboardRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kem-stone">
        <div className="w-8 h-8 border-2 border-kem-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: '/portal/sales' }} replace />
  }

  if (!canAccessSalesDashboard(user.email)) {
    return <Navigate to="/portal" replace />
  }

  return <SalesDashboard />
}
