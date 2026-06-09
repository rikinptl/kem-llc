import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import PageHeader from '../components/PageHeader'

const Contact = () => {
  return (
    <div className="landing-page">
      <PageHeader
        title="Book a call"
        subtitle="Ready to streamline your IT operations? Tell us what you're building—we'll respond within one business day."
        bg="sky"
      />

      <div className="landing-section pt-0 pb-20 md:pb-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <motion.a
                href="mailto:kem.sales.us@gmail.com"
                className="landing-card flex flex-col items-center p-8 transition-all duration-300 hover:shadow-[0_12px_48px_-12px_rgba(22,51,0,0.18)] hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-kem-forest mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-kem-forest/50 text-xs font-bold uppercase tracking-wider mb-2">Email</p>
                <p className="text-kem-forest text-lg font-semibold text-center">kem.sales.us@gmail.com</p>
              </motion.a>

              <motion.a
                href="tel:+14694652048"
                className="landing-card flex flex-col items-center p-8 transition-all duration-300 hover:shadow-[0_12px_48px_-12px_rgba(22,51,0,0.18)] hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="text-kem-forest mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-kem-forest/50 text-xs font-bold uppercase tracking-wider mb-2">Phone</p>
                <p className="text-kem-forest text-lg font-semibold text-center">+1 (469) 465-2048</p>
              </motion.a>

              <motion.div
                className="landing-card p-8 text-center bg-kem-lime/30 border-kem-forest/10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-kem-forest/70 text-base leading-relaxed">
                  We typically respond within 24 hours on business days.
                </p>
              </motion.div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
