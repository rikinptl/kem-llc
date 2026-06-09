import React from 'react'
import { motion } from 'framer-motion'

const BusinessTrust = () => (
  <section className="landing-section bg-kem-lime">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="landing-display text-[clamp(1.75rem,4vw,2.75rem)] mb-6 normal-case">
          Trusted by teams
          <br />
          small and large
        </h2>
        <p className="text-kem-forest/70 text-lg leading-relaxed max-w-md">
          From fast-moving startups to regulated enterprises—we match pace, compliance, and clarity to how you
          actually work.
        </p>
      </motion.div>

      <motion.div
        className="relative flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="relative w-full max-w-sm">
          <div className="absolute top-8 left-0 right-8 h-44 rounded-2xl bg-kem-forest rotate-[-6deg] shadow-2xl p-6 flex flex-col justify-between">
            <p className="text-kem-lime font-display font-extrabold text-2xl tracking-tight">KEM</p>
            <p className="text-white/70 text-sm">Enterprise delivery partner</p>
          </div>
          <div className="relative mt-16 ml-8 h-44 rounded-2xl bg-kem-forest-light rotate-[4deg] shadow-2xl p-6 flex flex-col justify-between border border-white/10">
            <p className="text-kem-lime font-display font-extrabold text-2xl tracking-tight">KEM</p>
            <p className="text-white/70 text-sm">Automation · Infrastructure · Dev</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default BusinessTrust
