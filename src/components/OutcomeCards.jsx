import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LineReveal from './LineReveal'

const OUTCOMES = [
  { stat: '+40%', label: 'Efficiency unlocked', category: 'Operations', title: 'Workflows that breathe', desc: 'Automate repeatables so your people spend time on judgment calls—not copy-paste.', to: '/solutions' },
  { stat: '+60%', label: 'Speed to prod', category: 'Development', title: 'Ship with a spine', desc: 'Architecture, CI, and handoffs your team can own—no mystery deploys.', to: '/solutions' },
  { stat: '-50%', label: 'Noise removed', category: 'Infrastructure', title: 'Estate you can read', desc: 'Untangle sprawl into systems that are observable, documented, safe to change.', to: '/infrastructure' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

const OutcomeCards = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-canvas overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.04] to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] jetstream-soft-grid" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <LineReveal
            lines={['Outcomes you can', 'measure—not myth']}
            as="h2"
            className="text-display-md font-display font-bold text-white tracking-tight max-w-2xl"
            lineClassName={['text-white', 'text-white/45 font-light']}
            stagger={0.08}
          />
          <Link
            to="/solutions"
            className="arrow-rotate inline-flex items-center gap-2 text-white/80 font-semibold text-sm tracking-tight hover:text-accent transition-colors shrink-0"
          >
            Explore solutions
            <span className="icon-arrow">→</span>
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {OUTCOMES.map((card) => (
            <motion.article key={card.title} variants={item}>
              <Link
                to={card.to}
                className="group block p-8 md:p-10 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm shadow-glass h-full transition-all duration-400 hover:border-accent/35 hover:bg-white/[0.06] hover:shadow-glow hover:-translate-y-1"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1">{card.stat}</p>
                <p className="text-white/50 text-sm font-medium mb-4">{card.label}</p>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{card.category}</p>
                <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-accent transition-colors">{card.title}</h3>
                <p className="text-white/55 text-base leading-relaxed">{card.desc}</p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OutcomeCards
