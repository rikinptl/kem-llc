import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LineReveal from './LineReveal'

const STATS = [
  { value: '50+', label: 'Projects delivered' },
  { value: '10+', label: 'Years experience' },
  { value: '95%', label: 'Client retention' },
  { value: '40%', label: 'Avg. efficiency gain' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const statItem = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

const StatsSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-canvas text-white relative overflow-hidden border-y border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 bg-ambient opacity-45" aria-hidden />
      <div className="absolute inset-0 bg-mesh-dark opacity-70" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <LineReveal lines={['Numbers that', 'drive success']} as="h2" className="text-display-md font-display font-bold max-w-xl" lineClassName={['text-white', 'text-pearl/80 font-light']} stagger={0.08} />
          <Link to="/solutions" className="arrow-rotate inline-flex items-center gap-2 text-pearl/90 font-semibold text-sm tracking-tight hover:text-accent transition-colors shrink-0">
            More about us <span className="icon-arrow">→</span>
          </Link>
        </div>

        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {STATS.map((s) => (
            <motion.div key={s.label} variants={statItem}>
              <p className="text-4xl md:text-5xl font-display font-bold tracking-tight text-accent">{s.value}</p>
              <p className="text-pearl/80 text-lg mt-2">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
