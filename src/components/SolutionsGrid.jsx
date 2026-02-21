import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const SOLUTIONS = [
  {
    title: 'Automation',
    sub: ['AI & workflows', 'Process automation', 'Integrations', 'Scripting'],
    description:
      'Exceptional operations deserve repeatable systems. We design automation that cuts manual work, reduces errors, and scales with your business.',
    link: '/solutions',
    linkLabel: 'Automation services',
  },
  {
    title: 'Infrastructure',
    sub: ['Cloud', 'Security', 'Compliance', 'Monitoring'],
    description:
      'We build and maintain infrastructure that is secure, observable, and easy to evolve. From cloud migration to ongoing optimization.',
    link: '/infrastructure',
    linkLabel: 'Infrastructure services',
  },
  {
    title: 'Development',
    sub: ['Web', 'APIs', 'Reputation tools', 'Dashboards'],
    description:
      'We deliver applications and tools that turn visitors into users and data into decisions. Built for performance and long-term maintainability.',
    link: '/solutions',
    linkLabel: 'Development services',
  },
]

const SolutionsGrid = () => {
  const { ref } = useScrollAnimation()

  return (
    <section
      ref={ref}
      id="solutions"
      className="py-20 md:py-28 px-6 lg:px-12 bg-warm-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-blue tracking-tight mb-4">
            Transforming
            <br />
            <span className="text-slate-silver font-light">ideas into reality</span>
          </h2>
          <Link
            to="/solutions"
            className="text-midnight-blue font-semibold text-sm tracking-tight hover:text-accent-teal transition-colors"
          >
            Our services →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {SOLUTIONS.map((sol, index) => (
            <motion.article
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={sol.link}
                className="block h-full p-8 md:p-10 rounded-2xl border border-slate-silver/20 bg-stark-white hover:border-slate-silver/40 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-midnight-blue tracking-tight mb-2">
                  {sol.title}
                </h3>
                <ul className="flex flex-wrap gap-2 mb-6 text-slate-silver text-sm">
                  {sol.sub.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="text-slate-silver leading-relaxed mb-6">
                  {sol.description}
                </p>
                <span className="text-midnight-blue font-semibold text-sm group-hover:text-accent-teal transition-colors">
                  {sol.linkLabel} →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionsGrid
