import React, { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'

const AREAS = [
  { id: 'automation', label: 'Automation', rate: 1 },
  { id: 'infra', label: 'Infrastructure', rate: 1.2 },
  { id: 'dev', label: 'Development', rate: 0.9 },
]

const TIMELINES = [
  { id: 'sprint', label: '2–4 weeks', multiplier: 1 },
  { id: 'quarter', label: '1 quarter', multiplier: 2.4 },
  { id: 'retainer', label: 'Ongoing', multiplier: 3.2 },
]

const ScopeWidget = () => {
  const [areaIdx, setAreaIdx] = useState(0)
  const [timelineIdx, setTimelineIdx] = useState(0)

  const area = AREAS[areaIdx]
  const timeline = TIMELINES[timelineIdx]
  const effortScore = Math.round(area.rate * timeline.multiplier * 10)

  return (
    <div className="landing-card p-6 md:p-8 max-w-md mx-auto lg:ml-auto">
      <p className="text-sm font-semibold text-slate-500 mb-6">Rough scope estimator</p>

      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Focus</label>
      <div className="flex gap-2 mb-6 flex-wrap">
        {AREAS.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAreaIdx(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              i === areaIdx ? 'bg-slate-900 text-white' : 'bg-kem-stone text-slate-600 hover:bg-kem-sky'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Timeline</label>
      <select
        value={timelineIdx}
        onChange={(e) => setTimelineIdx(Number(e.target.value))}
        className="w-full mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-kem-accent/30"
      >
        {TIMELINES.map((t, i) => (
          <option key={t.id} value={i}>
            {t.label}
          </option>
        ))}
      </select>

      <div className="flex items-center justify-center gap-3 py-4 mb-4 rounded-2xl bg-kem-sky/60">
        <ArrowRightLeft className="w-5 h-5 text-slate-500" />
        <span className="text-3xl font-display font-extrabold text-slate-900">{effortScore}</span>
        <span className="text-sm text-slate-500">complexity index</span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Illustrative only—real scope depends on stack, compliance, and integrations. We&apos;ll refine on a call.
      </p>
    </div>
  )
}

export default ScopeWidget
