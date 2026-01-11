import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const TechStack = () => {
  const { ref } = useScrollAnimation()

  // Tech stack logos (only including successfully downloaded ones)
  const techStack = [
    { name: 'Docker', path: '/images/tech-stack/docker.svg' },
    { name: 'Kubernetes', path: '/images/tech-stack/kubernetes.svg' },
    { name: 'Google Cloud', path: '/images/tech-stack/googlecloud.svg' },
    { name: 'Terraform', path: '/images/tech-stack/terraform.svg' },
    { name: 'Ansible', path: '/images/tech-stack/ansible.svg' },
    { name: 'Jenkins', path: '/images/tech-stack/jenkins.svg' },
    { name: 'GitLab', path: '/images/tech-stack/gitlab.svg' },
    { name: 'GitHub', path: '/images/tech-stack/github.svg' },
    { name: 'Python', path: '/images/tech-stack/python.svg' },
    { name: 'Node.js', path: '/images/tech-stack/nodedotjs.svg' },
    { name: 'React', path: '/images/tech-stack/react.svg' },
    { name: 'TypeScript', path: '/images/tech-stack/typescript.svg' },
    { name: 'PostgreSQL', path: '/images/tech-stack/postgresql.svg' },
    { name: 'MongoDB', path: '/images/tech-stack/mongodb.svg' },
    { name: 'Redis', path: '/images/tech-stack/redis.svg' },
    { name: 'NGINX', path: '/images/tech-stack/nginx.svg' },
    { name: 'Prometheus', path: '/images/tech-stack/prometheus.svg' },
    { name: 'Grafana', path: '/images/tech-stack/grafana.svg' },
  ]

  return (
    <section
      ref={ref}
      className="py-section px-6 lg:px-12 relative overflow-hidden bg-stark-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight-blue tracking-tight mb-4">
            Our Tech Stack
          </h2>
          <p className="text-slate-silver text-lg font-light max-w-2xl mx-auto">
            Built with industry-leading tools and technologies
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          {techStack.map((tech, index) => (
            <TechLogo key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TechLogo = ({ tech, index }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const logoRef = React.useRef(null)

  const handleMouseMove = (e) => {
    if (!logoRef.current) return
    const rect = logoRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x: x * 0.1, y: y * 0.1 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={logoRef}
      className="group flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
    >
      <div className="relative p-6 rounded-2xl border border-slate-silver/20 bg-stark-white transition-all duration-300 group-hover:border-slate-silver/40 group-hover:shadow-lg w-full aspect-square flex items-center justify-center">
        <img
          src={tech.path}
          alt={tech.name}
          className="w-16 h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-silver font-light text-center">
        {tech.name}
      </p>
    </motion.div>
  )
}

export default TechStack

