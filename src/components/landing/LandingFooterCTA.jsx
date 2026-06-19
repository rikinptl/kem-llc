import React from 'react'
import { Link } from 'react-router-dom'
import { Bot, Cloud, Code2, Headphones } from 'lucide-react'
import DisplayHeadline from '../premium/DisplayHeadline'
import RevealFade from '../premium/RevealFade'

const PILLARS = [
  { icon: Bot, label: 'Automate' },
  { icon: Cloud, label: 'Infrastructure' },
  { icon: Code2, label: 'Build' },
  { icon: Headphones, label: 'Support' },
]

const LandingFooterCTA = () => (
  <section className="landing-section bg-white border-t border-slate-200">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
        {PILLARS.map(({ icon: Icon, label }, i) => (
          <RevealFade key={label} className="flex flex-col items-center gap-2" delay={i * 0.05} y={8}>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kem-accent/10 premium-hover-lift">
              <Icon className="w-6 h-6 text-slate-900" />
            </span>
            <span className="text-sm font-bold text-slate-600">{label}</span>
          </RevealFade>
        ))}
      </div>
      <DisplayHeadline lines="Ready when you are" className="text-[clamp(1.5rem,3.5vw,2.25rem)] mb-8" />
      <RevealFade delay={0.1} y={10}>
        <Link to="/contact" className="landing-pill-primary" data-cursor="interactive">
          Get started
        </Link>
      </RevealFade>
    </div>
  </section>
)

export default LandingFooterCTA
