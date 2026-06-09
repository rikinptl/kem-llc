import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import CaseStudyCard from '../components/case-studies/CaseStudyCard'
import { CASE_STUDIES } from '../data/caseStudies'

const CaseStudies = () => (
  <div className="landing-page">
    <PageHeader
      title="Case studies"
      subtitle="Real workarounds and innovations from client engagements—anonymized, but the problems and fixes are genuine."
      bg="stone"
    />

    <section className="relative px-6 lg:px-12 pb-8 -mt-4">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden min-h-[200px] md:min-h-[260px] relative">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop"
          alt="Team collaborating on technical problem solving"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-kem-forest/75" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 md:py-20">
          <p className="text-kem-lime text-xs font-bold uppercase tracking-[0.2em] mb-3">How we solve hard problems</p>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            Workarounds that held up in production—and innovations we&apos;d use again on the next engagement.
          </p>
        </div>
      </div>
    </section>

    <section className="landing-section pt-8 md:pt-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-kem-forest/50 text-sm mb-10 max-w-xl mx-auto">
          Client names withheld by agreement. Photos from{' '}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-kem-forest"
          >
            Unsplash
          </a>
          . Stack logos from our tech library.
        </p>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>

    <section className="landing-section bg-kem-lime border-t border-kem-forest/10 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold text-2xl text-kem-forest mb-4">Have a problem worth documenting?</h2>
        <p className="text-kem-forest/70 mb-8 leading-relaxed">
          We take on messy integrations, legacy constraints, and &ldquo;impossible&rdquo; timelines—then write up what worked.
        </p>
        <Link to="/contact" className="landing-pill-primary">
          Start a conversation
        </Link>
      </div>
    </section>
  </div>
)

export default CaseStudies
