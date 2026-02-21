import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const STATS = [
  { value: '50+', label: 'Projects delivered' },
  { value: '10+', label: 'Years experience' },
  { value: '95%', label: 'Client retention' },
  { value: '40%', label: 'Avg. efficiency gain' },
]

const StatsSection = () => {
  const { ref } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 lg:px-12 bg-midnight-blue text-stark-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl">
            Numbers that
            <br />
            <span className="text-white/80 font-light">drive success</span>
          </h2>
          <Link
            to="/solutions"
            className="text-white/90 font-semibold text-sm tracking-tight hover:text-white transition-colors shrink-0"
          >
            More about us →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-accent-teal">
                {stat.value}
              </p>
              <p className="text-white/80 text-lg mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
