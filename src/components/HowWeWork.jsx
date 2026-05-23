import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LineReveal from './LineReveal'

const STEPS = [
  { num: '01', title: 'Discovery & understanding', desc: 'We dive deep into your operations, goals, and constraints. Through collaboration we define a clear vision for your automation and infrastructure.', duration: '1–2 days' },
  { num: '02', title: 'Strategy & planning', desc: 'We analyze your stack, risks, and opportunities to create a practical roadmap. Every step aligns with your objectives and timeline.', duration: '2–3 days' },
  { num: '03', title: 'Design & development', desc: "We build the solution—automation, integrations, or applications—with clean architecture and documentation so it's maintainable long-term.", duration: '1–4 weeks' },
  { num: '04', title: 'Launch & optimization', desc: 'We deploy, monitor, and refine. Post-launch we help you iterate so performance and value keep improving.', duration: 'Ongoing' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const stepItem = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

const HowWeWork = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-surface overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-ambient opacity-35" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <LineReveal lines={['How we bring', 'ideas to life']} as="h2" className="text-display-md font-display font-bold text-white tracking-tight max-w-2xl" lineClassName={['text-white', 'text-white/45 font-light']} stagger={0.08} />
          <Link to="/contact" className="arrow-rotate inline-flex items-center gap-2 text-white/80 font-semibold text-sm tracking-tight hover:text-accent transition-colors shrink-0">
            How we work <span className="icon-arrow">→</span>
          </Link>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {STEPS.map((step) => (
            <motion.article key={step.num} variants={stepItem} className="relative">
              <p className="text-white/35 text-2xl font-bold mb-4">{step.num}</p>
              <h3 className="text-xl font-display font-bold text-white tracking-tight mb-3">{step.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm mb-4">{step.desc}</p>
              <p className="text-white/45 text-xs font-medium">{step.duration}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowWeWork
