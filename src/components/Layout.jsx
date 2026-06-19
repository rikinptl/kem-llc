import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import Preloader from './Preloader'
import ScrollProgress from './ScrollProgress'
import PremiumCursor from './premium/PremiumCursor'
import FilmGrain from './premium/FilmGrain'
import Lenis from 'lenis'

const Layout = () => {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
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
    <div className="min-h-screen bg-white text-slate-900 landing-page premium-shell">
      <FilmGrain />
      <PremiumCursor />
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
