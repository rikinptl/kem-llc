import React from 'react'
import PageHeader from '../components/PageHeader'
import SolutionsCatalog from '../components/SolutionsCatalog'
import TechStack from '../components/TechStack'

const Solutions = () => (
  <div className="landing-page">
    <PageHeader
      title="Solutions"
      subtitle="Full-service IT plus AI—agents, copilots, RAG, automation, cloud, security, dev, data, collaboration, and digital growth."
      bg="sky"
    />
    <SolutionsCatalog />
    <TechStack />
  </div>
)

export default Solutions
