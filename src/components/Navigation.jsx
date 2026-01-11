import React, { useState, useEffect, useRef } from 'react'
import { removeLogoBackground } from '../utils/removeLogoBackground'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoSrc, setLogoSrc] = useState('/images/logo.jpg')
  const logoProcessed = useRef(false)

  useEffect(() => {
    if (!logoProcessed.current) {
      removeLogoBackground('/images/logo.jpg', (processedSrc) => {
        setLogoSrc(processedSrc)
        logoProcessed.current = true
      })
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stark-white/95 backdrop-blur-sm border-b border-slate-silver/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoSrc} 
              alt="KEM Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            <a 
              href="#solutions" 
              className="text-midnight-blue font-medium text-sm tracking-tight hover:text-slate-silver transition-colors duration-300"
            >
              Solutions
            </a>
            <a 
              href="#infrastructure" 
              className="text-midnight-blue font-medium text-sm tracking-tight hover:text-slate-silver transition-colors duration-300"
            >
              Infrastructure
            </a>
            <a 
              href="#contact" 
              className="text-midnight-blue font-medium text-sm tracking-tight hover:text-slate-silver transition-colors duration-300"
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-midnight-blue"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-silver/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#solutions" 
                className="text-midnight-blue font-medium text-sm tracking-tight hover:text-slate-silver transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a 
                href="#infrastructure" 
                className="text-midnight-blue font-medium text-sm tracking-tight hover:text-slate-silver transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Infrastructure
              </a>
              <a 
                href="#contact" 
                className="text-midnight-blue font-medium text-sm tracking-tight hover:text-slate-silver transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

