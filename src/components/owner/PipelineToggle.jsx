import React, { useCallback, useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { auth } from '../../lib/firebase'

export default function PipelineToggle({ initialEnabled, configured, workflowUrl, onStatusChange }) {
  const [enabled, setEnabled] = useState(Boolean(initialEnabled))
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (initialEnabled != null) setEnabled(Boolean(initialEnabled))
  }, [initialEnabled])

  const toggle = useCallback(async () => {
    if (!auth?.currentUser || !configured || busy) return

    const next = !enabled
    setBusy(true)
    setMessage(null)

    try {
      const token = await auth.currentUser.getIdToken()
      const res = await fetch('/api/owner/pipeline', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled: next }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update pipeline')

      setEnabled(next)
      setMessage(json.message || (next ? 'Pipeline started' : 'Pipeline paused'))
      onStatusChange?.(next, json)
    } catch (err) {
      setMessage(err.message || 'Failed to update pipeline')
    } finally {
      setBusy(false)
    }
  }, [busy, configured, enabled, onStatusChange])

  if (!configured) {
    return (
      <span
        className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800"
        title="Set OWNER_GITHUB_TOKEN on Vercel to control the pipeline from here"
      >
        Pipeline control unavailable
      </span>
    )
  }

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={enabled}
        title={
          enabled
            ? 'Pause daily scrape + deploy (cancels in-progress runs)'
            : 'Enable pipeline and run scrape + deploy now'
        }
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-60 ${
          enabled
            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        <span
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
            enabled ? 'bg-emerald-800/40' : 'bg-slate-200'
          }`}
          aria-hidden
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              enabled ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </span>
        {busy ? 'Updating…' : enabled ? 'Pipeline on' : 'Pipeline off'}
        {enabled ? <Pause className="w-3.5 h-3.5 opacity-80" /> : <Play className="w-3.5 h-3.5 opacity-80" />}
      </button>
      {workflowUrl && (
        <a
          href={workflowUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-slate-400 hover:text-kem-accent hover:underline"
        >
          web-auto deploy.yml
        </a>
      )}
      {message && <p className="max-w-xs text-right text-[10px] text-slate-500">{message}</p>}
    </div>
  )
}
