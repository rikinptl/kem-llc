import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LineReveal from './LineReveal'

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-void text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-100" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <LineReveal lines={['Ready to', 'get started?']} as="h2" className="text-display-lg font-display font-bold tracking-tight mb-6 text-center" lineClassName={['text-white', 'text-pearl/90']} stagger={0.08} />
        <motion.p
          className="text-xl text-pearl/80 mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          No sales pitch—just a clear conversation about whether we're the right fit for your next project.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/contact" className="inline-flex items-center justify-center bg-accent text-void px-10 py-4 font-semibold text-sm tracking-tight rounded-full hover:shadow-glow hover:scale-[1.02] transition-all duration-300">
            Request a quote
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center border border-pearl/40 text-pearl px-10 py-4 font-semibold text-sm tracking-tight rounded-full hover:border-accent hover:text-accent transition-colors duration-300">
            Book a call
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
