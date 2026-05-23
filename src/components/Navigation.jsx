import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const NAV_LINKS = [
  { to: '/solutions', label: 'Solutions' },
  { to: '/infrastructure', label: 'Infrastructure' },
  { to: '/contact', label: 'Contact' },
]

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 60)
  })

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const onHero = !isScrolled
  const navBg = onHero ? 'rgba(3, 3, 3, 0.45)' : 'rgba(3, 3, 3, 0.82)'
  const navBorder = 'rgba(255,255,255,0.08)'
  const textColor = 'text-white'
  const linkHover = 'hover:text-accent'

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor: navBg,
        backdropFilter: 'blur(20px) saturate(180%)',
        borderColor: navBorder,
        boxShadow: isScrolled ? '0 8px 32px -8px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center">
            <motion.span
              className="font-display font-extrabold text-xl tracking-tight text-white"
              whileHover={{ scale: 1.02 }}
            >
              KEM
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                isActive={location.pathname === link.to}
                className={`${textColor} ${linkHover}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <motion.button
            className="md:hidden p-2 text-white"
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
          className="md:hidden overflow-hidden border-t border-white/10"
        >
          <div className="py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium text-sm tracking-tight transition-colors ${textColor} ${linkHover}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

const NavLink = ({ to, children, isActive, className }) => (
  <Link to={to} className={`navlink relative font-medium text-sm tracking-tight transition-colors block ${className}`}>
    <motion.span
      className="inline-block"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.span>
    <motion.span
      className="navlink-shape absolute bottom-0 left-0 h-0.5 bg-accent rounded-full"
      initial={{ width: isActive ? '100%' : '0%' }}
      whileHover={{ width: '100%' }}
      transition={{ duration: 0.3 }}
    />
  </Link>
)

export default Navigation
