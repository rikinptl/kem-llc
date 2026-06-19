import React from 'react'
import DisplayHeadline from './premium/DisplayHeadline'
import RevealFade from './premium/RevealFade'

const PageHeader = ({ title, subtitle, bg = 'white' }) => {
  const bgClass =
        bg === 'sky' ? 'bg-kem-sky' : bg === 'stone' ? 'bg-kem-stone' : bg === 'sky-deep' ? 'bg-kem-sky-deep' : 'bg-white'

  return (
    <div className={`landing-section pt-32 pb-12 md:pb-16 text-center ${bgClass}`}>
      <DisplayHeadline
        as="h1"
        lines={title}
        className="text-[clamp(2rem,5vw,3.25rem)] mb-5 text-balance"
      />
      {subtitle && (
        <RevealFade
          as="p"
          className="text-slate-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          delay={0.1}
        >
          {subtitle}
        </RevealFade>
      )}
    </div>
  )
}

export default PageHeader
