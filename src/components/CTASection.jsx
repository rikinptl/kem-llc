import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-12 bg-midnight-blue text-stark-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to
          <br />
          <span className="text-white/90">get started?</span>
        </motion.h2>
        <motion.p
          className="text-xl text-white/80 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          No sales pitch—just a clear conversation about whether we're the right fit for your next project.
        </motion.p>
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
            Request a quote
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center border border-white/50 text-white px-8 py-4 font-semibold text-sm tracking-tight hover:bg-white/10 transition-colors"
          >
            Book a call
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
