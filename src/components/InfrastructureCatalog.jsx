import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ExpandableServiceSection from './ExpandableServiceSection'
import ServiceIcon from './ServiceIcon'
import TechStack from './TechStack'
import {
  INFRASTRUCTURE_CATEGORIES,
  INFRASTRUCTURE_PILLARS,
  INFRA_STATS,
  INFRA_PROCESS,
} from '../data/infrastructureCatalog'
import { sectionBgAt } from '../lib/sectionBg'
import { DARK_SECTION } from '../lib/theme'

const InfrastructureOverview = () => (
  <section className="landing-section pt-0 pb-10 md:pb-14 bg-white">
    <div className="max-w-7xl mx-auto">
      <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-[0.18em] mb-8">
        What we design, build, and run
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {INFRASTRUCTURE_PILLARS.map((pillar, i) => (
          <motion.a
            key={pillar.id}
            href={`#${pillar.id}`}
            className="landing-card p-4 flex items-center gap-3.5 hover:border-slate-300 hover:bg-kem-accent/5 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <ServiceIcon id={pillar.id} className="w-5 h-5 text-slate-900 shrink-0" strokeWidth={1.65} />
            <span className="text-sm font-display font-bold text-slate-900 leading-tight">{pillar.title}</span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
)

const InfrastructureStats = () => (
  <section className={`py-12 md:py-14 px-6 lg:px-12 border-y border-white/10 ${DARK_SECTION}`}>
    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
      {INFRA_STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <p className="font-display font-extrabold text-xl md:text-2xl text-kem-accent-light mb-1">{stat.value}</p>
          <p className="text-white/60 text-sm leading-snug">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
)

const InfrastructureProcess = () => (
  <section className="landing-section bg-kem-stone">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-14">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 mb-3">
          How we deliver infrastructure work
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          From first assessment to steady-state ops—structured, documented, and built to hand off to your team when ready.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {INFRA_PROCESS.map((item, i) => (
          <motion.div
            key={item.step}
            className="landing-card p-6 md:p-7"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="inline-block text-xs font-bold text-slate-500 mb-3">{item.step}</span>
            <h3 className="font-display font-extrabold text-lg text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const InfrastructureCatalog = () => (
  <>
    <InfrastructureOverview />
    <InfrastructureStats />
    {INFRASTRUCTURE_CATEGORIES.map((category, index) => (
      <div key={category.id} id={category.id} className="scroll-mt-24">
        <ExpandableServiceSection {...category} bg={sectionBgAt(index)} />
      </div>
    ))}
    <InfrastructureProcess />
    <TechStack />
    <section className="landing-section bg-kem-sky-deep text-center border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 mb-4">
          Ready for an infrastructure review?
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We&apos;ll walk your current stack, flag risks, and outline a phased plan—no obligation to rip everything out
          on day one.
        </p>
        <Link to="/contact" className="landing-pill-primary">
          Book infrastructure review
        </Link>
      </div>
    </section>
  </>
)

export default InfrastructureCatalog
