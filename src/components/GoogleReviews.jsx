import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const GoogleReviews = () => {
  const { ref } = useScrollAnimation()
  const [isExpanded, setIsExpanded] = useState(false)

  const benefits = [
    {
      title: 'Automated Review Requests',
      description: 'Send automated review requests to customers after service completion, increasing your review volume without manual effort.',
      icon: '📨',
    },
    {
      title: 'Review Monitoring',
      description: 'Track all your Google reviews in real-time with instant notifications when new reviews are posted.',
      icon: '👁️',
    },
    {
      title: 'Response Management',
      description: 'Manage and respond to reviews efficiently from a centralized dashboard, maintaining your online reputation.',
      icon: '💬',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics showing review trends, ratings over time, and customer sentiment analysis.',
      icon: '📈',
    },
    {
      title: 'Multi-Location Support',
      description: 'Manage reviews for multiple business locations from a single platform, perfect for franchises.',
      icon: '🏢',
    },
    {
      title: 'Review Aggregation',
      description: 'Display all your reviews beautifully on your website with customizable widgets and layouts.',
      icon: '⭐',
    },
    {
      title: 'Competitor Analysis',
      description: 'Monitor competitor reviews and benchmark your ratings against industry standards.',
      icon: '🔍',
    },
    {
      title: 'Reputation Alerts',
      description: 'Get instant alerts for negative reviews so you can respond quickly and protect your reputation.',
      icon: '🚨',
    },
  ]

  return (
    <section
      ref={ref}
      className="py-section px-6 lg:px-12 relative overflow-hidden bg-canvas"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rose-500/[0.06] via-transparent to-indigo-500/[0.05]" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10">
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/25 to-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">⭐</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Google Reviews Management System
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
                        Take control of your online reputation with our comprehensive Google Reviews Management System. 
                        Automate review collection, monitor your online presence, respond to feedback, and leverage 
                        positive reviews to grow your business. Build trust with potential customers through transparent 
                        review management.
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
                            Tailored to Your Business
                          </h4>
                          <p className="text-white/90 font-light">
                            We'll customize the review management system to match your workflow, integrate with your 
                            CRM, set up automated workflows based on your customer journey, and configure alerts that 
                            fit your response priorities. Whether you're a single location or managing multiple branches, 
                            we'll configure everything to work seamlessly for your business.
                          </p>
                        </div>
                        <Link to="/contact">
                          <motion.button
                            className="px-8 py-4 bg-accent text-canvas font-semibold rounded-full hover:shadow-glow transition-all duration-300 whitespace-nowrap"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Started
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
                        <h5 className="font-semibold text-white mb-2">Automation</h5>
                        <p className="text-sm text-white/50 font-light">
                          Set-it-and-forget-it review collection
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">📊</div>
                        <h5 className="font-semibold text-white mb-2">Real-time Insights</h5>
                        <p className="text-sm text-white/50 font-light">
                          Monitor performance and trends live
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">🔔</div>
                        <h5 className="font-semibold text-white mb-2">Smart Alerts</h5>
                        <p className="text-sm text-white/50 font-light">
                          Never miss an important review
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

export default GoogleReviews

