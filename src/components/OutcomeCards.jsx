import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const OUTCOMES = [
  {
    stat: '+40%',
    label: 'Efficiency gains',
    category: 'Operations',
    title: 'Streamlined workflows',
    desc: 'Reduce manual steps and automate repetitive tasks so your team focuses on what matters.',
    to: '/solutions',
  },
  {
    stat: '+60%',
    label: 'Faster delivery',
    category: 'Development',
    title: 'Rapid deployment',
    desc: 'From architecture to production with clear processes and modern tooling.',
    to: '/solutions',
  },
  {
    stat: '-50%',
    label: 'Less complexity',
    category: 'Infrastructure',
    title: 'Simplified systems',
    desc: 'Turn legacy sprawl into coherent, maintainable infrastructure.',
    to: '/infrastructure',
  },
]

const OutcomeCards = () => {
  const { ref } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 lg:px-12 bg-stark-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-blue tracking-tight max-w-2xl">
            How we help
            <br />
            <span className="text-slate-silver font-light">others succeed</span>
          </h2>
          <Link
            to="/solutions"
            className="text-midnight-blue font-semibold text-sm tracking-tight hover:text-accent-teal transition-colors shrink-0"
          >
            See all solutions →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OUTCOMES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={item.to}
                className="group block p-8 md:p-10 rounded-2xl border border-slate-silver/20 bg-warm-white/30 hover:border-slate-silver/40 hover:bg-warm-white/60 transition-all duration-300 h-full"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent-teal mb-1">
                  {item.stat}
                </p>
                <p className="text-slate-silver text-sm font-medium mb-4">
                  {item.label}
                </p>
                <p className="text-slate-silver/80 text-xs uppercase tracking-wider mb-2">
                  {item.category}
                </p>
                <h3 className="text-xl font-bold text-midnight-blue tracking-tight mb-3 group-hover:text-accent-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-silver text-base leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OutcomeCards
