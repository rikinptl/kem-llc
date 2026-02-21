import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const QUOTES = [
  {
    quote:
      'KEM delivered clear architecture and automation that our team could own. The process was collaborative and the result was exactly what we needed.',
    author: 'Enterprise client',
    role: 'IT Director',
  },
  {
    quote:
      'From legacy systems to a modern, automated workflow—KEM made the transition smooth and documented everything so we could maintain it.',
    author: 'Operations lead',
    role: 'Manufacturing',
  },
  {
    quote:
      'Professional, responsive, and technically sharp. They understood our constraints and delivered on time with no surprises.',
    author: 'Startup founder',
    role: 'Technology',
  },
]

const TestimonialsStrip = () => {
  const { ref } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 lg:px-12 bg-warm-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight-blue tracking-tight max-w-2xl">
            Hear it from
            <br />
            <span className="text-slate-silver font-light">our clients</span>
          </h2>
          <Link
            to="/solutions"
            className="text-midnight-blue font-semibold text-sm tracking-tight hover:text-accent-teal transition-colors shrink-0"
          >
            Read more →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {QUOTES.map((item, index) => (
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-slate-silver/15 bg-stark-white"
            >
              <p className="text-midnight-blue/90 leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer>
                <p className="font-semibold text-midnight-blue text-sm">
                  {item.author}
                </p>
                <p className="text-slate-silver text-xs">{item.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsStrip
