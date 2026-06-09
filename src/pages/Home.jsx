import React from 'react'
import LandingHero from '../components/landing/LandingHero'
import FeatureSplit from '../components/landing/FeatureSplit'
import DashboardMock from '../components/landing/DashboardMock'
import ScopeWidget from '../components/landing/ScopeWidget'
import ServiceCardMock from '../components/landing/ServiceCardMock'
import SectorsRow from '../components/landing/SectorsRow'
import BusinessTrust from '../components/landing/BusinessTrust'
import StoryCards from '../components/landing/StoryCards'
import MissionBanner from '../components/landing/MissionBanner'
import SecurityBlock from '../components/landing/SecurityBlock'
import LandingFooterCTA from '../components/landing/LandingFooterCTA'

const Home = () => {
  return (
    <div className="landing-page">
      <LandingHero />

      <FeatureSplit
        eyebrow="Operations"
        title="See what’s running—before it breaks"
        body="Dashboards, alerts, and workflows in one view. We wire observability into automation so your team spends time shipping, not firefighting."
        ctaLabel="Explore solutions"
        ctaTo="/solutions"
        secondaryLabel="Contact us"
        secondaryTo="/contact"
        visual={<DashboardMock />}
      />

      <FeatureSplit
        bg="lime"
        reverse
        eyebrow="Scoping"
        title="Honest estimates, fast"
        body="Tell us your focus area and timeline—we’ll ballpark complexity and follow up with a concrete plan. No bait-and-switch proposals."
        ctaLabel="Book a call"
        ctaTo="/contact"
        visual={<ScopeWidget />}
      />

      <FeatureSplit
        eyebrow="Delivery"
        title="Built to move with you"
        body="Whether you’re migrating cloud, automating ops, or launching a new product surface—we match stack, pace, and compliance to how you work."
        ctaLabel="Our infrastructure work"
        ctaTo="/infrastructure"
        secondaryLabel="View solutions"
        secondaryTo="/solutions"
        visual={<ServiceCardMock />}
      />

      <SectorsRow />
      <BusinessTrust />
      <StoryCards />
      <MissionBanner />
      <SecurityBlock />
      <LandingFooterCTA />
    </div>
  )
}

export default Home
