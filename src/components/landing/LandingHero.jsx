import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import DisplayHeadline from '../premium/DisplayHeadline'
import RevealFade from '../premium/RevealFade'

const LandingHero = () => (
  <section className="landing-section pt-32 md:pt-36 pb-16 md:pb-24 bg-white overflow-hidden">
    <div className="max-w-5xl mx-auto text-center">
      <DisplayHeadline
        as="h1"
        lines={['Tech for teams', 'that ship everywhere']}
        className="text-[clamp(2.25rem,6.5vw,4.75rem)] mb-10 text-balance"
      />

      <RevealFade className="flex flex-wrap items-center justify-center gap-4 mb-16 md:mb-20" delay={0.12}>
        <Link to="/contact" className="landing-pill-primary" data-cursor="interactive">
          Get started
        </Link>
        <Link to="/solutions" className="landing-pill-secondary gap-2" data-cursor="interactive">
          <Play className="w-4 h-4 fill-slate-900" />
          See how we work
        </Link>
      </RevealFade>

      <motion.div
        className="relative mx-auto w-full max-w-md aspect-square"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        {/* Ambient glow */}
        <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-kem-accent-light/50 via-kem-accent-muted to-white blur-[2px] shadow-[0_32px_90px_-20px_rgba(37,99,235,0.5)]" />

        {/* White rim + luminous sphere */}
        <div className="absolute inset-[14%] rounded-full p-[5px] bg-gradient-to-b from-white via-white to-kem-sky-deep shadow-[0_20px_60px_-20px_rgba(37,99,235,0.35)]">
          <div className="relative h-full w-full rounded-full overflow-hidden bg-gradient-to-br from-[#1e40af] via-kem-accent to-kem-accent-light">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.55),transparent_48%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_78%,rgba(15,23,42,0.28),transparent_52%)]" />
            <svg className="absolute inset-0 w-full h-full text-white/40" viewBox="0 0 200 200">
              <ellipse cx="100" cy="100" rx="90" ry="36" fill="none" stroke="currentColor" strokeWidth="1.25" transform="rotate(-20 100 100)" />
              <ellipse cx="100" cy="100" rx="90" ry="36" fill="none" stroke="currentColor" strokeWidth="1.25" transform="rotate(40 100 100)" />
              <ellipse cx="100" cy="100" rx="90" ry="36" fill="none" stroke="currentColor" strokeWidth="1.25" transform="rotate(100 100 100)" />
            </svg>
          </div>
        </div>

        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 w-full h-full landing-globe-ring"
            style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
          >
            <span
              className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-white border-2 border-kem-accent shadow-[0_0_16px_rgba(96,165,250,0.9)]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          </div>
        ))}

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white border border-kem-accent/15 text-xs font-semibold text-slate-900 shadow-[0_8px_24px_-12px_rgba(37,99,235,0.2)]">
          Automation · Cloud · Apps
        </div>
      </motion.div>
    </div>
  </section>
)

export default LandingHero
