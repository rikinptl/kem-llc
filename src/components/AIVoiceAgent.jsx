import React from 'react'
import ExpandableServiceSection from '../components/ExpandableServiceSection'

const benefits = [
  { title: '24/7 Availability', description: 'Round-the-clock support without extra staffing—your AI front desk never clocks out.', icon: '⏰' },
  { title: 'Cost Efficiency', description: 'Automate routine inquiries and handle concurrent calls without adding headcount.', icon: '💰' },
  { title: 'Instant Response', description: 'Eliminate hold times and improve satisfaction with immediate answers.', icon: '⚡' },
  { title: 'Multilingual Support', description: 'Serve customers in multiple languages and expand global reach.', icon: '🌍' },
  { title: 'Consistent Quality', description: 'Every interaction hits the same standard—no mood swings or missed scripts.', icon: '✨' },
  { title: 'Scalable Operations', description: 'Handle thousands of concurrent calls without new infrastructure.', icon: '📈' },
  { title: 'Data Insights', description: 'Analytics from every interaction—behavior, intent, and conversion signals.', icon: '📊' },
  { title: 'Integration Ready', description: 'Plugs into CRM, ticketing, and the workflows you already run.', icon: '🔗' },
]

const AIVoiceAgent = () => (
  <ExpandableServiceSection
    icon="🎤"
    title="AI Front Desk Assistant"
    intro="Our AI front desk uses modern NLP and ML to deliver human-like conversations at scale—support, lead qualification, scheduling, and technical triage tailored to your business."
    benefits={benefits}
    ctaTitle="Customized for your business"
    ctaBody="We match brand voice, integrations, and workflows to your exact use cases—from industry terminology to escalation paths."
    ctaLabel="Book a call"
    features={[
      { icon: '🤖', title: 'Natural conversations', description: 'Advanced NLP for human-like dialogue' },
      { icon: '🔒', title: 'Enterprise security', description: 'Encrypted channels and access controls' },
      { icon: '🎯', title: 'Actionable analytics', description: 'Real-time performance metrics' },
    ]}
    bg="white"
  />
)

export default AIVoiceAgent
