import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    const hide = () => {
      setIsVisible(false)
      setTimeout(() => setIsMounted(false), 600)
    }
    if (document.readyState === 'complete') {
      const t = setTimeout(hide, 500)
      return () => clearTimeout(t)
    }
    window.addEventListener('load', () => setTimeout(hide, 400))
    return () => window.removeEventListener('load', hide)
  }, [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.span
          className="font-display font-extrabold text-accent tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          KEM
        </motion.span>
      </motion.div>
    </AnimatePresence>
  )
}

export default Preloader
