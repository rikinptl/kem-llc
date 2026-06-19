import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'

const CaseStudyCard = ({ study, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.75, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    className="group"
  >
    <Link
      to={`/case-studies/${study.slug}`}
      className="block landing-card overflow-hidden group/card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={study.image}
          alt={study.imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-bold uppercase tracking-wider">
          {study.industry}
        </span>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {study.readTime}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-900 mb-3 leading-snug group-hover:text-slate-700 transition-colors">
          {study.title}
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-5 line-clamp-3">{study.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:gap-2.5 transition-all">
          Read case study
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  </motion.article>
)

export default CaseStudyCard
