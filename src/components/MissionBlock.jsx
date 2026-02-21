import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const MissionBlock = () => {
  const { ref } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 lg:px-12 bg-midnight-blue text-stark-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          We're an IT automation company built for clarity and scale.
        </motion.h2>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white/90 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          We create systems that reduce complexity and deliver measurable results.
        </motion.h2>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-white text-midnight-blue px-8 py-4 font-semibold text-sm tracking-tight hover:bg-warm-white transition-colors"
          >
            Get in touch
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center justify-center border border-white/50 text-white px-8 py-4 font-semibold text-sm tracking-tight hover:bg-white/10 transition-colors"
          >
            More about us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionBlock
