import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Infrastructure = () => {
  const { ref } = useScrollAnimation()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])

  const infrastructureItems = [
    {
      title: 'Cloud-Native Architecture',
      description: 'Scalable infrastructure designed for modern cloud environments.',
      gradient: 'from-accent-teal/20 via-accent-cyan/15 to-transparent',
      borderColor: 'border-accent-teal/30',
      iconGradient: 'from-accent-teal to-accent-cyan',
    },
    {
      title: 'Container Orchestration',
      description: 'Kubernetes and Docker expertise for seamless deployments.',
      gradient: 'from-accent-blue/20 via-accent-indigo/15 to-transparent',
      borderColor: 'border-accent-blue/30',
      iconGradient: 'from-accent-blue to-accent-indigo',
    },
    {
      title: 'Multi-Cloud Strategy',
      description: 'Flexible infrastructure across AWS, Azure, and GCP.',
      gradient: 'from-ocean/20 via-deep-blue/15 to-transparent',
      borderColor: 'border-ocean/30',
      iconGradient: 'from-ocean to-deep-blue',
    },
  ]

  return (
    <section
      id="infrastructure"
      ref={ref}
      className="py-section px-6 lg:px-12 relative overflow-hidden bg-stark-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-midnight-blue tracking-tight mb-6">
            Enterprise Infrastructure
          </h2>
          <p className="text-xl text-slate-silver font-light max-w-2xl mx-auto">
            Robust, scalable infrastructure solutions built for performance and reliability.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ opacity, y }}
        >
          {infrastructureItems.map((item, index) => (
            <InfrastructureCard key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const InfrastructureCard = ({ item, index }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const cardRef = React.useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x: x * 0.1, y: y * 0.1 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      <div className="relative h-full p-8 md:p-12 rounded-3xl border border-slate-silver/30 bg-stark-white transition-all duration-300 group-hover:border-slate-silver/50 group-hover:shadow-lg">
        <div className="relative z-10">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-midnight-blue tracking-tight mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {item.title}
          </motion.h3>
          <p className="text-slate-silver text-lg leading-relaxed font-light">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Infrastructure

