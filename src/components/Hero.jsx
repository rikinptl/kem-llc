import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const ROTATING_WORDS = [
  'automation',
  'precision',
  'growth',
  'results',
  'innovation',
  'excellence',
  'simplicity',
]

const Hero = () => {
  const { ref, scrollProgress } = useScrollAnimation()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-24 px-6 lg:px-12"
    >
      <div className="absolute inset-0 -z-10 bg-stark-white" />

      <div className="max-w-6xl mx-auto w-full text-center">
        <motion.div className="max-w-4xl mx-auto" style={{ opacity, scale, y }}>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-midnight-blue tracking-tight leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            We deliver
            <br />
            <span className="relative inline-block min-h-[1.1em] text-accent-teal">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 left-0 right-0"
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-silver font-light leading-relaxed mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Transform ideas into impactful digital experiences. We streamline complexity into performance.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/solutions"
              className="inline-flex items-center justify-center bg-midnight-blue text-stark-white px-8 py-4 font-semibold text-sm tracking-tight hover:bg-deep-blue transition-colors duration-300"
            >
              Our solutions
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border-2 border-midnight-blue text-midnight-blue px-8 py-4 font-semibold text-sm tracking-tight hover:bg-midnight-blue hover:text-white transition-all duration-300"
            >
              Get in touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
