import React from 'react'
import { Activity, CheckCircle2, Zap } from 'lucide-react'

const DashboardMock = () => (
  <div className="landing-card p-4 md:p-6 max-w-sm mx-auto lg:mr-auto">
    <div className="rounded-2xl bg-kem-forest text-white p-5 mb-4">
      <p className="text-xs text-kem-lime/80 font-semibold uppercase tracking-wider mb-1">Live ops</p>
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
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kem-lime/40">
              <Icon className="w-4 h-4 text-kem-forest" />
            </span>
            <span className="text-sm font-medium text-kem-forest/80">{label}</span>
          </div>
          <span className="font-display font-bold text-kem-forest">{value}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 h-2 rounded-full bg-kem-stone overflow-hidden">
      <div className="h-full w-[78%] rounded-full bg-kem-lime" />
    </div>
    <p className="text-xs text-kem-forest/45 mt-2 text-center">Capacity · healthy</p>
  </div>
)

export default DashboardMock
