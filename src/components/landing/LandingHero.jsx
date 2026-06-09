import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

const LandingHero = () => (
  <section className="landing-section pt-32 md:pt-36 pb-16 md:pb-24 bg-white overflow-hidden">
    <div className="max-w-5xl mx-auto text-center">
      <motion.h1
        className="landing-display text-[clamp(2.25rem,6.5vw,4.75rem)] mb-10 text-balance"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Tech for teams
        <br />
        that ship everywhere
      </motion.h1>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mb-16 md:mb-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Link to="/contact" className="landing-pill-primary">
          Get started
        </Link>
        <Link to="/solutions" className="landing-pill-secondary gap-2">
          <Play className="w-4 h-4 fill-kem-forest" />
          See how we work
        </Link>
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-md aspect-square"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        aria-hidden
      >
        <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-kem-lime via-kem-lime-soft to-kem-sky shadow-[0_24px_80px_-20px_rgba(159,232,112,0.55)]" />
        <div className="absolute inset-[18%] rounded-full bg-kem-forest/90 shadow-inner" />
        <div className="absolute inset-[22%] rounded-full border border-white/10 bg-gradient-to-tr from-kem-forest-light to-kem-forest overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(159,232,112,0.5),transparent_55%)]" />
          <svg className="absolute inset-0 w-full h-full text-kem-lime/25" viewBox="0 0 200 200">
            <ellipse cx="100" cy="100" rx="90" ry="36" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-20 100 100)" />
            <ellipse cx="100" cy="100" rx="90" ry="36" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(40 100 100)" />
            <ellipse cx="100" cy="100" rx="90" ry="36" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(100 100 100)" />
          </svg>
        </div>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 w-full h-full landing-globe-ring"
            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
          >
            <span
              className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-kem-lime shadow-[0_0_12px_rgba(159,232,112,0.8)]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          </div>
        ))}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white border border-kem-forest/10 text-xs font-semibold text-kem-forest/70 shadow-sm">
          Automation · Cloud · Apps
        </div>
      </motion.div>
    </div>
  </section>
)

export default LandingHero
