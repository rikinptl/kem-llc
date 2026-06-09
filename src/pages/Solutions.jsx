import React from 'react'
import PageHeader from '../components/PageHeader'
import AIVoiceAgent from '../components/AIVoiceAgent'
import PortfolioWebsite from '../components/PortfolioWebsite'
import GoogleReviews from '../components/GoogleReviews'
import TechStack from '../components/TechStack'

const Solutions = () => (
  <div className="landing-page">
    <PageHeader
      title="Solutions"
      subtitle="Automation, web, and reputation tools—scoped to how your team actually works."
      bg="lime"
    />
    <AIVoiceAgent />
    <PortfolioWebsite />
    <GoogleReviews />
    <TechStack />
  </div>
)

export default Solutions
