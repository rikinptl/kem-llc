import React from 'react'
import { motion } from 'framer-motion'
import DisplayHeadline from '../premium/DisplayHeadline'
import RevealFade from '../premium/RevealFade'
import { fadeTransition } from '../../lib/motion'
import { DARK_PANEL, DARK_PANEL_SOFT } from '../../lib/theme'

const BusinessTrust = () => (
  <section className="landing-section bg-kem-stone">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <DisplayHeadline
          lines={['Trusted by teams', 'small and large']}
          className="text-[clamp(1.75rem,4vw,2.75rem)] mb-6"
        />
        <RevealFade className="text-slate-600 text-lg leading-relaxed max-w-md" delay={0.1}>
          From fast-moving startups to regulated enterprises—we match pace, compliance, and clarity to how you
          actually work.
        </RevealFade>
      </div>

      <motion.div
        className="relative flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={fadeTransition(0.12, 0.9)}
      >
        <div className="relative w-full max-w-sm">
          <div className={`absolute top-8 left-0 right-8 h-44 rounded-2xl rotate-[-6deg] shadow-2xl p-6 flex flex-col justify-between premium-hover-lift ${DARK_PANEL}`}>
            <p className="text-kem-accent-light font-display font-extrabold text-2xl tracking-tight">KEM</p>
            <p className="text-white/70 text-sm">Enterprise delivery partner</p>
          </div>
          <div className={`relative mt-16 ml-8 h-44 rounded-2xl rotate-[4deg] shadow-2xl p-6 flex flex-col justify-between premium-hover-lift ${DARK_PANEL_SOFT}`}>
            <p className="text-kem-accent-light font-display font-extrabold text-2xl tracking-tight">KEM</p>
            <p className="text-white/70 text-sm">Automation · Infrastructure · Dev</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default BusinessTrust
