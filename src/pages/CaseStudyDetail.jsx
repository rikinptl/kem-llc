import React from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { getCaseStudy } from '../data/caseStudies'

const TECH_LABELS = {
  python: 'Python',
  postgresql: 'PostgreSQL',
  docker: 'Docker',
  nginx: 'NGINX',
  redis: 'Redis',
  nodedotjs: 'Node.js',
  terraform: 'Terraform',
  kubernetes: 'Kubernetes',
  googlecloud: 'Google Cloud',
  react: 'React',
  mongodb: 'MongoDB',
  github: 'GitHub',
  prometheus: 'Prometheus',
  grafana: 'Grafana',
}

const CaseStudyDetail = () => {
  const { slug } = useParams()
  const study = getCaseStudy(slug)

  if (!study) {
    return <Navigate to="/case-studies" replace />
  }

  return (
    <div className="landing-page">
      <section className="relative min-h-[42vh] md:min-h-[48vh] flex items-end overflow-hidden">
        <img
          src={study.image}
          alt={study.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kem-forest via-kem-forest/70 to-kem-forest/30" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12 pt-32 pb-12 md:pb-16">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-white/70 hover:text-kem-lime text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All case studies
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-kem-lime text-kem-forest text-xs font-bold uppercase tracking-wider mb-4">
              {study.industry}
            </span>
            <h1 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.75rem)] text-white leading-tight mb-4 text-balance">
              {study.title}
            </h1>
            <p className="text-white/75 text-lg max-w-2xl leading-relaxed">{study.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="landing-section bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-12">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kem-stone border border-kem-forest/10 text-xs font-semibold text-kem-forest"
              >
                <img
                  src={`/images/tech-stack/${tech}.svg`}
                  alt=""
                  className="w-4 h-4 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                {TECH_LABELS[tech] || tech}
              </span>
            ))}
          </div>

          {[
            { label: 'The challenge', body: study.challenge },
            { label: 'The workaround', body: study.workaround },
            { label: 'The innovation', body: study.innovation },
          ].map((block, i) => (
            <motion.div
              key={block.label}
              className="mb-10 md:mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-kem-forest/45 mb-3">{block.label}</h2>
              <p className="text-kem-forest/75 text-lg leading-relaxed">{block.body}</p>
            </motion.div>
          ))}

          <div className="rounded-2xl bg-kem-lime/35 border border-kem-forest/10 p-6 md:p-8 mb-12">
            <h2 className="font-display font-extrabold text-lg text-kem-forest mb-4">Results</h2>
            <ul className="space-y-3">
              {study.outcome.map((item) => (
                <li key={item} className="flex gap-3 text-kem-forest/80">
                  <Check className="w-5 h-5 text-kem-forest shrink-0 mt-0.5" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="border-l-[3px] border-kem-lime pl-6 mb-12">
            <p className="text-kem-forest text-xl font-medium leading-relaxed mb-3">&ldquo;{study.quote}&rdquo;</p>
            <cite className="text-kem-forest/55 text-sm not-italic">{study.role}</cite>
          </blockquote>

          <Link to="/contact" className="landing-pill-primary inline-flex">
            Discuss a similar project
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CaseStudyDetail
