import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DisplayHeadline from '../premium/DisplayHeadline'
import RevealFade from '../premium/RevealFade'
import { fadeTransition } from '../../lib/motion'
import { DARK_SECTION } from '../../lib/theme'

const MissionBanner = () => (
  <section className={`landing-section overflow-hidden ${DARK_SECTION}`}>
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <DisplayHeadline
          lines={['Meet tech', 'without friction']}
          lineClassName={['text-white', 'text-kem-accent-light']}
          className="text-[clamp(1.75rem,4vw,2.75rem)] text-white mb-6"
        />
        <RevealFade className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg" delay={0.1}>
          KEM is how ambitious teams ship automation, infrastructure, and software—measured in outcomes, not slide
          decks.
        </RevealFade>
        <RevealFade delay={0.16} y={10}>
          <Link
            to="/contact"
            className="landing-pill bg-kem-accent text-white px-8 py-3.5 font-semibold hover:brightness-105 inline-flex premium-hover-lift"
            data-cursor="interactive"
          >
            Start a project
          </Link>
        </RevealFade>
      </div>

      <motion.div
        className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-800 to-blue-950 premium-hover-lift"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={fadeTransition(0.14, 1)}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-kem-accent/15 via-transparent to-kem-sky/10" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-xs rounded-3xl bg-white/10 backdrop-blur border border-white/15 p-6">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-kem-accent" />
              <span className="w-3 h-3 rounded-full bg-white/30" />
              <span className="w-3 h-3 rounded-full bg-white/30" />
            </div>
            <p className="text-kem-accent-light text-sm font-bold mb-2">Deploy ready</p>
            <p className="text-white/80 text-2xl font-display font-bold">Ship in weeks</p>
            <p className="text-white/50 text-sm mt-2">Not quarters.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default MissionBanner
