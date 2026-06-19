import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Server, ShieldCheck } from 'lucide-react'
import DisplayHeadline from '../premium/DisplayHeadline'
import RevealFade from '../premium/RevealFade'
import { fadeTransition } from '../../lib/motion'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Security-first delivery',
    body: 'Least-privilege access, encrypted secrets, and review gates baked into every engagement.',
  },
  {
    icon: Server,
    title: 'Observable by design',
    body: 'Logging, metrics, and runbooks so you know what broke—and why—before users do.',
  },
  {
    icon: Lock,
    title: 'Compliance-aware',
    body: 'We work within HIPAA, SOC2, and enterprise procurement constraints—not around them.',
  },
]

const SecurityBlock = () => (
  <section className="landing-section bg-kem-stone">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-14 md:mb-16">
        <DisplayHeadline lines="Disappoint downtime" className="text-[clamp(1.75rem,4vw,2.5rem)] mb-4" />
        <RevealFade className="text-slate-600 text-lg leading-relaxed" delay={0.08}>
          Resilience isn&apos;t a feature—it&apos;s how we architect every stack we touch.
        </RevealFade>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            className="landing-card p-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={fadeTransition(i * 0.07, 0.8)}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kem-accent/10 mb-5">
              <Icon className="w-6 h-6 text-slate-900" />
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default SecurityBlock
