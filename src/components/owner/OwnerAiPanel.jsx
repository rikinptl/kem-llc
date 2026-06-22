import React from 'react'
import { AlertTriangle, Wallet } from 'lucide-react'
import { formatTokens, formatUsd } from '../../lib/ownerFormat'
import { Panel, StatCard } from './OwnerUi'

export default function OwnerAiPanel({ aiCost, stats }) {
  const affordable = aiCost.sitesAffordable
  const pendingDeploy = stats.readyToDeploy
  const budgetCoversPending =
    affordable !== null && pendingDeploy > 0 ? affordable >= pendingDeploy : null
  const estTokensLeft = affordable != null ? affordable * aiCost.tokensPerSite : null

  return (
    <div className="space-y-6">
      <Panel title="Build capacity" subtitle="How many more customer sites your DeepSeek balance can fund">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Sites you can still build</p>
            <p className="mt-3 text-5xl font-display font-extrabold text-slate-900">
              {affordable != null ? `~${affordable.toLocaleString()}` : '—'}
            </p>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {affordable != null ? (
                <>
                  At <span className="font-mono font-semibold">${aiCost.costPerSiteUsd.toFixed(2)}</span> per site,
                  your <span className="font-semibold text-emerald-700">{formatUsd(aiCost.balanceUsd)}</span> balance
                  covers about <span className="font-semibold">{affordable}</span> more copy + site generations.
                </>
              ) : (
                aiCost.error || 'Set DEEPSEEK_API_KEY to see live balance and capacity.'
              )}
            </p>
            {estTokensLeft != null && (
              <p className="mt-2 text-xs text-slate-400">
                ≈ {formatTokens(estTokensLeft)} tokens at ~{aiCost.tokensPerSite.toLocaleString()}/site
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Formula</p>
              <p className="mt-2 font-mono text-sm text-slate-800">
                floor(balance ÷ ${aiCost.costPerSiteUsd.toFixed(2)})
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Queue vs budget</p>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-semibold text-amber-600">{pendingDeploy}</span> leads ready to deploy
              </p>
              {budgetCoversPending === true && (
                <p className="mt-2 text-xs text-emerald-600 font-medium">Balance covers the full pending queue.</p>
              )}
              {budgetCoversPending === false && affordable != null && (
                <p className="mt-2 text-xs text-amber-700">
                  Budget covers {affordable} of {pendingDeploy} pending — top up or batch runs.
                </p>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Already built (est.)</p>
              <p className="mt-2 text-lg font-display font-bold text-slate-900">
                {formatUsd(aiCost.estimatedSpendUsd)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {aiCost.sitesWithCopy} sites × ${aiCost.costPerSiteUsd.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {aiCost.isAvailable === false && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            DeepSeek reports insufficient balance — top up before the next pipeline run.
          </div>
        )}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="DeepSeek balance"
          value={aiCost.balanceUsd != null ? formatUsd(aiCost.balanceUsd) : '—'}
          hint={aiCost.configured ? 'Live API balance' : 'API key not set'}
          accent="text-kem-accent"
        />
        <StatCard label="Granted credits" value={aiCost.grantedUsd != null ? formatUsd(aiCost.grantedUsd) : '—'} />
        <StatCard label="Topped up" value={aiCost.toppedUpUsd != null ? formatUsd(aiCost.toppedUpUsd) : '—'} />
        <StatCard
          label="Est. tokens used"
          value={formatTokens(aiCost.estimatedTokens)}
          hint={`${aiCost.tokensPerSite.toLocaleString()} tokens / site assumption`}
        />
      </div>

      <Panel title="Cost assumptions" subtitle="Tune via Vercel env vars">
        <dl className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <dt className="text-slate-500 text-xs font-bold uppercase tracking-wider">DEEPSEEK_EST_COST_PER_SITE</dt>
            <dd className="mt-1 font-mono font-semibold text-slate-900">${aiCost.costPerSiteUsd.toFixed(2)}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <dt className="text-slate-500 text-xs font-bold uppercase tracking-wider">DEEPSEEK_EST_TOKENS_PER_SITE</dt>
            <dd className="mt-1 font-mono font-semibold text-slate-900">{aiCost.tokensPerSite.toLocaleString()}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-slate-500">
          GitHub Actions and kem-llc Pages are free for public repos. Only DeepSeek copy generation is metered here.
        </p>
      </Panel>
    </div>
  )
}
