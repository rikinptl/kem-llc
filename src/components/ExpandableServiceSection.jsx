import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ExpandableServiceSection = ({
  icon,
  title,
  subtitle,
  intro,
  benefits,
  ctaTitle,
  ctaBody,
  ctaLabel = 'Get started',
  features,
  bg = 'white',
  iconBg = 'bg-kem-lime/50',
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const bgClass =
    bg === 'lime' ? 'bg-kem-lime' : bg === 'sky' ? 'bg-kem-sky' : bg === 'stone' ? 'bg-kem-stone' : 'bg-white'

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
            <div className="flex items-center gap-5 min-w-0">
              <div
                className={`w-14 h-14 shrink-0 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}
              >
                <span className="text-2xl">{icon}</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-kem-forest mb-1">{title}</h3>
                <p className="text-kem-forest/55 text-sm md:text-base">
                  {subtitle || (isExpanded ? 'Click to collapse' : 'Click to explore benefits')}
                </p>
              </div>
            </div>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="text-kem-forest shrink-0">
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
                <div className="px-8 md:px-10 pb-8 md:pb-10 border-t border-kem-forest/10">
                  <p className="pt-8 text-kem-forest/70 leading-relaxed mb-10">{intro}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {benefits.map((benefit, index) => (
                      <div
                        key={benefit.title}
                        className="p-5 rounded-2xl border border-kem-forest/10 bg-kem-stone/50 hover:bg-kem-sky/40 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{benefit.icon}</span>
                          <div>
                            <h4 className="font-display font-bold text-kem-forest mb-1">{benefit.title}</h4>
                            <p className="text-kem-forest/60 text-sm leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 md:p-8 rounded-2xl bg-kem-forest text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div>
                        <h4 className="text-xl font-display font-bold mb-2 text-kem-lime">{ctaTitle}</h4>
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
                          <div className="text-2xl mb-2">{f.icon}</div>
                          <h5 className="font-semibold text-kem-forest mb-1">{f.title}</h5>
                          <p className="text-sm text-kem-forest/55">{f.description}</p>
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
