import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import DisplayHeadline from '../premium/DisplayHeadline'
import RevealFade from '../premium/RevealFade'
import { fadeTransition } from '../../lib/motion'

const SECTORS = [
  { label: 'Technology', emoji: '💻', color: 'bg-red-100' },
  { label: 'Finance', emoji: '💳', color: 'bg-blue-100' },
  { label: 'Retail', emoji: '🛒', color: 'bg-amber-100' },
  { label: 'Logistics', emoji: '📦', color: 'bg-orange-100' },
  { label: 'SaaS', emoji: '☁️', color: 'bg-violet-100' },
]

const SectorsRow = () => (
  <section className="landing-section bg-kem-sky-deep overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <DisplayHeadline
        lines="Built for every industry you operate in"
        className="text-[clamp(1.5rem,3.5vw,2.25rem)] text-center mb-12 md:mb-16"
      />

      <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap md:flex-nowrap">
        {SECTORS.map((sector, i) => (
          <RevealFade
            key={sector.label}
            className="flex flex-col items-center gap-3"
            delay={i * 0.06}
            y={10}
            duration={0.8}
          >
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${sector.color} flex items-center justify-center text-3xl md:text-4xl shadow-sm border-4 border-white/60 premium-hover-lift`}
            >
              {sector.emoji}
            </div>
            <span className="text-sm font-bold text-slate-700">{sector.label}</span>
          </RevealFade>
        ))}
        <motion.div
          className="hidden md:flex w-14 h-14 rounded-full bg-slate-900 items-center justify-center shrink-0 premium-hover-lift"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowRight className="w-6 h-6 text-kem-accent-light" />
        </motion.div>
      </div>
    </div>
  </section>
)

export default SectorsRow
