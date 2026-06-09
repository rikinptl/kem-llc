import React from 'react'
import PageHeader from '../components/PageHeader'
import SolutionsCatalog from '../components/SolutionsCatalog'
import TechStack from '../components/TechStack'

const Solutions = () => (
  <div className="landing-page">
    <PageHeader
      title="Solutions"
      subtitle="Everything a full-service IT partner should deliver—managed support, cloud, security, dev, data, collaboration, AI, and digital growth."
      bg="lime"
    />
    <SolutionsCatalog />
    <TechStack />
  </div>
)

export default Solutions
