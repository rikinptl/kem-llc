import React from 'react'
import { motion } from 'framer-motion'

const VALUES = [
  { title: 'Creative excellence', description: 'We craft solutions that are both technically sound and easy to use—making your systems memorable and maintainable.' },
  { title: 'Customised solutions', description: "Tailored to your stack, timeline, and goals. We don't ship templates; we deliver what fits your business." },
  { title: 'Integrated expertise', description: 'We combine architecture, automation, and development so you get one coherent outcome instead of siloed deliverables.' },
  { title: 'Open communication', description: 'You always know where the project stands. Clear updates, honest timelines, and no surprises.' },
]

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

const Philosophy = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-canvas overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/[0.05] via-transparent to-cyan-500/[0.04]" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="font-display font-bold text-display-md text-white tracking-tight max-w-3xl mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          We blend cutting-edge technology with clear design to build systems that reduce complexity and drive growth.
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {VALUES.map((v) => (
            <motion.div key={v.title} variants={item}>
              <h3 className="text-xl font-display font-bold text-white tracking-tight mb-3">{v.title}</h3>
              <p className="text-white/55 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Philosophy
