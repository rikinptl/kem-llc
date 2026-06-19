import React from 'react'
import { Activity, CheckCircle2, Zap } from 'lucide-react'
import { DARK_PANEL } from '../../lib/theme'

const DashboardMock = () => (
  <div className="landing-card p-4 md:p-6 max-w-sm mx-auto lg:mr-auto">
    <div className={`rounded-2xl p-5 mb-4 ${DARK_PANEL}`}>
      <p className="text-xs text-kem-accent-light/90 font-semibold uppercase tracking-wider mb-1">Live ops</p>
      <p className="text-2xl font-display font-bold">99.97% uptime</p>
      <p className="text-white/60 text-sm mt-1">Last 30 days · 3 regions</p>
    </div>
    <div className="space-y-3">
      {[
        { icon: Zap, label: 'Workflows automated', value: '142' },
        { icon: Activity, label: 'Alerts resolved', value: '28' },
        { icon: CheckCircle2, label: 'Deploys this week', value: '17' },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center justify-between rounded-xl bg-kem-stone px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kem-accent/10">
              <Icon className="w-4 h-4 text-slate-900" />
            </span>
            <span className="text-sm font-medium text-slate-700">{label}</span>
          </div>
          <span className="font-display font-bold text-slate-900">{value}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 h-2 rounded-full bg-kem-stone overflow-hidden">
      <div className="h-full w-[78%] rounded-full bg-kem-accent" />
    </div>
    <p className="text-xs text-slate-500 mt-2 text-center">Capacity · healthy</p>
  </div>
)

export default DashboardMock
