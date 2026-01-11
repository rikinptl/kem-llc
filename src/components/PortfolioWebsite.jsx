import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const PortfolioWebsite = () => {
  const { ref } = useScrollAnimation()
  const [isExpanded, setIsExpanded] = useState(false)

  const benefits = [
    {
      title: 'Professional Design',
      description: 'Stunning, modern portfolios that showcase your work beautifully and leave a lasting impression on potential clients.',
      icon: '🎨',
    },
    {
      title: 'Fully Responsive',
      description: 'Perfect display across all devices - desktops, tablets, and mobile phones - ensuring your work looks great everywhere.',
      icon: '📱',
    },
    {
      title: 'Fast Performance',
      description: 'Optimized for speed with lightning-fast load times, keeping visitors engaged and improving search rankings.',
      icon: '⚡',
    },
    {
      title: 'SEO Optimized',
      description: 'Built with search engine optimization in mind, helping you rank higher and attract more organic traffic.',
      icon: '🔍',
    },
    {
      title: 'Easy Content Management',
      description: 'User-friendly CMS that lets you update your portfolio anytime without technical knowledge.',
      icon: '🛠️',
    },
    {
      title: 'Portfolio Showcase',
      description: 'Dedicated galleries and project pages to display your work with stunning visual presentations.',
      icon: '📸',
    },
    {
      title: 'Contact Integration',
      description: 'Seamless contact forms and integration with email systems to convert visitors into clients.',
      icon: '📧',
    },
    {
      title: 'Analytics & Insights',
      description: 'Track visitor behavior, popular projects, and engagement metrics to optimize your portfolio.',
      icon: '📊',
    },
  ]

  return (
    <section
      ref={ref}
      className="py-section px-6 lg:px-12 relative overflow-hidden bg-stark-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-3xl border border-slate-silver/30 bg-stark-white overflow-hidden shadow-lg">
            {/* Clickable Header */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-8 md:p-12 flex items-center justify-between group hover:bg-mist/30 transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean/20 to-deep-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🌐</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-midnight-blue mb-2">
                    Portfolio Website Creation
                  </h3>
                  <p className="text-slate-silver font-light">
                    {isExpanded ? 'Click to collapse' : 'Click to explore benefits'}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-midnight-blue"
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
                  <div className="px-8 md:px-12 pb-8 md:pb-12 border-t border-slate-silver/20">
                    {/* Introduction */}
                    <motion.div
                      className="pt-8 mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-lg text-charcoal leading-relaxed mb-6">
                        Transform your portfolio into a powerful online presence. We create custom, professional websites 
                        that showcase your work in the best light. From photographers and designers to developers and 
                        consultants, we build portfolios that attract clients and showcase your expertise.
                      </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit.title}
                          className="p-6 rounded-2xl border border-slate-silver/20 bg-stark-white hover:border-slate-silver/40 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-2xl">{benefit.icon}</span>
                            <div>
                              <h4 className="text-xl font-bold text-midnight-blue mb-2">
                                {benefit.title}
                              </h4>
                              <p className="text-slate-silver font-light leading-relaxed">
                                {benefit.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Customization CTA */}
                    <motion.div
                      className="p-8 rounded-2xl bg-gradient-to-r from-midnight-blue to-deep-blue text-stark-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                          <h4 className="text-2xl font-bold mb-2">
                            Customized for Your Brand
                          </h4>
                          <p className="text-white/90 font-light">
                            Every portfolio is unique. We'll customize the design to match your style, incorporate your 
                            brand colors, create layouts that highlight your best work, and ensure it reflects your 
                            professional identity. From minimalist designs to bold creative showcases, we'll build 
                            exactly what you envision.
                          </p>
                        </div>
                        <Link to="/contact">
                          <motion.button
                            className="px-8 py-4 bg-stark-white text-midnight-blue font-semibold rounded-lg hover:bg-mist transition-colors duration-300 whitespace-nowrap"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Your Portfolio
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
                        <div className="text-3xl mb-3">🎯</div>
                        <h5 className="font-semibold text-midnight-blue mb-2">Custom Design</h5>
                        <p className="text-sm text-slate-silver font-light">
                          Tailored to your unique style and brand
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">🚀</div>
                        <h5 className="font-semibold text-midnight-blue mb-2">Quick Launch</h5>
                        <p className="text-sm text-slate-silver font-light">
                          From concept to live site in weeks
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">💼</div>
                        <h5 className="font-semibold text-midnight-blue mb-2">Professional Quality</h5>
                        <p className="text-sm text-slate-silver font-light">
                          Enterprise-grade hosting and support
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

export default PortfolioWebsite

