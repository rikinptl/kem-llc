import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    bg: 'bg-kem-lime-soft',
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
          <h2 className="landing-display text-[clamp(1.75rem,4vw,2.5rem)] normal-case max-w-xl">
            For teams going places
          </h2>
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="w-11 h-11 rounded-full border border-kem-forest/15 flex items-center justify-center hover:bg-kem-stone transition-colors"
              aria-label="Previous stories"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="w-11 h-11 rounded-full border border-kem-forest/15 flex items-center justify-center hover:bg-kem-stone transition-colors"
              aria-label="Next stories"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="landing-story-track flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {STORIES.map((story, i) => (
            <motion.article
              key={story.tag}
              className={`snap-start shrink-0 w-[min(100%,320px)] rounded-3xl p-8 ${story.bg}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-kem-forest/50 mb-4">{story.tag}</p>
              <p className="text-kem-forest text-lg font-medium leading-snug mb-8">&ldquo;{story.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-kem-forest/70">{story.name}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryCards
