import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import Preloader from './Preloader'
import ScrollProgress from './ScrollProgress'
import Lenis from 'lenis'

const Layout = () => {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      /** Slightly snappier so scroll doesn’t feel like input lag (“buffering”) */
      lerp: 0.12,
      wheelMultiplier: 1,
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
    <div className="min-h-screen bg-canvas text-white/90">
      <Preloader />
      <ScrollProgress />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
