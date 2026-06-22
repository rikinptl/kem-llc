import React, { useMemo, useState } from 'react'
import { isLive, isReached, isScrapedDone, statusKind } from '../../lib/ownerFormat'
import { ExternalLink, FilterPills, Panel, StatusPill } from './OwnerUi'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'ready', label: 'Ready' },
  { id: 'pending', label: 'Pending scrape' },
  { id: 'outreach', label: 'Needs outreach' },
]

export default function OwnerLeadsTable({ leads }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return leads.filter((lead) => {
      const matchesQuery =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.niche.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        (lead.phone || '').includes(q) ||
        (lead.address || '').toLowerCase().includes(q)

      const matchesFilter =
        filter === 'all' ||
        (filter === 'live' && isLive(lead)) ||
        (filter === 'pending' && !isScrapedDone(lead)) ||
        (filter === 'ready' && isScrapedDone(lead) && !isLive(lead)) ||
        (filter === 'outreach' && isLive(lead) && !lead.decline && !isReached(lead))

      return matchesQuery && matchesFilter
    })
  }, [leads, query, filter])

  return (
    <Panel
      title="Lead inventory"
      subtitle={`${filtered.length} of ${leads.length} businesses · all Sheet1 columns`}
      action={<FilterPills options={FILTERS} value={filter} onChange={setFilter} />}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search name, niche, city, phone, address…"
        className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-kem-accent/30"
      />

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[1200px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-3">Business</th>
              <th className="pb-3 pr-3">Niche</th>
              <th className="pb-3 pr-3">City</th>
              <th className="pb-3 pr-3">Phone</th>
              <th className="pb-3 pr-3">Address</th>
              <th className="pb-3 pr-3">Rating</th>
              <th className="pb-3 pr-3">Reached</th>
              <th className="pb-3 pr-3">Follow up</th>
              <th className="pb-3 pr-3">Comments</th>
              <th className="pb-3 pr-3">Scraped</th>
              <th className="pb-3">Links</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-400">
                  No leads match your filters. Run the GitHub Actions pipeline to populate the sheet.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={`${lead.name}-${lead.phone}`} className="border-b border-slate-50 hover:bg-slate-50/80">
                  <td className="py-3 pr-3 font-medium text-slate-900">{lead.name}</td>
                  <td className="py-3 pr-3 text-slate-600">{lead.niche || '—'}</td>
                  <td className="py-3 pr-3 text-slate-600">{lead.city || '—'}</td>
                  <td className="py-3 pr-3 font-mono text-xs text-slate-600">{lead.phone || '—'}</td>
                  <td className="py-3 pr-3 max-w-[140px] truncate text-xs text-slate-500" title={lead.address}>
                    {lead.address?.trim() || '—'}
                  </td>
                  <td className="py-3 pr-3 text-xs">
                    {lead.rating != null ? (
                      <span className="text-amber-600 font-semibold">{lead.rating}★</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-3 pr-3 text-xs text-slate-600">{lead.reachedOut?.trim() || '—'}</td>
                  <td className="py-3 pr-3 text-xs text-slate-600">{lead.followUp?.trim() || '—'}</td>
                  <td className="py-3 pr-3 max-w-[160px] truncate text-xs text-slate-500" title={lead.comments}>
                    {lead.comments?.trim() || '—'}
                  </td>
                  <td className="py-3 pr-3">
                    <StatusPill value={lead.scrapedStatus || '—'} kind={statusKind(lead.scrapedStatus, 'scraped')} />
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      <ExternalLink href={lead.mapsUrl?.startsWith('http') ? lead.mapsUrl : null}>
                        Maps
                      </ExternalLink>
                      <ExternalLink href={isLive(lead) ? lead.liveUrl : null}>
                        Live site
                      </ExternalLink>
                    </div>
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
