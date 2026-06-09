import React from 'react'
import { Link } from 'react-router-dom'
import { Bot, Cloud, Code2, Headphones } from 'lucide-react'

const PILLARS = [
  { icon: Bot, label: 'Automate' },
  { icon: Cloud, label: 'Infrastructure' },
  { icon: Code2, label: 'Build' },
  { icon: Headphones, label: 'Support' },
]

const LandingFooterCTA = () => (
  <section className="landing-section bg-white border-t border-kem-forest/10">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
        {PILLARS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kem-lime/40">
              <Icon className="w-6 h-6 text-kem-forest" />
            </span>
            <span className="text-sm font-bold text-kem-forest/70">{label}</span>
          </div>
        ))}
      </div>
      <h2 className="landing-display text-[clamp(1.5rem,3.5vw,2.25rem)] normal-case mb-8">
        Ready when you are
      </h2>
      <Link to="/contact" className="landing-pill-primary">
        Get started
      </Link>
    </div>
  </section>
)

export default LandingFooterCTA
