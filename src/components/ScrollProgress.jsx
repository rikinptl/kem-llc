import React from 'react'
import { motion, useScroll } from 'framer-motion'

/**
 * Thin top bar driven by scroll — marketing-site polish (Jetstream-style motion cue).
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  /* Below fixed nav (nav is z-50); was top-0 z-48 so the bar sat *under* the nav and looked like “nothing changed”. */
  return (
    <div
      className="fixed top-20 md:top-24 left-0 right-0 z-[55] h-[3px] pointer-events-none"
      aria-hidden
    >
      <motion.div
        className="h-full w-full origin-left bg-accent shadow-[0_0_16px_rgba(0,212,255,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}

export default ScrollProgress
