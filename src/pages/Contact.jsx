import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <div className="pt-32 pb-section px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-midnight-blue tracking-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-silver font-light max-w-2xl mx-auto">
            Ready to streamline your IT operations? Let's discuss how KEM can transform your infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Email Card */}
            <motion.a
              href="mailto:kem.sales.us@gmail.com"
              className="group relative flex flex-col items-center p-8 rounded-3xl border border-slate-silver/30 bg-stark-white transition-all duration-300 hover:border-slate-silver/50 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-midnight-blue mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-silver text-sm font-light mb-2 uppercase tracking-wider">
                Email
              </p>
              <p className="text-midnight-blue text-lg font-semibold text-center">
                kem.sales.us@gmail.com
              </p>
            </motion.a>

            {/* Phone Card */}
            <motion.a
              href="tel:+14694652048"
              className="group relative flex flex-col items-center p-8 rounded-3xl border border-slate-silver/30 bg-stark-white transition-all duration-300 hover:border-slate-silver/50 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-midnight-blue mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-slate-silver text-sm font-light mb-2 uppercase tracking-wider">
                Phone
              </p>
              <p className="text-midnight-blue text-lg font-semibold text-center">
                +1 (469) 465-2048
              </p>
            </motion.a>

            {/* Additional Info */}
            <motion.div
              className="text-center p-8 rounded-3xl border border-slate-silver/20 bg-mist/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-slate-silver text-lg font-light">
                We typically respond within 24 hours during business days.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

