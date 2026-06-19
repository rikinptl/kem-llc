import React from 'react'
import { motion, useScroll } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-[55] h-[3px] pointer-events-none" aria-hidden>
      <motion.div
        className="h-full w-full origin-left bg-kem-accent shadow-[0_0_16px_rgba(37,99,235,0.25)]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}

export default ScrollProgress
