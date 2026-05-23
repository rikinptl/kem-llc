import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/** Hide after load, or fallback so a stuck resource can't block the site forever */
const FALLBACK_HIDE_MS = 2200

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    let mounted = true
    let hideScheduled = false

    const fadeOutShell = () => {
      if (!mounted || hideScheduled) return
      hideScheduled = true
      setIsVisible(false)
      setTimeout(() => {
        if (mounted) setIsMounted(false)
      }, 600)
    }

    const maxWait = window.setTimeout(() => {
      fadeOutShell()
    }, FALLBACK_HIDE_MS)

    const onLoad = () => {
      window.clearTimeout(maxWait)
      window.requestAnimationFrame(() => {
        setTimeout(fadeOutShell, 100)
      })
    }

    if (document.readyState === 'complete') {
      window.clearTimeout(maxWait)
      window.requestAnimationFrame(() => {
        setTimeout(fadeOutShell, 200)
      })
      return () => {
        mounted = false
        window.clearTimeout(maxWait)
      }
    }

    window.addEventListener('load', onLoad, { once: true })

    return () => {
      mounted = false
      window.clearTimeout(maxWait)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        aria-busy={isVisible}
        aria-hidden={!isVisible}
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
