import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DisplayHeadline from '../premium/DisplayHeadline'
import RevealFade from '../premium/RevealFade'
import { fadeTransition } from '../../lib/motion'

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
    bg === 'sky' ? 'bg-kem-sky' : bg === 'stone' ? 'bg-kem-stone' : bg === 'sky-deep' ? 'bg-kem-sky-deep' : 'bg-white'

  return (
    <section className={`landing-section ${bgClass}`}>
      <div
        className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div>
          {eyebrow && (
            <RevealFade as={motion.p} className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-4" y={10}>
              {eyebrow}
            </RevealFade>
          )}
          <DisplayHeadline
            lines={title.includes('\n') ? title.split('\n') : title}
            className="text-[clamp(1.75rem,4vw,2.75rem)] mb-6"
          />
          <RevealFade className="text-slate-600 text-lg leading-relaxed mb-8 max-w-lg" delay={0.08}>
            {body}
          </RevealFade>
          <RevealFade className="flex flex-wrap gap-4" delay={0.14} y={10}>
            {ctaLabel && ctaTo && (
              <Link to={ctaTo} className="landing-pill-primary" data-cursor="interactive">
                {ctaLabel}
              </Link>
            )}
            {secondaryLabel && secondaryTo && (
              <Link to={secondaryTo} className="landing-pill-secondary" data-cursor="interactive">
                {secondaryLabel}
              </Link>
            )}
          </RevealFade>
        </div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? 16 : -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={fadeTransition(0.1, 0.85)}
          className="premium-hover-lift will-change-transform"
        >
          {visual}
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSplit
