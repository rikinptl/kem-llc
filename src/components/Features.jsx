import React from 'react'

const Features = () => {
  const capabilities = [
    'Infrastructure as Code',
    'CI/CD Pipeline Automation',
    'Cloud Orchestration',
    'Monitoring & Observability',
    'Security Automation',
    'DevOps Transformation',
  ]

  return (
    <section id="solutions" className="py-section bg-midnight-blue px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-stark-white tracking-tight mb-12">
            Technical Automation<br />Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="border-l-2 border-slate-silver/40 pl-6 py-4"
              >
                <p className="text-slate-silver text-lg font-light">
                  {capability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

