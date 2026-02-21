import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LineReveal from './LineReveal'

const QUOTES = [
  { quote: 'KEM delivered clear architecture and automation that our team could own. The process was collaborative and the result was exactly what we needed.', author: 'Enterprise client', role: 'IT Director' },
  { quote: 'From legacy systems to a modern, automated workflow—KEM made the transition smooth and documented everything so we could maintain it.', author: 'Operations lead', role: 'Manufacturing' },
  { quote: 'Professional, responsive, and technically sharp. They understood our constraints and delivered on time with no surprises.', author: 'Startup founder', role: 'Technology' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const card = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }

const TestimonialsStrip = () => {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <LineReveal lines={['Hear it from', 'our clients']} as="h2" className="text-display-md font-display font-bold text-ink tracking-tight max-w-2xl" lineClassName={['text-ink', 'text-silver font-light']} stagger={0.08} />
          <Link to="/solutions" className="arrow-rotate inline-flex items-center gap-2 text-ink font-semibold text-sm tracking-tight hover:text-accent transition-colors shrink-0">
            Read more <span className="icon-arrow">→</span>
          </Link>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {QUOTES.map((q, i) => (
            <motion.blockquote key={i} variants={card} className="p-8 rounded-3xl border border-ink/10 bg-cloud/50 hover:border-accent/20 hover:shadow-card transition-all duration-300">
              <p className="text-ink/90 leading-relaxed mb-6">&ldquo;{q.quote}&rdquo;</p>
              <footer>
                <p className="font-semibold text-ink text-sm">{q.author}</p>
                <p className="text-silver text-xs">{q.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsStrip
