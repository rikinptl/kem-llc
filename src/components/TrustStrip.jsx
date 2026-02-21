import React from 'react'
import { motion } from 'framer-motion'

const TRUST_LABELS = [
  'Enterprise', 'Startups', 'Healthcare', 'Finance',
  'Retail', 'Technology', 'Manufacturing', 'Logistics',
]

const TrustStrip = () => {
  return (
    <section className="py-14 md:py-18 border-y border-ink/10 bg-cloud overflow-hidden">
      <motion.p
        className="text-center text-silver text-xs font-semibold tracking-[0.2em] uppercase mb-8"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        They trusted us
      </motion.p>
      <motion.div
        className="flex gap-12 md:gap-20 items-center justify-center flex-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, staggerChildren: 0.05 }}
      >
        {TRUST_LABELS.map((label, i) => (
          <motion.span
            key={label}
            className="text-ink/70 font-semibold text-base tracking-tight"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}

export default TrustStrip
