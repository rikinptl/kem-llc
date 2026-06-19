import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ExpandableServiceSection from './ExpandableServiceSection'
import ServiceIcon from './ServiceIcon'
import { SOLUTION_CATEGORIES, SOLUTION_PILLARS } from '../data/solutionsCatalog'
import { sectionBgAt } from '../lib/sectionBg'
import { DARK_SECTION } from '../lib/theme'

const SolutionsOverview = () => (
  <section className="landing-section pt-0 pb-12 md:pb-16 bg-white">
    <div className="max-w-7xl mx-auto">
      <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-[0.18em] mb-8">
        What teams rely on us for
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
        {SOLUTION_PILLARS.map((pillar, i) => (
          <motion.a
            key={pillar.id}
            href={`#${pillar.id}`}
            className="landing-card p-4 md:p-5 flex items-center gap-3.5 hover:border-slate-300 hover:bg-kem-accent/5 transition-colors group"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <ServiceIcon
              id={pillar.id}
              className="w-5 h-5 md:w-[1.35rem] md:h-[1.35rem] text-slate-900 shrink-0"
              strokeWidth={1.65}
            />
            <span className="text-sm md:text-base font-display font-bold text-slate-900 leading-tight group-hover:text-slate-900">
              {pillar.title}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
)

const SolutionsCatalog = () => (
  <>
    <SolutionsOverview />
    {SOLUTION_CATEGORIES.map((category, index) => (
      <div key={category.id} id={category.id} className="scroll-mt-24">
        <ExpandableServiceSection {...category} bg={sectionBgAt(index)} />
      </div>
    ))}
    <section className={`landing-section text-center ${DARK_SECTION}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl mb-4 text-kem-accent-light">
          Not sure where to start?
        </h2>
        <p className="text-white/70 mb-8 leading-relaxed">
          Most clients begin with a managed IT or cloud assessment—we&apos;ll map priorities and
          phase the rest.
        </p>
        <Link to="/contact" className="landing-pill-primary">
          Book a discovery call
        </Link>
      </div>
    </section>
  </>
)

export default SolutionsCatalog
