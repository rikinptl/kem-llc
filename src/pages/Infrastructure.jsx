import React from 'react'
import PageHeader from '../components/PageHeader'
import InfrastructureCatalog from '../components/InfrastructureCatalog'

const InfrastructurePage = () => (
  <div className="landing-page">
    <PageHeader
      title="Infrastructure"
      subtitle="Cloud, network, compute, containers, observability, backup, and security—designed, migrated, and operated as one coherent stack."
      bg="sky"
    />
    <InfrastructureCatalog />
  </div>
)

export default InfrastructurePage
