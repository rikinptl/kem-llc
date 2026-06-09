import React from 'react'
import { motion } from 'framer-motion'

const TRUST_LABELS = [
  'Enterprise', 'Startups', 'Finance',
  'Retail', 'Technology', 'Manufacturing', 'Logistics',
]

const TrustStrip = () => {
  const sequence = [...TRUST_LABELS, ...TRUST_LABELS]

  return (
    <section className="relative py-14 md:py-16 border-y border-white/[0.08] bg-surface overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-ambient opacity-40" aria-hidden />
      {/* Jetstream-ish soft grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] jetstream-soft-grid" aria-hidden />

      <motion.p
        className="relative z-10 text-center text-white/45 text-xs font-semibold tracking-[0.2em] uppercase mb-8 px-6"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Teams that ship with us
      </motion.p>

      <div className="relative z-10 marquee-mask">
        <div className="marquee-track flex w-max gap-16 md:gap-24 items-center">
          {sequence.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="text-white/65 font-semibold text-base tracking-tight whitespace-nowrap shrink-0"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustStrip
