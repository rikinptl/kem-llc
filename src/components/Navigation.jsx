import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { to: '/solutions', label: 'Solutions' },
  { to: '/infrastructure', label: 'Infrastructure' },
  { to: '/case-studies', label: 'Case studies' },
  { to: '/contact', label: 'Contact' },
]

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        boxShadow: isScrolled ? '0 4px 24px -8px rgba(15,23,42,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <motion.span
              className="font-display font-extrabold text-xl tracking-tight text-slate-900"
              whileHover={{ scale: 1.02 }}
            >
              KEM
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} isActive={location.pathname === link.to}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="landing-pill-primary !px-5 !py-2.5 !text-sm">
              Get started
            </Link>
          </div>

          <motion.button
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-slate-200"
        >
          <div className="py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium text-sm tracking-tight text-slate-700 hover:text-slate-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="landing-pill-primary w-fit" onClick={() => setIsMobileMenuOpen(false)}>
              Get started
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

const NavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className="navlink relative font-medium text-sm tracking-tight text-slate-700 hover:text-slate-900 transition-colors block"
  >
    <motion.span className="inline-block" whileHover={{ x: 2 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.span>
    <motion.span
      className="navlink-shape absolute bottom-0 left-0 h-0.5 rounded-full bg-kem-accent"
      initial={{ width: isActive ? '100%' : '0%' }}
      whileHover={{ width: '100%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    />
  </Link>
)

export default Navigation
