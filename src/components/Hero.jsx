import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Hero = () => {
  const { ref, scrollProgress } = useScrollAnimation()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Transform values based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  // Text blur-to-focus animation - only on initial load, not scroll-based
  // This ensures text is always clear when at the top
  const [hasAnimated, setHasAnimated] = React.useState(false)
  
  React.useEffect(() => {
    // Mark as animated after initial load
    const timer = setTimeout(() => setHasAnimated(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-section px-6 lg:px-12"
    >
      {/* Clean white background */}
      <div className="absolute inset-0 -z-10 bg-stark-white" />

      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="max-w-4xl"
          style={{
            opacity,
            scale,
            y,
          }}
        >
          {/* Main headline with subtle gradient text */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-midnight-blue tracking-tight leading-none mb-8"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1, 
              filter: hasAnimated ? 'blur(0px)' : 'blur(0px)'
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Digital Excellence,<br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Automated
            </motion.span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-xl md:text-2xl text-slate-silver font-light leading-relaxed mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Transforming businesses with AI front desk assistants, professional web presence, and automated reputation management.
          </motion.p>

          {/* Magnetic CTA Button */}
          <MagneticButton />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-midnight-blue rounded-full flex justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-midnight-blue rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Magnetic Button Component
const MagneticButton = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const buttonRef = React.useRef(null)

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      className="relative bg-midnight-blue text-stark-white px-10 py-4 font-semibold text-sm tracking-tight overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      {/* Simple hover effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <span className="relative z-10">Get Started</span>
    </motion.button>
  )
}

export default Hero
