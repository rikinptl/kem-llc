import React from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Features from './components/Features'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-stark-white">
      <Navigation />
      <Hero />
      <Philosophy />
      <Features />
      <Footer />
    </div>
  )
}

export default App

