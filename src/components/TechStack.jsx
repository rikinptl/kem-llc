import React from 'react'
import { motion } from 'framer-motion'

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

const TechStack = () => (
  <section className="landing-section bg-kem-sky border-y border-slate-200">
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="landing-display text-[clamp(1.5rem,3.5vw,2.25rem)] normal-case mb-4">Our tech stack</h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Built with industry-leading tools and technologies
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="group flex flex-col items-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
          >
            <div className="landing-card w-full aspect-square flex items-center justify-center p-4 group-hover:bg-white transition-colors">
              <img
                src={tech.path}
                alt={tech.name}
                className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-600 text-center">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default TechStack
