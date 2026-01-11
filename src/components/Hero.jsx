import React from 'react'

const Hero = () => {
  return (
    <section className="pt-32 pb-section px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-midnight-blue tracking-tight leading-none mb-8">
            Intelligence,<br />Uncomplicated
          </h1>
          <p className="text-xl md:text-2xl text-slate-silver font-light leading-relaxed mb-12 max-w-2xl">
            Architectural precision in IT automation. We streamline complexity into performance.
          </p>
          <button className="bg-midnight-blue text-stark-white px-10 py-4 font-semibold text-sm tracking-tight hover:bg-slate-silver transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero

