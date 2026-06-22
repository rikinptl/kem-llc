import React from 'react'
import { formatDuration, formatRelative, statusKind } from '../../lib/ownerFormat'
import { ExternalLink, Panel, StatusPill } from './OwnerUi'

function runModeLabel(run) {
  if (run.runMode === 'all_niches') {
    return `All niches${run.maxResults ? ` · max ${run.maxResults}` : ''}`
  }
  if (run.runMode === 'single') return 'Single niche'
  if (run.runMode === 'pending') return 'Backfill pending'
  return '—'
}

export default function OwnerRunsTable({ runs }) {
  return (
    <Panel title="Pipeline runs" subtitle="GitHub Actions · deploy.yml workflow history">
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-4">Run</th>
              <th className="pb-3 pr-4">Mode</th>
              <th className="pb-3 pr-4">Market</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Duration</th>
              <th className="pb-3 pr-4">When</th>
              <th className="pb-3">Log</th>
            </tr>
          </thead>
          <tbody>
            {runs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No runs found. Check OWNER_GITHUB_TOKEN on Vercel.
                </td>
              </tr>
            ) : (
              runs.map((run) => (
                <tr key={run.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                  <td className="py-3 pr-4">
                    <div className="font-medium text-slate-900">{run.name}</div>
                    <div className="font-mono text-xs text-slate-400">#{run.id}</div>
                  </td>
                  <td className="py-3 pr-4 text-xs text-slate-600">{runModeLabel(run)}</td>
                  <td className="py-3 pr-4 text-slate-600">
                    {run.niche && run.city ? `${run.niche} · ${run.city}` : run.city || '—'}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusPill
                      value={run.conclusion || run.status}
                      kind={statusKind(run.conclusion || run.status, 'run')}
                    />
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-slate-600">
                    {formatDuration(run.durationSec)}
                  </td>
                  <td className="py-3 pr-4 text-slate-500">{formatRelative(run.createdAt)}</td>
                  <td className="py-3">
                    <ExternalLink href={run.htmlUrl}>View log</ExternalLink>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
