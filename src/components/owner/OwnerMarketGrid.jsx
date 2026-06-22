import React, { useMemo, useState } from 'react'
import { formatRelative, statusKind } from '../../lib/ownerFormat'
import { FilterPills, Panel, StatusPill } from './OwnerUi'

const PHASES = [
  { id: 'all', label: 'All phases' },
  { id: '1', label: 'Phase 1' },
  { id: '2', label: 'Phase 2' },
  { id: '3', label: 'Phase 3' },
]

export default function OwnerMarketGrid({ coverage }) {
  const [phase, setPhase] = useState('all')

  const filtered = useMemo(() => {
    if (phase === 'all') return coverage
    return coverage.filter((c) => c.phase === Number(phase))
  }, [coverage, phase])

  const active = filtered.filter((c) => c.leadCount > 0 || c.lastRunAt).length
  const live = filtered.filter((c) => c.liveCount > 0).length

  return (
    <Panel
      title="Market coverage"
      subtitle={`${active} markets touched · ${live} with live sites`}
      action={<FilterPills options={PHASES} value={phase} onChange={setPhase} />}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((cell) => {
          const touched = cell.leadCount > 0 || cell.lastRunAt
          return (
            <div
              key={`${cell.nicheId}-${cell.cityId}`}
              className={`rounded-xl border p-4 transition ${
                cell.liveCount > 0
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : touched
                    ? 'border-amber-200 bg-amber-50/30'
                    : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{cell.nicheLabel}</p>
                  <p className="text-xs text-slate-500">{cell.cityLabel}</p>
                </div>
                <span className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                  P{cell.phase}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                <span>
                  <span className="font-mono font-semibold text-slate-900">{cell.leadCount}</span> leads
                </span>
                <span className="text-slate-300">·</span>
                <span>
                  <span className="font-mono font-semibold text-emerald-600">{cell.liveCount}</span> live
                </span>
              </div>
              {cell.lastRunAt ? (
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500">{formatRelative(cell.lastRunAt)}</span>
                  <StatusPill
                    value={cell.lastRunStatus || '—'}
                    kind={statusKind(cell.lastRunStatus, 'run')}
                  />
                </div>
              ) : (
                <p className="mt-3 text-[11px] text-slate-400">Not run yet</p>
              )}
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
