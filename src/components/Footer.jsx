import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/infrastructure', label: 'Infrastructure' },
  { to: '/contact', label: 'Contact' },
]

const Footer = () => {
  return (
    <footer className="bg-midnight-blue text-stark-white py-16 md:py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <p className="text-2xl font-bold tracking-tight mb-4">KEM</p>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Intelligence, uncomplicated. We deliver automation, infrastructure, and development that streamline complexity and drive results.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">
              Menu
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/90 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">
              Contact
            </p>
            <a
              href="mailto:kem.sales.us@gmail.com"
              className="text-white/90 hover:text-white text-sm block transition-colors"
            >
              kem.sales.us@gmail.com
            </a>
            <a
              href="tel:+14694652048"
              className="text-white/90 hover:text-white text-sm block mt-2 transition-colors"
            >
              +1 (469) 465-2048
            </a>
          </div>
        </div>

        <motion.div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} KEM. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">Built for enterprise</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
