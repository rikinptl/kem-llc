import React from 'react'
import PageHeader from '../components/PageHeader'
import Infrastructure from '../components/Infrastructure'

const InfrastructurePage = () => (
  <div className="landing-page">
    <PageHeader
      title="Infrastructure"
      subtitle="Robust, scalable cloud and ops—secure by default, observable by design."
      bg="sky"
    />
    <Infrastructure />
  </div>
)

export default InfrastructurePage
