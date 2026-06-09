import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FeatureSplit = ({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaTo,
  secondaryLabel,
  secondaryTo,
  bg = 'white',
  reverse = false,
  visual,
}) => {
  const bgClass =
    bg === 'lime' ? 'bg-kem-lime' : bg === 'sky' ? 'bg-kem-sky' : bg === 'stone' ? 'bg-kem-stone' : 'bg-white'

  return (
    <section className={`landing-section ${bgClass}`}>
      <div
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-kem-forest/55 mb-4">{eyebrow}</p>
          )}
          <h2 className="landing-display text-[clamp(1.75rem,4vw,2.75rem)] normal-case mb-6">{title}</h2>
          <p className="text-kem-forest/70 text-lg leading-relaxed mb-8 max-w-lg">{body}</p>
          <div className="flex flex-wrap gap-4">
            {ctaLabel && ctaTo && (
              <Link to={ctaTo} className="landing-pill-primary">
                {ctaLabel}
              </Link>
            )}
            {secondaryLabel && secondaryTo && (
              <Link to={secondaryTo} className="landing-pill-secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSplit
