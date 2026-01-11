import React from 'react'

const Philosophy = () => {
  const pillars = [
    {
      title: 'Connectivity',
      description: 'Seamless integration across systems, creating unified workflows that eliminate silos and enhance collaboration.',
    },
    {
      title: 'Precision',
      description: 'Mathematical accuracy in every implementation. Our solutions are engineered with exacting standards for reliability.',
    },
    {
      title: 'Balance',
      description: 'Harmonizing innovation with stability. We deliver cutting-edge technology that maintains operational excellence.',
    },
  ]

  return (
    <section className="py-section px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="border border-slate-silver/30 p-8 md:p-12 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-midnight-blue tracking-tight mb-6">
                {pillar.title}
              </h3>
              <p className="text-slate-silver text-lg leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Philosophy

