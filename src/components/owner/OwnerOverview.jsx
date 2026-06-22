import React from 'react'
import {
  BarChart3,
  Globe,
  Layers,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { StatCard, Panel } from './OwnerUi'

function FunnelBar({ label, value, max, colorClass }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-mono font-semibold text-slate-900">
          {value}
          <span className="text-slate-400 font-normal"> ({pct}%)</span>
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full transition-all ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function BreakdownList({ title, rows, keyField }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-display font-bold text-base text-slate-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {rows.slice(0, 10).map((row) => (
          <li key={row[keyField]} className="flex items-center gap-3 text-sm">
            <span className="flex-1 truncate text-slate-700">{row[keyField]}</span>
            <span className="font-mono font-semibold text-slate-900 w-8 text-right">{row.count}</span>
            <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-kem-accent rounded-full"
                style={{ width: `${rows[0]?.count ? (row.count / rows[0].count) * 100 : 0}%` }}
              />
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="text-sm text-slate-400">No data yet</li>}
      </ul>
    </div>
  )
}

export default function OwnerOverview({ data }) {
  const { stats, runSummary, marketsTotal, outreach, byNiche, byCity } = data
  const conversion = stats.total > 0 ? Math.round((stats.liveSites / stats.total) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Leads in inventory" value={stats.total} hint="Google Sheet · Sheet1" />
        <StatCard
          icon={Globe}
          label="Live sites deployed"
          value={stats.liveSites}
          hint={`${conversion}% of leads have a live URL on kem-llc Pages`}
          accent="text-emerald-600"
        />
        <StatCard
          icon={Target}
          label="Scraped"
          value={stats.scraped}
          hint={`${stats.scrapedPending} pending scrape · ${stats.readyToDeploy} ready to deploy`}
          accent="text-kem-accent"
        />
        <StatCard
          icon={TrendingUp}
          label="Pipeline success rate"
          value={`${runSummary.successRate}%`}
          hint={`${runSummary.failure} failed of ${runSummary.total} recent runs`}
          accent={runSummary.successRate >= 70 ? 'text-emerald-600' : 'text-amber-600'}
        />
        <StatCard icon={Layers} label="Market combos" value={marketsTotal} hint="Niche × city targets configured" />
        <StatCard
          icon={Rocket}
          label="Awaiting deploy"
          value={stats.readyToDeploy}
          hint="Scraped, no live URL yet"
          accent="text-amber-600"
        />
        <StatCard
          icon={BarChart3}
          label="Funnel gap"
          value={Math.max(0, stats.scraped - stats.liveSites)}
          hint="Scraped but not yet live"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Lead funnel" subtitle="Scrape → pipeline deploy → kem-llc Pages" className="lg:col-span-1">
          <div className="space-y-4">
            <FunnelBar label="In inventory" value={stats.total} max={stats.total || 1} colorClass="bg-slate-400" />
            <FunnelBar label="Scraped" value={stats.scraped} max={stats.total || 1} colorClass="bg-violet-500" />
            <FunnelBar label="Ready to deploy" value={stats.readyToDeploy} max={stats.total || 1} colorClass="bg-amber-500" />
            <FunnelBar label="Live on kem-llc" value={stats.liveSites} max={stats.total || 1} colorClass="bg-emerald-500" />
          </div>
        </Panel>

        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          <BreakdownList title="Top niches" rows={byNiche} keyField="niche" />
          <BreakdownList title="Top cities" rows={byCity} keyField="city" />
        </div>
      </div>

      <Panel title="Outreach pipeline" subtitle="Owner actions tracked in the sheet">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Live, not reached" value={outreach.pendingOutreach} hint="Demo-ready · needs outreach" accent="text-kem-accent" />
          <StatCard label="Reached out" value={outreach.reached} hint="Reached Out column populated" />
          <StatCard label="Follow-ups due" value={outreach.needsFollowUp} hint="Follow up column set" accent="text-amber-600" />
          <StatCard label="Declined" value={outreach.declined} hint="Decline = Y in sheet" accent="text-slate-500" />
        </div>
      </Panel>
    </div>
  )
}
