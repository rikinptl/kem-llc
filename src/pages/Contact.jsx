import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Mail, Phone } from 'lucide-react'
import ContactForm from '../components/ContactForm'

const CONTACT_LINKS = [
  {
    href: 'mailto:kem.sales.us@gmail.com',
    label: 'Email',
    value: 'kem.sales.us@gmail.com',
    icon: Mail,
  },
  {
    href: 'tel:+14694652048',
    label: 'Phone',
    value: '+1 (469) 465-2048',
    icon: Phone,
  },
]

const NEXT_STEPS = [
  'We read every message—no auto-reply maze.',
  'You hear back within one business day.',
  'First call is discovery, not a hard sell.',
]

const ContactLink = ({ href, label, value, icon: Icon, delay }) => (
  <motion.a
    href={href}
    className="group flex items-center gap-3 rounded-2xl border border-kem-forest/10 bg-white px-4 py-3.5 hover:border-kem-forest/20 hover:bg-kem-lime/15 transition-all"
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-kem-lime/45 text-kem-forest">
      <Icon className="h-4 w-4" strokeWidth={2.25} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-kem-forest/45">{label}</span>
      <span className="block text-sm font-semibold text-kem-forest truncate">{value}</span>
    </span>
    <ArrowUpRight className="h-4 w-4 shrink-0 text-kem-forest/30 group-hover:text-kem-forest group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
  </motion.a>
)

const Contact = () => (
  <div className="landing-page">
    {/* Compact hero — not a full blank band */}
    <section className="pt-28 md:pt-32 pb-8 md:pb-10 px-6 lg:px-12 bg-kem-sky border-b border-kem-forest/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-kem-forest/45 mb-3">Contact</p>
          <h1 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.75rem)] text-kem-forest tracking-tight mb-3">
            Let&apos;s talk about your stack
          </h1>
          <p className="text-kem-forest/65 text-base md:text-lg leading-relaxed">
            Book a call, send a note, or ring us—whatever&apos;s fastest. We respond within one business day.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="px-6 lg:px-12 py-10 md:py-14 bg-kem-stone/50">
      <div className="max-w-6xl mx-auto">
        {/* Mobile: contact links in a tight 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 lg:hidden">
          {CONTACT_LINKS.map((link, i) => (
            <ContactLink key={link.label} {...link} delay={0.05 + i * 0.05} />
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Sidebar — sticky on desktop */}
          <motion.aside
            className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="hidden lg:flex flex-col gap-3">
              {CONTACT_LINKS.map((link, i) => (
                <ContactLink key={link.label} {...link} delay={0.1 + i * 0.05} />
              ))}
            </div>

            <div className="rounded-2xl bg-kem-forest text-white p-5 md:p-6">
              <div className="flex items-center gap-2 text-kem-lime mb-3">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">What happens next</span>
              </div>
              <ul className="space-y-2.5">
                {NEXT_STEPS.map((step) => (
                  <li key={step} className="flex gap-2 text-sm text-white/75 leading-snug">
                    <span className="text-kem-lime shrink-0">→</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-kem-forest/55 leading-relaxed hidden lg:block">
              Prefer email?{' '}
              <a href="mailto:kem.sales.us@gmail.com" className="font-semibold text-kem-forest underline-offset-2 hover:underline">
                kem.sales.us@gmail.com
              </a>
            </p>
          </motion.aside>

          {/* Form — primary focus, wider column */}
          <div className="lg:col-span-8">
            <ContactForm showHeader />
          </div>
        </div>
      </div>
    </section>

    {/* Slim lime CTA strip */}
    <section className="px-6 lg:px-12 py-10 bg-kem-lime border-t border-kem-forest/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-display font-bold text-kem-forest text-lg">Exploring solutions first?</p>
        <Link to="/solutions" className="landing-pill-secondary !py-2.5 !px-6 !text-sm">
          Browse services
        </Link>
      </div>
    </section>
  </div>
)

export default Contact
