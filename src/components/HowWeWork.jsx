import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const STEPS = [
  {
    num: '01',
    title: 'Discovery & understanding',
    desc: 'We dive deep into your operations, goals, and constraints. Through collaboration we define a clear vision for your automation and infrastructure.',
    duration: '1–2 days',
  },
  {
    num: '02',
    title: 'Strategy & planning',
    desc: 'We analyze your stack, risks, and opportunities to create a practical roadmap. Every step aligns with your objectives and timeline.',
    duration: '2–3 days',
  },
  {
    num: '03',
    title: 'Design & development',
    desc: 'We build the solution—automation, integrations, or applications—with clean architecture and documentation so it’s maintainable long-term.',
    duration: '1–4 weeks',
  },
  {
    num: '04',
    title: 'Launch & optimization',
    desc: 'We deploy, monitor, and refine. Post-launch we help you iterate so performance and value keep improving.',
    duration: 'Ongoing',
  },
]

const HowWeWork = () => {
  const { ref } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 lg:px-12 bg-stark-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-blue tracking-tight max-w-2xl">
            How we bring
            <br />
            <span className="text-slate-silver font-light">ideas to life</span>
          </h2>
          <Link
            to="/contact"
            className="text-midnight-blue font-semibold text-sm tracking-tight hover:text-accent-teal transition-colors shrink-0"
          >
            How we work →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, index) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <p className="text-slate-silver/60 text-2xl font-bold mb-4">
                {step.num}
              </p>
              <h3 className="text-xl font-bold text-midnight-blue tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-slate-silver leading-relaxed text-sm mb-4">
                {step.desc}
              </p>
              <p className="text-slate-silver/80 text-xs font-medium">
                {step.duration}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
