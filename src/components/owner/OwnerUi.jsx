import React from 'react'

const STYLES = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  neutral: 'bg-slate-100 text-slate-600 border-slate-200',
}

export function StatusPill({ value, kind = 'neutral' }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STYLES[kind] || STYLES.neutral}`}>
      {value || '—'}
    </span>
  )
}

export function ExternalLink({ href, children, className = '' }) {
  if (!href) return <span className="text-slate-400">{children}</span>
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`text-kem-accent font-medium hover:underline ${className}`}
    >
      {children}
    </a>
  )
}

export function Panel({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-6 py-4">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
  )
}

export function StatCard({ label, value, hint, accent = 'text-slate-900', icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-bold tracking-[0.14em] uppercase text-slate-400">{label}</p>
        {Icon && <Icon className="w-4 h-4 text-slate-300 shrink-0" />}
      </div>
      <p className={`mt-2 text-2xl font-display font-bold ${accent}`}>{value}</p>
      {hint && <p className="mt-2 text-xs text-slate-500 leading-relaxed">{hint}</p>}
    </div>
  )
}

export function FilterPills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === id
              ? 'bg-kem-accent text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
