import React from 'react'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import OutcomeCards from '../components/OutcomeCards'
import MissionBlock from '../components/MissionBlock'
import SolutionsGrid from '../components/SolutionsGrid'
import StatsSection from '../components/StatsSection'
import Philosophy from '../components/Philosophy'
import HowWeWork from '../components/HowWeWork'
import TestimonialsStrip from '../components/TestimonialsStrip'
import CTASection from '../components/CTASection'

const Home = () => {
  return (
    <>
      <Hero />
      <TrustStrip />
      <OutcomeCards />
      <MissionBlock />
      <SolutionsGrid />
      <StatsSection />
      <Philosophy />
      <HowWeWork />
      <TestimonialsStrip />
      <CTASection />
    </>
  )
}

export default Home
