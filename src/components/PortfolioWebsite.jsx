import React from 'react'
import ExpandableServiceSection from '../components/ExpandableServiceSection'

const benefits = [
  { title: 'Professional Design', description: 'Modern portfolios that showcase work beautifully and convert visitors.', icon: '🎨' },
  { title: 'Fully Responsive', description: 'Flawless on desktop, tablet, and mobile—your work looks sharp everywhere.', icon: '📱' },
  { title: 'Fast Performance', description: 'Optimized load times that keep visitors engaged and rank well.', icon: '⚡' },
  { title: 'SEO Optimized', description: 'Structured for search visibility and organic discovery.', icon: '🔍' },
  { title: 'Easy Content Management', description: 'Update projects anytime without touching code.', icon: '🛠️' },
  { title: 'Portfolio Showcase', description: 'Galleries and case-study layouts built for creative work.', icon: '📸' },
  { title: 'Contact Integration', description: 'Forms and email hooks that turn traffic into leads.', icon: '📧' },
  { title: 'Analytics & Insights', description: 'See what resonates—projects, traffic, and engagement.', icon: '📊' },
]

const PortfolioWebsite = () => (
  <ExpandableServiceSection
    icon="🌐"
    title="Portfolio Website Creation"
    intro="Custom sites for photographers, designers, developers, and consultants—built to attract clients and showcase expertise with clarity and speed."
    benefits={benefits}
    ctaTitle="Customized for your brand"
    ctaBody="We tailor layout, typography, and motion to your identity—from minimal to bold creative showcases."
    ctaLabel="Get your portfolio"
    features={[
      { icon: '🎯', title: 'Custom design', description: 'Tailored to your style and brand' },
      { icon: '🚀', title: 'Quick launch', description: 'Concept to live in weeks' },
      { icon: '💼', title: 'Professional quality', description: 'Enterprise-grade hosting and support' },
    ]}
    bg="sky"
    iconBg="bg-kem-sky-deep"
  />
)

export default PortfolioWebsite
