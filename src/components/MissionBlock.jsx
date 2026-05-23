import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const MissionBlock = () => {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-surface text-white relative overflow-hidden border-y border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 bg-ambient opacity-50" aria-hidden />
      <div className="absolute inset-0 bg-mesh-dark opacity-60" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          className="font-display font-bold text-display-md tracking-tight leading-tight mb-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          We're an IT automation company built for clarity and scale.
        </motion.h2>
        <motion.h2
          className="font-display font-bold text-display-md tracking-tight leading-tight text-pearl/90 mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          We create systems that reduce complexity and deliver measurable results.
        </motion.h2>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-accent text-void px-10 py-4 font-semibold text-sm tracking-tight rounded-full hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
          >
            Get in touch
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center justify-center border border-white/20 text-white/90 px-10 py-4 font-semibold text-sm tracking-tight rounded-full hover:border-accent hover:text-accent transition-colors duration-300"
          >
            More about us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionBlock
