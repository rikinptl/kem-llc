import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LineReveal from './LineReveal'

const SOLUTIONS = [
  { title: 'Automation', sub: ['AI & workflows', 'Process automation', 'Integrations', 'Scripting'], description: 'Exceptional operations deserve repeatable systems. We design automation that cuts manual work, reduces errors, and scales with your business.', link: '/solutions', linkLabel: 'Automation services' },
  { title: 'Infrastructure', sub: ['Cloud', 'Security', 'Compliance', 'Monitoring'], description: 'We build and maintain infrastructure that is secure, observable, and easy to evolve. From cloud migration to ongoing optimization.', link: '/infrastructure', linkLabel: 'Infrastructure services' },
  { title: 'Development', sub: ['Web', 'APIs', 'Reputation tools', 'Dashboards'], description: 'We deliver applications and tools that turn visitors into users and data into decisions. Built for performance and long-term maintainability.', link: '/solutions', linkLabel: 'Development services' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }

const SolutionsGrid = () => {
  return (
    <section id="solutions" className="py-24 md:py-32 px-6 lg:px-12 bg-cloud">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <LineReveal lines={['Transforming', 'ideas into reality']} as="h2" className="text-display-md font-display font-bold text-ink tracking-tight mb-4" lineClassName={['text-ink', 'text-silver font-light']} stagger={0.08} />
          <Link to="/solutions" className="arrow-rotate inline-flex items-center gap-2 text-ink font-semibold text-sm tracking-tight hover:text-accent transition-colors">
            Our services <span className="icon-arrow">→</span>
          </Link>
        </div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {SOLUTIONS.map((sol) => (
            <motion.article key={sol.title} variants={item} className="group">
              <Link
                to={sol.link}
                className="block h-full p-8 md:p-10 rounded-3xl border border-ink/10 bg-white hover:border-accent/25 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400"
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold text-ink tracking-tight mb-2 group-hover:text-accent transition-colors">{sol.title}</h3>
                <ul className="flex flex-wrap gap-2 mb-6 text-silver text-sm">
                  {sol.sub.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="text-silver leading-relaxed mb-6">{sol.description}</p>
                <span className="text-ink font-semibold text-sm group-hover:text-accent transition-colors inline-flex items-center gap-1">
                  {sol.linkLabel} <span className="icon-arrow">→</span>
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionsGrid
