import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

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
  const ref = React.useRef(null)
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

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 120])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-12"
      style={{ backgroundColor: '#0A0A0B' }}
    >
      {/* Backgrounds: clip only the bg so content is never clipped */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -20 }} aria-hidden>
        <div className="absolute inset-0 bg-void" />
        <motion.div className="absolute inset-0 bg-mesh opacity-100" style={{ y: bgY }} />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-ink to-void" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto text-center">
        <motion.div
          className="max-w-6xl mx-auto overflow-visible"
          style={{ opacity, scale, y }}
        >
          <motion.h1
            className="font-display font-extrabold text-white mb-6 overflow-visible"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            We deliver
            <br />
            <span
              className="relative inline-block min-h-[1.2em] text-accent text-center overflow-visible"
              style={{ minWidth: 'min(22ch, 85vw)', fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="absolute left-1/2 top-0 -translate-x-1/2 inline-block whitespace-nowrap"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-14 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Transform ideas into impactful digital experiences. We streamline complexity into performance.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/solutions"
              className="group relative inline-flex items-center justify-center bg-accent text-void px-10 py-4 font-semibold text-sm tracking-tight overflow-hidden rounded-full transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
            >
              <span className="relative z-10">Our solutions</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </Link>
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center border-2 border-white/70 text-white px-10 py-4 font-semibold text-sm tracking-tight rounded-full transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/10 hover:shadow-glow"
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
