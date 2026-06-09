import React from 'react'
import ExpandableServiceSection from '../components/ExpandableServiceSection'

const benefits = [
  { title: 'Automated Review Requests', description: 'Post-service prompts that grow review volume without manual follow-up.', icon: '📨' },
  { title: 'Review Monitoring', description: 'Real-time tracking with alerts when new reviews land.', icon: '👁️' },
  { title: 'Response Management', description: 'Reply from one dashboard and protect your reputation.', icon: '💬' },
  { title: 'Analytics Dashboard', description: 'Trends, ratings over time, and sentiment at a glance.', icon: '📈' },
  { title: 'Multi-Location Support', description: 'Manage franchises and branches from a single pane.', icon: '🏢' },
  { title: 'Review Aggregation', description: 'Embeddable widgets that surface social proof on your site.', icon: '⭐' },
  { title: 'Competitor Analysis', description: 'Benchmark ratings against peers in your market.', icon: '🔍' },
  { title: 'Reputation Alerts', description: 'Instant flags on negative reviews so you respond fast.', icon: '🚨' },
]

const GoogleReviews = () => (
  <ExpandableServiceSection
    icon="⭐"
    title="Google Reviews Management"
    intro="Automate collection, monitor presence, respond with confidence, and turn reviews into a growth channel—not a fire drill."
    benefits={benefits}
    ctaTitle="Tailored to your business"
    ctaBody="CRM hooks, automated workflows, and alert rules configured for single locations or multi-branch ops."
    ctaLabel="Get started"
    features={[
      { icon: '🤖', title: 'Automation', description: 'Set-it-and-forget-it collection' },
      { icon: '📊', title: 'Real-time insights', description: 'Live performance and trends' },
      { icon: '🔔', title: 'Smart alerts', description: 'Never miss a critical review' },
    ]}
    bg="stone"
    iconBg="bg-kem-lime-soft"
  />
)

export default GoogleReviews
