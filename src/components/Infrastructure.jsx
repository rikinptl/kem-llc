import React from 'react'
import { motion } from 'framer-motion'

const Infrastructure = () => {
  const items = [
    {
      title: 'Cloud-Native Architecture',
      description: 'Scalable infrastructure designed for modern cloud environments.',
    },
    {
      title: 'Container Orchestration',
      description: 'Kubernetes and Docker expertise for seamless deployments.',
    },
    {
      title: 'Multi-Cloud Strategy',
      description: 'Flexible infrastructure across AWS, Azure, and GCP.',
    },
  ]

  return (
    <section className="landing-section bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className="landing-card p-8 md:p-10 hover:-translate-y-1 transition-transform duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-kem-lime text-sm font-bold text-kem-forest mb-5">
                {index + 1}
              </span>
              <h3 className="font-display font-extrabold text-xl text-kem-forest mb-3">{item.title}</h3>
              <p className="text-kem-forest/65 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Infrastructure
