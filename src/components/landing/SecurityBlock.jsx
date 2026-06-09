import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Server, ShieldCheck } from 'lucide-react'

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
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="landing-display text-[clamp(1.75rem,4vw,2.5rem)] normal-case mb-4">
            Disappoint downtime
          </h2>
          <p className="text-kem-forest/70 text-lg max-w-md">
            Resilience isn&apos;t a feature—it&apos;s how we architect every stack we touch.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          aria-hidden
        >
          <div className="relative w-40 h-48">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-20 rounded-b-2xl bg-kem-sky-deep border-4 border-kem-forest/20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-28 rounded-full border-[10px] border-kem-forest bg-kem-sky flex items-center justify-center">
              <Lock className="w-8 h-8 text-kem-forest" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            className="landing-card p-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kem-lime/50 mb-5">
              <Icon className="w-6 h-6 text-kem-forest" />
            </span>
            <h3 className="font-display font-bold text-lg text-kem-forest mb-3">{title}</h3>
            <p className="text-kem-forest/65 text-sm leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default SecurityBlock
