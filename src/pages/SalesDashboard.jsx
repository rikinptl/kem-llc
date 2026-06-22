import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isOwnerEmail } from '../lib/roles'
import SalesQueuePanel from '../components/sales/SalesQueuePanel'

export default function SalesDashboard() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-kem-stone">
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-kem-accent">Sales</p>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">{user?.email}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {isOwnerEmail(user?.email) && (
              <Link
                to="/portal/owner"
                state={{ tab: 'sales' }}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                Owner
              </Link>
            )}
            <button type="button" onClick={signOut} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold">
              Out
            </button>
          </div>
        </div>
      </div>

      <SalesQueuePanel embedded />
    </div>
  )
}
