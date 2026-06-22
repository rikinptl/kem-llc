import React, { useMemo, useState } from 'react'
import { ChevronDown, ExternalLink, MapPin, Star } from 'lucide-react'
import { formatUsd, isLive, leadKey } from '../../lib/ownerFormat'
import { Panel } from './OwnerUi'

export default function OwnerLiveSitesPanel({ leads, aiCost, kemOrg }) {
  const [expandedKey, setExpandedKey] = useState(null)

  const liveLeads = useMemo(
    () => leads.filter(isLive).sort((a, b) => a.name.localeCompare(b.name)),
    [leads]
  )

  const costPerSite = aiCost?.costPerSiteUsd ?? 0.03
  const tokensPerSite = aiCost?.tokensPerSite ?? 4500

  if (liveLeads.length === 0) {
    return (
      <Panel title="Live sites" subtitle="Deployed on kem-llc GitHub Pages">
        <p className="py-12 text-center text-sm text-slate-500">
          No live URLs in the sheet yet. Run the pipeline or use the demo workflow for a single business.
        </p>
      </Panel>
    )
  }

  return (
    <Panel
      title="Live sites"
      subtitle={`${liveLeads.length} deployed · expand for Maps, demo link, and est. AI cost`}
    >
      <p className="mb-4 text-sm text-slate-500">
        Org:{' '}
        <a href={kemOrg} target="_blank" rel="noreferrer" className="text-kem-accent font-medium hover:underline">
          kem-llc
        </a>
        {' · '}Each row is a customer demo you can send to prospects
      </p>

      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
        {liveLeads.map((lead) => {
          const key = leadKey(lead)
          const expanded = expandedKey === key
          const mapsUrl = lead.mapsUrl?.trim() ?? ''
          const hasMaps = mapsUrl.startsWith('http')

          return (
            <li key={key} className="bg-white">
              <button
                type="button"
                onClick={() => setExpandedKey(expanded ? null : key)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate">{lead.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lead.niche || '—'}
                    {lead.city ? ` · ${lead.city}` : ''}
                    {lead.rating != null && (
                      <span className="ml-2 text-amber-600 inline-flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-current" />
                        {lead.rating}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={lead.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:inline-flex rounded-lg bg-emerald-50 text-emerald-700 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-100"
                  >
                    Open demo
                  </a>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {expanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-4">
                  <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Live demo site</dt>
                      <dd className="mt-1">
                        <a
                          href={lead.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all font-mono text-xs text-emerald-700 hover:underline"
                        >
                          {lead.liveUrl.replace(/^https?:\/\//, '')}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Google Maps</dt>
                      <dd className="mt-1">
                        {hasMaps ? (
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-kem-accent text-xs font-medium hover:underline"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            Open listing
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">Not in sheet</span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Site created</dt>
                      <dd className="mt-1 text-xs text-slate-700">{lead.siteCreatedAt || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</dt>
                      <dd className="mt-1 font-mono text-xs text-slate-700">{lead.phone || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Address</dt>
                      <dd className="mt-1 text-xs text-slate-700">{lead.address?.trim() || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Est. AI cost</dt>
                      <dd className="mt-1 font-mono text-slate-900">{formatUsd(costPerSite)}</dd>
                      <p className="text-[10px] text-slate-400 mt-0.5">~{tokensPerSite.toLocaleString()} tokens</p>
                    </div>
                    {(lead.reachedOut || lead.followUp || lead.comments) && (
                      <div className="sm:col-span-2 lg:col-span-3 rounded-xl bg-white border border-slate-200 p-3">
                        <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Outreach notes</dt>
                        <dd className="text-xs text-slate-600 space-y-1">
                          {lead.reachedOut?.trim() && <p><span className="font-semibold">Reached:</span> {lead.reachedOut}</p>}
                          {lead.followUp?.trim() && <p><span className="font-semibold">Follow up:</span> {lead.followUp}</p>}
                          {lead.comments?.trim() && <p><span className="font-semibold">Comments:</span> {lead.comments}</p>}
                          {lead.decline && <p className="text-red-600 font-semibold">Declined</p>}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={lead.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white px-4 py-2 text-xs font-semibold hover:bg-emerald-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open live demo
                    </a>
                    {hasMaps && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Google Maps
                      </a>
                    )}
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Call {lead.phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
