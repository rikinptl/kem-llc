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
    <footer className="bg-void text-white py-20 md:py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-16">
          <div className="md:col-span-2">
            <p className="font-display font-extrabold text-2xl tracking-tight mb-5 text-white">KEM</p>
            <p className="text-pearl/80 text-sm leading-relaxed max-w-md">
              Intelligence, uncomplicated. We deliver automation, infrastructure, and development that streamline complexity and drive results.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pearl/60 mb-5">Menu</p>
            <ul className="space-y-4">
              {FOOTER_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="foot-btn-hor relative inline-flex items-center gap-3 overflow-hidden text-pearl/90 hover:text-accent text-sm font-medium transition-colors py-1">
                    <span className="footer-arrow-hover-hor">→</span>
                    <span className="arrow-hor inline-block">→</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pearl/60 mb-5">Contact</p>
            <a href="mailto:kem.sales.us@gmail.com" className="foot-btn-hor relative inline-flex items-center gap-3 overflow-hidden text-pearl/90 hover:text-accent text-sm font-medium transition-colors py-1 block mb-3">
              <span className="footer-arrow-hover-hor">→</span>
              <span className="arrow-hor inline-block">→</span>
              kem.sales.us@gmail.com
            </a>
            <a href="tel:+14694652048" className="foot-btn-hor relative inline-flex items-center gap-3 overflow-hidden text-pearl/90 hover:text-accent text-sm font-medium transition-colors py-1 block">
              <span className="footer-arrow-hover-hor">→</span>
              <span className="arrow-hor inline-block">→</span>
              +1 (469) 465-2048
            </a>
          </div>
        </div>

        <motion.div
          className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-pearl/60 text-sm">© {new Date().getFullYear()} KEM. All rights reserved.</p>
          <p className="text-pearl/60 text-sm">Built for enterprise</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
