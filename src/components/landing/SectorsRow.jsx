import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const SECTORS = [
  { label: 'Healthcare', emoji: '🏥', color: 'bg-red-100' },
  { label: 'Finance', emoji: '💳', color: 'bg-blue-100' },
  { label: 'Retail', emoji: '🛒', color: 'bg-amber-100' },
  { label: 'Logistics', emoji: '📦', color: 'bg-orange-100' },
  { label: 'SaaS', emoji: '☁️', color: 'bg-violet-100' },
]

const SectorsRow = () => (
  <section className="landing-section bg-kem-lime overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        className="landing-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-center mb-12 md:mb-16 normal-case"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Built for every industry you operate in
      </motion.h2>

      <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
        {SECTORS.map((sector, i) => (
          <motion.div
            key={sector.label}
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${sector.color} flex items-center justify-center text-3xl md:text-4xl shadow-sm border-4 border-white/60`}
            >
              {sector.emoji}
            </div>
            <span className="text-sm font-bold text-kem-forest/80">{sector.label}</span>
          </motion.div>
        ))}
        <motion.div
          className="hidden md:flex w-14 h-14 rounded-full bg-kem-forest items-center justify-center shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <ArrowRight className="w-6 h-6 text-kem-lime" />
        </motion.div>
      </div>
    </div>
  </section>
)

export default SectorsRow
