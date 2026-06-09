import React from 'react'

const ServiceCardMock = () => (
  <div className="relative max-w-lg mx-auto">
    <div className="absolute -inset-4 rounded-[2rem] bg-kem-lime/30 blur-2xl" aria-hidden />
    <div className="relative landing-card overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-br from-kem-sky via-white to-kem-lime-soft flex items-end p-8">
        <div className="w-full rounded-2xl bg-kem-forest p-6 text-white shadow-xl">
          <p className="text-kem-lime text-xs font-bold tracking-[0.2em] uppercase mb-2">KEM</p>
          <p className="font-display font-bold text-xl mb-1">Ship faster. Sleep better.</p>
          <p className="text-white/60 text-sm">Automation · Cloud · Apps</p>
        </div>
      </div>
    </div>
  </div>
)

export default ServiceCardMock
