import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const MissionBanner = () => (
  <section className="landing-section bg-kem-forest text-white overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="landing-display text-[clamp(1.75rem,4vw,2.75rem)] text-white mb-6 normal-case">
          Meet tech
          <br />
          <span className="text-kem-lime">without friction</span>
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
          KEM is how ambitious teams ship automation, infrastructure, and software—measured in outcomes, not slide
          decks.
        </p>
        <Link
          to="/contact"
          className="landing-pill bg-kem-lime text-kem-forest px-8 py-3.5 font-semibold hover:brightness-95 inline-flex"
        >
          Start a project
        </Link>
      </motion.div>

      <motion.div
        className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-kem-forest-light"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-kem-lime/20 via-transparent to-kem-sky/10" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-xs rounded-3xl bg-white/10 backdrop-blur border border-white/15 p-6">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-kem-lime" />
              <span className="w-3 h-3 rounded-full bg-white/30" />
              <span className="w-3 h-3 rounded-full bg-white/30" />
            </div>
            <p className="text-kem-lime text-sm font-bold mb-2">Deploy ready</p>
            <p className="text-white/80 text-2xl font-display font-bold">Ship in weeks</p>
            <p className="text-white/50 text-sm mt-2">Not quarters.</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default MissionBanner
