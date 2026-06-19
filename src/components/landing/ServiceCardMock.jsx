import React from 'react'
import { Bot, Cloud, Code2 } from 'lucide-react'
import { DARK_PANEL } from '../../lib/theme'

const PILLARS = [
  { icon: Bot, label: 'Automation' },
  { icon: Cloud, label: 'Cloud' },
  { icon: Code2, label: 'Apps' },
]

const ServiceCardMock = () => (
  <div className="relative max-w-md mx-auto lg:mr-auto">
    <div className="absolute -inset-4 rounded-[2rem] bg-kem-accent/10 blur-2xl" aria-hidden />
    <div className={`relative rounded-2xl p-6 md:p-8 shadow-xl ${DARK_PANEL}`}>
      <p className="text-kem-accent-light text-xs font-bold tracking-[0.2em] uppercase mb-2">KEM</p>
      <p className="font-display font-bold text-xl md:text-2xl mb-1">Ship faster. Sleep better.</p>
      <p className="text-white/60 text-sm mb-6">Measured in outcomes, not slide decks.</p>
      <div className="flex flex-wrap gap-2">
        {PILLARS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80"
          >
            <Icon className="h-3.5 w-3.5 text-kem-accent-light" />
            {label}
          </span>
        ))}
      </div>
    </div>
  </div>
)

export default ServiceCardMock
