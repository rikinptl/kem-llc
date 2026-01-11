import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Features = () => {
  const { ref } = useScrollAnimation()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const capabilities = [
    { title: 'Infrastructure as Code', icon: '⚡' },
    { title: 'CI/CD Pipeline Automation', icon: '🔄' },
    { title: 'Cloud Orchestration', icon: '☁️' },
    { title: 'Monitoring & Observability', icon: '📊' },
    { title: 'Security Automation', icon: '🔒' },
    { title: 'DevOps Transformation', icon: '🚀' },
  ]

  // Bento Grid layout
  const gridItems = [
    { ...capabilities[0], span: 'col-span-1 md:col-span-2', delay: 0 },
    { ...capabilities[1], span: 'col-span-1', delay: 0.1 },
    { ...capabilities[2], span: 'col-span-1', delay: 0.2 },
    { ...capabilities[3], span: 'col-span-1 md:col-span-2', delay: 0.3 },
    { ...capabilities[4], span: 'col-span-1', delay: 0.4 },
    { ...capabilities[5], span: 'col-span-1', delay: 0.5 },
  ]

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])

  return (
    <section 
      id="solutions" 
      ref={ref}
      className="py-section bg-midnight-blue px-6 lg:px-12 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-stark-white tracking-tight text-center">
            Technical Automation<br />Capabilities
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ opacity, y }}
        >
          {gridItems.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const BentoCard = ({ item, index }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const cardRef = React.useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${item.span} group cursor-pointer`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: item.delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      {/* Clean card with solid background */}
      <div className="relative h-full min-h-[200px] p-8 rounded-3xl border border-slate-silver/30 bg-white/10 transition-all duration-300 group-hover:bg-white/15 group-hover:border-slate-silver/50 group-hover:shadow-lg">
        <div className="relative z-10 flex flex-col justify-center h-full">
          <motion.span
            className="text-4xl mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {item.icon}
          </motion.span>
          <h3 className="text-xl font-semibold text-stark-white mb-2">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

export default Features
