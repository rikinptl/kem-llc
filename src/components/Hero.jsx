import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Circle } from 'lucide-react'
import { ElegantShape } from '@/components/ui/shape-landing-hero'

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-12 bg-[#030303]"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl"
          style={{ y: bgY }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-cyan-500/[0.12]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-accent/[0.18]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />
          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-violet-500/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        <motion.div
          className="max-w-6xl mx-auto overflow-visible"
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-10"
          >
            <Circle className="h-2 w-2 fill-accent/90" />
            <span className="text-sm text-white/60 tracking-wide">
              KEM · IT automation
            </span>
          </motion.div>

          <motion.h1
            className="font-display font-extrabold mb-6 overflow-visible"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/85">
              We deliver
            </span>
            <br />
            <span
              className="relative inline-block min-h-[1.2em] text-center overflow-visible"
              style={{ minWidth: 'min(22ch, 85vw)', fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="absolute left-1/2 top-0 -translate-x-1/2 inline-block whitespace-nowrap font-display font-extrabold text-accent drop-shadow-[0_0_28px_rgba(0,212,255,0.35)]"
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
            className="text-lg md:text-xl text-white/45 font-light max-w-2xl mx-auto mb-14 leading-relaxed tracking-wide"
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
              className="group relative inline-flex items-center justify-center border-2 border-white/25 text-white px-10 py-4 font-semibold text-sm tracking-tight rounded-full transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/10 hover:shadow-glow"
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
