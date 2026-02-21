import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LineReveal from './LineReveal'

const OUTCOMES = [
  { stat: '+40%', label: 'Efficiency gains', category: 'Operations', title: 'Streamlined workflows', desc: 'Reduce manual steps and automate repetitive tasks so your team focuses on what matters.', to: '/solutions' },
  { stat: '+60%', label: 'Faster delivery', category: 'Development', title: 'Rapid deployment', desc: 'From architecture to production with clear processes and modern tooling.', to: '/solutions' },
  { stat: '-50%', label: 'Less complexity', category: 'Infrastructure', title: 'Simplified systems', desc: 'Turn legacy sprawl into coherent, maintainable infrastructure.', to: '/infrastructure' },
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
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <LineReveal
            lines={['How we help', 'others succeed']}
            as="h2"
            className="text-display-md font-display font-bold text-ink tracking-tight max-w-2xl"
            lineClassName={['text-ink', 'text-silver font-light']}
            stagger={0.08}
          />
          <Link
            to="/solutions"
            className="arrow-rotate inline-flex items-center gap-2 text-ink font-semibold text-sm tracking-tight hover:text-accent transition-colors shrink-0"
          >
            See all solutions
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
                className="group block p-8 md:p-10 rounded-3xl border border-ink/10 bg-cloud/50 h-full transition-all duration-400 hover:border-accent/30 hover:bg-white hover:shadow-card-hover hover:-translate-y-1"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1">{card.stat}</p>
                <p className="text-silver text-sm font-medium mb-4">{card.label}</p>
                <p className="text-silver/80 text-xs uppercase tracking-wider mb-2">{card.category}</p>
                <h3 className="text-xl font-bold text-ink tracking-tight mb-3 group-hover:text-accent transition-colors">{card.title}</h3>
                <p className="text-silver text-base leading-relaxed">{card.desc}</p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OutcomeCards
