import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LineReveal from './LineReveal'

const SOLUTIONS = [
  {
    title: 'Automation',
    sub: ['AI & workflows', 'Process automation', 'Integrations', 'Scripting'],
    description:
      'Repeatable beats heroic. We wire workflows that cut toil, catch mistakes before they ship, and scale without adding headcount.',
    link: '/solutions',
    linkLabel: 'Explore automation',
  },
  {
    title: 'Infrastructure',
    sub: ['Cloud', 'Security', 'Compliance', 'Monitoring'],
    description:
      'Stacks you can read in a crisis—secure by default, observable by design, ready for migration and steady-state ops.',
    link: '/infrastructure',
    linkLabel: 'Infrastructure work',
  },
  {
    title: 'Development',
    sub: ['Web', 'APIs', 'Reputation tools', 'Dashboards'],
    description:
      'Interfaces and APIs that feel fast on day one and stay maintainable later—performance and clarity baked in.',
    link: '/solutions',
    linkLabel: 'Build with us',
  },
]

const tabList = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -14, transition: { duration: 0.28 } },
}

const SolutionsGrid = () => {
  const [active, setActive] = useState(0)
  const current = SOLUTIONS[active]

  return (
    <section id="solutions" className="relative py-24 md:py-32 px-6 lg:px-12 bg-surface overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-rose-500/[0.04] via-transparent to-indigo-500/[0.05]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] jetstream-soft-grid" aria-hidden />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14 md:mb-16">
          <LineReveal
            lines={['Ideas don’t stall', 'here—they ship']}
            as="h2"
            className="text-display-md font-display font-bold text-white tracking-tight mb-4"
            lineClassName={['text-white', 'text-white/45 font-light']}
            stagger={0.08}
          />
          <p className="text-white/50 max-w-xl text-base md:text-lg font-light leading-relaxed mb-8">
            Pick a pillar—we’ll tailor scope, stack, and pace to how your team works.
          </p>

          {/* Jetstream-inspired segmented control */}
          <div
            role="tablist"
            aria-label="Service areas"
            className="flex flex-wrap gap-2 p-1.5 rounded-full border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm w-fit max-w-full"
          >
            {SOLUTIONS.map((sol, i) => (
              <button
                key={sol.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                id={`sol-tab-${i}`}
                aria-controls="sol-tab-panel"
                onClick={() => setActive(i)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-tight transition-colors duration-200 ${
                  i === active ? 'text-[#030303]' : 'text-white/65 hover:text-white'
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="solution-tab-bg"
                    className="absolute inset-0 rounded-full bg-accent shadow-glow -z-10"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{sol.title}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            id="sol-tab-panel"
            role="tabpanel"
            aria-labelledby={`sol-tab-${active}`}
            variants={tabList}
            initial="hidden"
            animate="show"
            exit="exit"
            className="rounded-3xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-md shadow-glass overflow-hidden"
          >
            <div className="p-8 md:p-12 lg:flex lg:items-start lg:justify-between lg:gap-12">
              <div className="flex-1 min-w-0 mb-10 lg:mb-0">
                <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4">Focus area</p>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-6">
                  {current.title}
                </h3>
                <ul className="flex flex-wrap gap-2 mb-8">
                  {current.sub.map((s) => (
                    <li
                      key={s}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/70 bg-white/[0.06] border border-white/[0.08]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl">{current.description}</p>
              </div>
              <div className="shrink-0 flex flex-col items-start gap-4">
                <Link
                  to={current.link}
                  className="arrow-rotate group inline-flex items-center justify-center bg-accent text-void px-8 py-3.5 font-semibold text-sm tracking-tight rounded-full hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
                >
                  {current.linkLabel}
                  <span className="ml-2 icon-arrow inline-block">→</span>
                </Link>
                <Link
                  to="/contact"
                  className="text-white/55 text-sm font-semibold hover:text-accent transition-colors"
                >
                  Talk through your stack →
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SolutionsGrid
