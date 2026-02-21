import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const VALUES = [
  {
    title: 'Creative excellence',
    description:
      'We craft solutions that are both technically sound and easy to use—making your systems memorable and maintainable.',
  },
  {
    title: 'Customised solutions',
    description:
      'Tailored to your stack, timeline, and goals. We don’t ship templates; we deliver what fits your business.',
  },
  {
    title: 'Integrated expertise',
    description:
      'We combine architecture, automation, and development so you get one coherent outcome instead of siloed deliverables.',
  },
  {
    title: 'Open communication',
    description:
      'You always know where the project stands. Clear updates, honest timelines, and no surprises.',
  },
]

const Philosophy = () => {
  const { ref } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 lg:px-12 bg-stark-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight-blue tracking-tight max-w-3xl">
            We blend cutting-edge technology with clear design to build systems that reduce complexity and drive growth.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {VALUES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <h3 className="text-xl font-bold text-midnight-blue tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-slate-silver leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Philosophy
