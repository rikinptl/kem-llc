import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Footer = () => {
  const { ref } = useScrollAnimation()

  return (
    <footer
      id="contact"
      ref={ref}
      className="py-section px-6 lg:px-12 border-t border-slate-silver/20 relative overflow-hidden bg-stark-white"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Contact Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight-blue tracking-tight mb-12 text-center">
            Get in Touch
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {/* Email */}
            <ContactItem
              href="mailto:kem.sales.us@gmail.com"
              label="Email"
              value="kem.sales.us@gmail.com"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            
            {/* Phone */}
            <ContactItem
              href="tel:+14694652048"
              label="Phone"
              value="+1 (469) 465-2048"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8 border-t border-slate-silver/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.p
            className="text-slate-silver text-sm font-light"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} KEM. All rights reserved.
          </motion.p>
          <motion.p
            className="text-slate-silver text-sm font-light italic"
            whileHover={{ scale: 1.05 }}
          >
            Built for Enterprise
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

// Contact Item Component with Magnetic Effect
const ContactItem = ({ href, label, value, icon }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const itemRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.a
      ref={itemRef}
      href={href}
      className="group relative flex flex-col items-center p-8 rounded-3xl border border-slate-silver/30 bg-stark-white transition-all duration-300 hover:border-slate-silver/50 hover:shadow-lg min-w-[280px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="text-midnight-blue mb-4"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {icon}
        </motion.div>
        <p className="text-slate-silver text-sm font-light mb-2 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-midnight-blue text-lg font-semibold text-center">
          {value}
        </p>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.a>
  )
}

export default Footer
