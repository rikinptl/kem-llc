import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DisplayHeadline from '../premium/DisplayHeadline'
import { fadeTransition } from '../../lib/motion'

const STORIES = [
  {
    tag: 'Logistics',
    quote: 'Our drivers finally had an app that worked offline—and dispatch stopped living on phone calls.',
    name: 'VP Operations, regional fleet operator',
    bg: 'bg-kem-sky',
  },
  {
    tag: 'Finance',
    quote: 'They rebuilt our monitoring stack and we finally sleep through deploy nights.',
    name: 'Engineering director',
    bg: 'bg-kem-accent-soft',
  },
  {
    tag: 'Retail',
    quote: 'Workflow automation paid for itself in the first quarter—clear ROI, no fluff.',
    name: 'Head of digital',
    bg: 'bg-kem-sky-deep',
  },
]

const StoryCards = () => {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section className="landing-section bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10">
          <DisplayHeadline
            lines="For teams going places"
            className="text-[clamp(1.75rem,4vw,2.5rem)] max-w-xl"
          />
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-kem-stone premium-hover-lift"
              aria-label="Previous stories"
              data-cursor="interactive"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-kem-stone premium-hover-lift"
              aria-label="Next stories"
              data-cursor="interactive"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="landing-story-track flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {STORIES.map((story, i) => (
            <motion.article
              key={story.tag}
              className={`snap-start shrink-0 w-[min(100%,320px)] rounded-3xl p-8 premium-hover-lift ${story.bg}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={fadeTransition(i * 0.08, 0.8)}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">{story.tag}</p>
              <p className="text-slate-900 text-lg font-medium leading-snug mb-8">&ldquo;{story.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-slate-600">{story.name}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryCards
