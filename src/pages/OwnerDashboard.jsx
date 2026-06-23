import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ExternalLink,
  GitBranch,
  Play,
  RefreshCw,
  Sheet,
  Sparkles,
} from 'lucide-react'
import { auth } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { formatRelative, isLive } from '../lib/ownerFormat'
import OwnerOverview from '../components/owner/OwnerOverview'
import OwnerLeadsTable from '../components/owner/OwnerLeadsTable'
import OwnerLiveSitesPanel from '../components/owner/OwnerLiveSitesPanel'
import OwnerRunsTable from '../components/owner/OwnerRunsTable'
import OwnerMarketGrid from '../components/owner/OwnerMarketGrid'
import OwnerAiPanel from '../components/owner/OwnerAiPanel'
import SalesQueuePanel from '../components/sales/SalesQueuePanel'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'leads', label: 'Leads' },
  { id: 'sites', label: 'Live sites' },
  { id: 'sales', label: 'Sales' },
  { id: 'runs', label: 'Runs' },
  { id: 'markets', label: 'Markets' },
  { id: 'ai', label: 'AI & budget' },
]

function HeaderLink({ href, children, primary = false }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        primary
          ? 'inline-flex items-center gap-1.5 rounded-full bg-kem-accent text-white px-4 py-2 text-xs font-semibold hover:opacity-90'
          : 'inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50'
      }
    >
      {children}
    </a>
  )
}

export default function OwnerDashboard() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [tab, setTab] = useState(location.state?.tab || 'overview')
  const [salesToCall, setSalesToCall] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = useCallback(async () => {
    if (!auth?.currentUser) return
    setLoading(true)
    setError(null)
    try {
      const token = await auth.currentUser.getIdToken()
      const res = await fetch('/api/owner/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const text = await res.text()
      let json
      try {
        json = text ? JSON.parse(text) : {}
      } catch {
        throw new Error('Dashboard API returned an invalid response. Try again in a moment.')
      }
      if (!res.ok) throw new Error(json.error || 'Failed to load dashboard')
      setData(json)
    } catch (e) {
      setError(e.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboard()
    const interval = window.setInterval(loadDashboard, 60000)
    return () => window.clearInterval(interval)
  }, [loadDashboard])

  const liveCount = useMemo(
    () => (data?.leads ?? []).filter(isLive).length,
    [data]
  )

  const handleSalesStats = useCallback((stats) => {
    setSalesToCall(stats?.toCall ?? null)
  }, [])

  useEffect(() => {
    async function loadSalesStats() {
      if (!auth?.currentUser) return
      try {
        const token = await auth.currentUser.getIdToken()
        const res = await fetch('/api/sales/queue?filter=to_call', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const json = await res.json()
        if (res.ok) setSalesToCall(json.stats?.toCall ?? null)
      } catch {
        /* badge is optional */
      }
    }
    loadSalesStats()
  }, [])

  return (
    <div className="min-h-screen bg-kem-stone">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-kem-accent">
                KEM · Founder command center
              </p>
              <h1 className="font-display font-extrabold text-xl md:text-2xl text-slate-900 mt-0.5">
                Pipeline dashboard
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {data ? (
                  <>
                    Updated {formatRelative(data.fetchedAt)} ·{' '}
                    <span className="font-semibold text-emerald-600">{liveCount} live</span> ·{' '}
                    {data.stats?.total ?? 0} leads · {user?.email}
                  </>
                ) : (
                  user?.email
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <HeaderLink href={data?.links?.sheets}>
                <Sheet className="w-3.5 h-3.5" />
                Google Sheet
              </HeaderLink>
              <HeaderLink href={data?.links?.actions} primary>
                <Play className="w-3.5 h-3.5" />
                Run pipeline
              </HeaderLink>
              <HeaderLink href={data?.links?.demo}>
                <Sparkles className="w-3.5 h-3.5" />
                Demo workflow
              </HeaderLink>
              <HeaderLink href={data?.links?.kemOrg}>
                <GitBranch className="w-3.5 h-3.5" />
                kem-llc org
              </HeaderLink>
              <button
                type="button"
                onClick={() => setTab('sites')}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                Live demos{liveCount > 0 ? ` (${liveCount})` : ''}
              </button>
              <button
                type="button"
                onClick={loadDashboard}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-semibold hover:bg-slate-800 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              <a href="/" className="inline-flex items-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                Site
              </a>
              <button type="button" onClick={signOut} className="landing-pill-primary !text-xs !px-4 !py-2">
                Sign out
              </button>
            </div>
          </div>
        </div>

        <nav className="max-w-[1400px] mx-auto px-4 md:px-8 flex gap-1 pb-0 overflow-x-auto border-t border-slate-100 pt-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-kem-accent text-kem-accent'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
              {t.id === 'sites' && liveCount > 0 && (
                <span className="ml-1.5 rounded-full bg-emerald-100 text-emerald-700 px-1.5 py-0.5 text-[10px]">
                  {liveCount}
                </span>
              )}
              {t.id === 'sales' && salesToCall > 0 && (
                <span className="ml-1.5 rounded-full bg-kem-accent/15 text-kem-accent px-1.5 py-0.5 text-[10px]">
                  {salesToCall}
                </span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        {loading && !data && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-10 h-10 border-2 border-kem-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Loading pipeline data…</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 text-red-800 px-5 py-4 mb-6 flex flex-wrap items-center gap-3">
            <span>{error}</span>
            <button type="button" onClick={loadDashboard} className="underline font-semibold text-sm">
              Retry
            </button>
          </div>
        )}

        {data?.errors?.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 px-5 py-4 mb-6 text-sm">
            <p className="font-semibold mb-1">Partial data — some sources failed:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {data.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {data && tab === 'overview' && <OwnerOverview data={data} />}
        {data && tab === 'leads' && <OwnerLeadsTable leads={data.leads} />}
        {data && tab === 'sites' && (
          <OwnerLiveSitesPanel leads={data.leads} aiCost={data.aiCost} kemOrg={data.links.kemOrg} />
        )}
        {tab === 'sales' && <SalesQueuePanel embedded onStatsChange={handleSalesStats} />}
        {data && tab === 'runs' && <OwnerRunsTable runs={data.runs} />}
        {data && tab === 'markets' && <OwnerMarketGrid coverage={data.coverage} />}
        {data && tab === 'ai' && <OwnerAiPanel aiCost={data.aiCost} stats={data.stats} />}

        {data && tab !== 'sales' && (
          <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>
              web-auto monitor ·{' '}
              <a href={data.links.monitorRepo} target="_blank" rel="noreferrer" className="text-kem-accent hover:underline">
                source
              </a>
              {' · '}
              <a href={data.links.repo} target="_blank" rel="noreferrer" className="text-kem-accent hover:underline">
                pipeline repo
              </a>
            </span>
            <span className="inline-flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Sheet synced by column headers · DeepSeek Copy Status no longer used
            </span>
          </footer>
        )}
      </main>
    </div>
  )
}
