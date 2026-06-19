import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import ServiceIcon from './ServiceIcon'
import { DARK_PANEL } from '../lib/theme'

const ExpandableServiceSection = ({
  id,
  title,
  subtitle,
  intro,
  benefits,
  ctaTitle,
  ctaBody,
  ctaLabel = 'Get started',
  features,
  bg = 'white',
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const bgClass =
    bg === 'sky' ? 'bg-kem-sky' : bg === 'stone' ? 'bg-kem-stone' : bg === 'sky-deep' ? 'bg-kem-sky-deep' : 'bg-white'

  return (
    <section className={`landing-section ${bgClass}`}>
      <div className="max-w-4xl mx-auto">
        <div className="landing-card overflow-hidden">
          <motion.button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-8 md:p-10 flex items-center justify-between gap-4 group hover:bg-kem-stone/40 transition-colors text-left"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center gap-4 md:gap-5 min-w-0">
              <ServiceIcon
                id={id}
                className="w-7 h-7 md:w-8 md:h-8 text-slate-900 shrink-0 group-hover:text-slate-700 transition-colors"
                strokeWidth={1.65}
              />
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 mb-1">{title}</h3>
                <p className="text-slate-500 text-sm md:text-base">
                  {subtitle || (isExpanded ? 'Click to collapse' : 'Click to explore benefits')}
                </p>
              </div>
            </div>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-slate-900 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="px-8 md:px-10 pb-8 md:pb-10 border-t border-slate-200">
                  <p className="pt-8 text-slate-600 leading-relaxed mb-10">{intro}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="p-5 rounded-2xl border border-slate-200 bg-kem-stone/50 hover:bg-kem-sky/40 transition-colors border-l-[3px] border-l-kem-accent"
                      >
                        <h4 className="font-display font-bold text-slate-900 mb-1.5">{benefit.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className={`p-6 md:p-8 rounded-2xl ${DARK_PANEL}`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div>
                        <h4 className="text-xl font-display font-bold mb-2 text-kem-accent-light">{ctaTitle}</h4>
                        <p className="text-white/75 text-sm leading-relaxed">{ctaBody}</p>
                      </div>
                      <Link to="/contact" className="landing-pill-primary whitespace-nowrap shrink-0">
                        {ctaLabel}
                      </Link>
                    </div>
                  </div>

                  {features?.length > 0 && (
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {features.map((f) => (
                        <div key={f.title} className="text-center">
                          <Check
                            className="w-5 h-5 text-slate-900 mx-auto mb-2"
                            strokeWidth={2.25}
                            aria-hidden
                          />
                          <h5 className="font-semibold text-slate-900 mb-1">{f.title}</h5>
                          <p className="text-sm text-slate-500">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default ExpandableServiceSection
