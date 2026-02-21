import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import Preloader from './Preloader'
import Lenis from 'lenis'

const Layout = () => {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.8,
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Scroll to top when route changes (Solutions, Infrastructure, Contact, etc.)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    })
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white">
      <Preloader />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
