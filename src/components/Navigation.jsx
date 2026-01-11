import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { removeLogoBackground } from '../utils/removeLogoBackground'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoSrc, setLogoSrc] = useState('/images/image.png')
  const [isScrolled, setIsScrolled] = useState(false)
  const logoProcessed = useRef(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    if (!logoProcessed.current) {
      removeLogoBackground('/images/image.png', (processedSrc) => {
        setLogoSrc(processedSrc)
        logoProcessed.current = true
      })
    }
  }, [])

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor: isScrolled ? 'rgba(250, 251, 252, 0.98)' : 'rgba(250, 251, 252, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderColor: isScrolled ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.08)',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 31, 63, 0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <img
              src={logoSrc}
              alt="KEM Logo"
              className="h-16 md:h-20 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            {[
              { href: '#solutions', label: 'Solutions' },
              { href: '#infrastructure', label: 'Infrastructure' },
              { href: '#contact', label: 'Contact' },
            ].map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
              </MagneticLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-midnight-blue"
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

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-slate-silver/20"
        >
          <div className="py-6 flex flex-col space-y-4">
            {[
              { href: '#solutions', label: 'Solutions' },
              { href: '#infrastructure', label: 'Infrastructure' },
              { href: '#contact', label: 'Contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-midnight-blue font-medium text-sm tracking-tight hover:text-slate-silver transition-colors duration-300"
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

// Magnetic Link Component
const MagneticLink = ({ href, onClick, children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const linkRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!linkRef.current) return
    const rect = linkRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x: x * 0.2, y: y * 0.2 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.a
      ref={linkRef}
      href={href}
      onClick={onClick}
      className="text-midnight-blue font-medium text-sm tracking-tight relative group transition-colors duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-teal via-accent-cyan to-accent-blue"
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  )
}

export default Navigation
