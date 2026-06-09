import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'

const CaseStudyCard = ({ study, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    className="group"
  >
    <Link
      to={`/case-studies/${study.slug}`}
      className="block landing-card overflow-hidden hover:shadow-[0_16px_48px_-16px_rgba(22,51,0,0.18)] transition-shadow duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={study.image}
          alt={study.imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kem-forest/85 via-kem-forest/25 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-kem-forest text-xs font-bold uppercase tracking-wider">
          {study.industry}
        </span>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 text-kem-forest/45 text-xs font-semibold mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {study.readTime}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-xl md:text-2xl text-kem-forest mb-3 leading-snug group-hover:text-kem-forest-light transition-colors">
          {study.title}
        </h2>
        <p className="text-kem-forest/65 text-sm md:text-base leading-relaxed mb-5 line-clamp-3">{study.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-kem-forest group-hover:gap-2.5 transition-all">
          Read case study
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  </motion.article>
)

export default CaseStudyCard
