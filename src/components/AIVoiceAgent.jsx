import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const AIVoiceAgent = () => {
  const { ref } = useScrollAnimation()
  const [isExpanded, setIsExpanded] = useState(false)

  const benefits = [
    {
      title: '24/7 Availability',
      description: 'Provide round-the-clock customer support without additional staffing costs. Your AI front desk assistant never needs breaks, holidays, or sleep.',
      icon: '⏰',
    },
    {
      title: 'Cost Efficiency',
      description: 'Reduce operational costs by automating routine inquiries and handling multiple calls simultaneously without human intervention.',
      icon: '💰',
    },
    {
      title: 'Instant Response',
      description: 'Deliver immediate responses to customer queries, eliminating wait times and improving customer satisfaction scores.',
      icon: '⚡',
    },
    {
      title: 'Multilingual Support',
      description: 'Communicate with customers in multiple languages, breaking down language barriers and expanding your global reach.',
      icon: '🌍',
    },
    {
      title: 'Consistent Quality',
      description: 'Ensure every customer interaction maintains the same high standard of service, free from human error or mood variations.',
      icon: '✨',
    },
    {
      title: 'Scalable Operations',
      description: 'Handle thousands of concurrent calls without the need for additional infrastructure or personnel.',
      icon: '📈',
    },
    {
      title: 'Data Insights',
      description: 'Gather valuable analytics from every interaction, providing insights into customer behavior and preferences.',
      icon: '📊',
    },
    {
      title: 'Integration Ready',
      description: 'Seamlessly integrate with your existing CRM, ticketing systems, and business workflows.',
      icon: '🔗',
    },
  ]

  return (
    <section
      ref={ref}
      className="py-section px-6 lg:px-12 relative overflow-hidden bg-canvas"
    >
      <div className="pointer-events-none absolute inset-0 bg-ambient opacity-35" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            AI Front Desk Assistant
          </h2>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">
            Intelligent front desk assistant that transforms customer interactions
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-glass">
            {/* Clickable Header */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-8 md:p-12 flex items-center justify-between group hover:bg-white/[0.05] transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-accent/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🎤</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    AI Front Desk Assistant
                  </h3>
                  <p className="text-white/50 font-light">
                    {isExpanded ? 'Click to collapse' : 'Click to explore benefits'}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 md:px-12 pb-8 md:pb-12 border-t border-white/10">
                    {/* Introduction */}
                    <motion.div
                      className="pt-8 mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-lg text-white/70 leading-relaxed mb-6">
                        Our AI Front Desk Assistant leverages cutting-edge natural language processing and machine learning 
                        to deliver human-like conversations at scale. Whether handling customer support, lead qualification, 
                        appointment scheduling, or technical assistance, our solution adapts to your business needs.
                      </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit.title}
                          className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-2xl">{benefit.icon}</span>
                            <div>
                              <h4 className="text-xl font-bold text-white mb-2">
                                {benefit.title}
                              </h4>
                              <p className="text-white/50 font-light leading-relaxed">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Customization CTA */}
                    <motion.div
                      className="p-8 rounded-2xl bg-gradient-to-r from-indigo-600/90 to-canvas border border-white/10 text-white shadow-glass"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                          <h4 className="text-2xl font-bold mb-2">
                            Customized for Your Business
                          </h4>
                          <p className="text-white/90 font-light">
                            We can customize the AI Front Desk Assistant to match your brand voice, integrate with your systems, 
                            and handle your specific use cases. From industry-specific terminology to personalized workflows, 
                            we'll tailor the solution to your exact requirements.
                          </p>
                        </div>
                        <Link to="/contact">
                          <motion.button
                            className="px-8 py-4 bg-accent text-canvas font-semibold rounded-full hover:shadow-glow transition-all duration-300 whitespace-nowrap"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Customized Solution
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>

                    {/* Features List */}
                    <motion.div
                      className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-3">🤖</div>
                        <h5 className="font-semibold text-white mb-2">Natural Conversations</h5>
                        <p className="text-sm text-white/50 font-light">
                          Advanced NLP for human-like dialogue
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">🔒</div>
                        <h5 className="font-semibold text-white mb-2">Enterprise Security</h5>
                        <p className="text-sm text-white/50 font-light">
                          SOC 2 compliant with end-to-end encryption
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">🎯</div>
                        <h5 className="font-semibold text-white mb-2">Actionable Analytics</h5>
                        <p className="text-sm text-white/50 font-light">
                          Real-time insights and performance metrics
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AIVoiceAgent

