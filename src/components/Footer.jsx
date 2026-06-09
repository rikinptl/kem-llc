import React from 'react'
import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/infrastructure', label: 'Infrastructure' },
  { to: '/case-studies', label: 'Case studies' },
  { to: '/contact', label: 'Contact' },
]

const Footer = () => (
  <footer className="bg-kem-forest text-white py-16 md:py-20 px-6 lg:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
        <div className="md:col-span-2">
          <p className="font-display font-extrabold text-2xl tracking-tight mb-4 text-kem-lime">KEM</p>
          <p className="text-white/65 text-sm leading-relaxed max-w-md">
            Intelligence, uncomplicated. Automation, infrastructure, and development for teams that ship.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/45 mb-4">Menu</p>
          <ul className="space-y-3">
            {FOOTER_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-white/75 hover:text-kem-lime text-sm font-medium transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/45 mb-4">Contact</p>
          <a
            href="mailto:kem.sales.us@gmail.com"
            className="text-white/75 hover:text-kem-lime text-sm font-medium transition-colors block mb-2"
          >
            kem.sales.us@gmail.com
          </a>
          <a
            href="tel:+14694652048"
            className="text-white/75 hover:text-kem-lime text-sm font-medium transition-colors block"
          >
            +1 (469) 465-2048
          </a>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-sm text-white/45">
        <p>© {new Date().getFullYear()} KEM. All rights reserved.</p>
        <p>Built for enterprise</p>
      </div>
    </div>
  </footer>
)

export default Footer
