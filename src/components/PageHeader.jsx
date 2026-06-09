import React from 'react'
import { motion } from 'framer-motion'

const PageHeader = ({ title, subtitle, bg = 'white' }) => {
  const bgClass =
    bg === 'lime' ? 'bg-kem-lime' : bg === 'sky' ? 'bg-kem-sky' : bg === 'stone' ? 'bg-kem-stone' : 'bg-white'

  return (
    <div className={`landing-section pt-32 pb-12 md:pb-16 text-center ${bgClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="landing-display text-[clamp(2rem,5vw,3.25rem)] normal-case mb-5 text-balance">{title}</h1>
        {subtitle && (
          <p className="text-kem-forest/65 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default PageHeader
