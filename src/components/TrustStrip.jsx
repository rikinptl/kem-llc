import React from 'react'
import { motion } from 'framer-motion'

const TRUST_LABELS = [
  'Enterprise',
  'Startups',
  'Healthcare',
  'Finance',
  'Retail',
  'Technology',
  'Manufacturing',
  'Logistics',
]

const TrustStrip = () => {
  return (
    <section className="py-12 md:py-16 border-y border-slate-silver/15 bg-warm-white/50 overflow-hidden">
      <motion.p
        className="text-center text-slate-silver text-sm font-medium tracking-widest uppercase mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        They trusted us
      </motion.p>
      <motion.div
        className="flex gap-12 md:gap-16 items-center justify-center flex-wrap"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {TRUST_LABELS.map((label, i) => (
          <span
            key={label}
            className="text-midnight-blue/70 font-semibold text-lg tracking-tight"
          >
            {label}
          </span>
        ))}
      </motion.div>
    </section>
  )
}

export default TrustStrip
