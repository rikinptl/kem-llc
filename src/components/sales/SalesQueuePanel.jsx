import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  Star,
} from 'lucide-react'
import { auth } from '../../lib/firebase'

const FILTERS = [
  { id: 'to_call', label: 'To call' },
  { id: 'follow_up', label: 'Follow up' },
  { id: 'reached', label: 'Reached' },
  { id: 'declined', label: 'Declined' },
  { id: 'all', label: 'All' },
]

function todayLabel() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function StatPill({ label, value, active, onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`rounded-xl py-2 px-1 text-center ${active ? 'bg-kem-accent/10 ring-1 ring-kem-accent/30' : 'bg-slate-50'} ${
        onClick ? 'hover:bg-slate-100 transition-colors' : ''
      }`}
    >
      <p className="text-lg font-display font-bold text-slate-900">{value ?? '—'}</p>
      <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
    </Tag>
  )
}

export default function SalesQueuePanel({ embedded = false, onStatsChange }) {
  const [filter, setFilter] = useState('to_call')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saveMsg, setSaveMsg] = useState(null)
  const [index, setIndex] = useState(0)

  const [form, setForm] = useState({
    comments: '',
    reachedOut: '',
    followUp: '',
    decline: false,
  })

  const fieldId = (name) => (embedded ? `owner-sales-${name}` : name)

  const loadQueue = useCallback(async () => {
    if (!auth?.currentUser) return
    setLoading(true)
    setError(null)
    try {
      const token = await auth.currentUser.getIdToken()
      const res = await fetch(`/api/sales/queue?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load queue')
      setData(json)
      setIndex(0)
      onStatsChange?.(json.stats ?? null)
    } catch (e) {
      setError(e.message || 'Failed to load queue')
    } finally {
      setLoading(false)
    }
  }, [filter, onStatsChange])

  useEffect(() => {
    loadQueue()
  }, [loadQueue])

  const queue = data?.queue ?? []
  const current = queue[index] ?? null

  useEffect(() => {
    if (!current) {
      setForm({ comments: '', reachedOut: '', followUp: '', decline: false })
      return
    }
    setForm({
      comments: current.comments || '',
      reachedOut: current.reachedOut || '',
      followUp: current.followUp || '',
      decline: Boolean(current.decline),
    })
    setSaveMsg(null)
  }, [current?.rowIndex, current?.name])

  const phoneHref = useMemo(() => {
    if (!current?.phone) return null
    const digits = current.phone.replace(/[^\d+]/g, '')
    return digits ? `tel:${digits}` : null
  }, [current])

  const saveLead = async () => {
    if (!current || !auth?.currentUser) return
    setSaving(true)
    setSaveMsg(null)
    setError(null)
    try {
      const token = await auth.currentUser.getIdToken()
      const res = await fetch('/api/sales/lead', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rowIndex: current.rowIndex,
          name: current.name,
          phone: current.phone,
          comments: form.comments,
          reachedOut: form.reachedOut,
          followUp: form.followUp,
          decline: form.decline,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Save failed')

      setSaveMsg('Saved to Google Sheet')
      await loadQueue()
    } catch (e) {
      setError(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  const goNext = () => setIndex((i) => Math.min(queue.length - 1, i + 1))

  const contentWidth = embedded ? 'max-w-2xl mx-auto' : 'max-w-lg mx-auto'

  return (
    <div className={embedded ? '' : 'px-4 py-4'}>
      <div className={`${contentWidth} w-full`}>
          {embedded && (
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="font-display font-extrabold text-xl text-slate-900">Sales call queue</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Dial leads, pitch live demos, and sync outreach fields to the Google Sheet.
                </p>
              </div>
              <button
                type="button"
                onClick={loadQueue}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-semibold hover:bg-slate-800 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing…' : 'Refresh queue'}
              </button>
            </div>
          )}

          {data?.stats && (
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 text-center ${embedded ? 'mb-4' : 'mt-3 mb-4'}`}>
              <StatPill
                label="To call"
                value={data.stats.toCall}
                active={filter === 'to_call'}
                onClick={() => setFilter('to_call')}
              />
              <StatPill
                label="Follow up"
                value={data.stats.followUp}
                active={filter === 'follow_up'}
                onClick={() => setFilter('follow_up')}
              />
              <StatPill
                label="Reached"
                value={data.stats.reached}
                active={filter === 'reached'}
                onClick={() => setFilter('reached')}
              />
              <StatPill
                label="Live"
                value={data.stats.total}
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              />
            </div>
          )}

          <div className="flex gap-1 overflow-x-auto pb-1 mb-4">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === f.id ? 'bg-kem-accent text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading && !data && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-kem-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          {!loading && queue.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-600 font-medium">No leads in this queue</p>
              <p className="text-sm text-slate-400 mt-2">Try another filter or run the pipeline to add live demos.</p>
            </div>
          )}

          {current && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  {index + 1} of {queue.length}
                </span>
                <div className="flex gap-1">
                  <button type="button" onClick={goPrev} disabled={index === 0} className="p-1 rounded disabled:opacity-30">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={index >= queue.length - 1}
                    className="p-1 rounded disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <article className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5">
                  <h3 className="font-display font-extrabold text-xl leading-tight">{current.name}</h3>
                  <p className="text-white/70 text-sm mt-1">
                    {current.niche || '—'}
                    {current.city ? ` · ${current.city}` : ''}
                  </p>
                  {current.rating != null && (
                    <p className="inline-flex items-center gap-1 mt-2 text-amber-300 text-sm font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      {current.rating} Google rating
                    </p>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  {phoneHref ? (
                    <a
                      href={phoneHref}
                      className="flex items-center justify-center gap-2 w-full rounded-2xl bg-emerald-600 text-white font-bold py-4 text-lg hover:bg-emerald-700"
                    >
                      <Phone className="w-5 h-5" />
                      {current.phone}
                    </a>
                  ) : (
                    <p className="text-center text-slate-400 text-sm">No phone number</p>
                  )}

                  {current.address?.trim() && <p className="text-sm text-slate-600">{current.address}</p>}

                  <div className="flex flex-wrap gap-2">
                    {current.liveUrl?.startsWith('http') && (
                      <a
                        href={current.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-kem-accent/10 text-kem-accent px-3 py-1.5 text-xs font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live demo
                      </a>
                    )}
                    {current.mapsUrl?.startsWith('http') && (
                      <a
                        href={current.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Google Maps
                      </a>
                    )}
                  </div>
                </div>
              </article>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                <h3 className="font-display font-bold text-slate-900">Update sheet</h3>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.decline}
                    onChange={(e) => setForm((f) => ({ ...f, decline: e.target.checked }))}
                    className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-semibold text-slate-800">Declined (marks Decline = Y)</span>
                </label>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={fieldId('reachedOut')} className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Reached out
                    </label>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, reachedOut: todayLabel() }))}
                      className="text-xs text-kem-accent font-semibold"
                    >
                      Today
                    </button>
                  </div>
                  <input
                    id={fieldId('reachedOut')}
                    value={form.reachedOut}
                    onChange={(e) => setForm((f) => ({ ...f, reachedOut: e.target.value }))}
                    placeholder="e.g. Mar 9, 2026 or Y"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor={fieldId('followUp')} className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Follow up
                  </label>
                  <input
                    id={fieldId('followUp')}
                    value={form.followUp}
                    onChange={(e) => setForm((f) => ({ ...f, followUp: e.target.value }))}
                    placeholder="Next call date or note"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor={fieldId('comments')} className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Comments
                  </label>
                  <textarea
                    id={fieldId('comments')}
                    value={form.comments}
                    onChange={(e) => setForm((f) => ({ ...f, comments: e.target.value }))}
                    rows={3}
                    placeholder="Call notes, objections, interest level…"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm resize-none"
                  />
                </div>

                {saveMsg && <p className="text-sm text-emerald-600 font-medium">{saveMsg}</p>}

                <button
                  type="button"
                  onClick={() => saveLead()}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white font-semibold py-3.5 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : 'Save to Google Sheet'}
                </button>
              </section>
            </div>
          )}

          {data?.links?.sheets && (
            <p className={`text-center ${embedded ? 'mt-8' : 'mt-6'}`}>
              <a href={data.links.sheets} target="_blank" rel="noreferrer" className="text-xs text-kem-accent font-medium">
                Open Google Sheet (read-only backup)
              </a>
            </p>
          )}
        </div>
    </div>
  )
}
