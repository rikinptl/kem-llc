import React from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeTransition } from '../../lib/motion'

const motionTags = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  section: motion.section,
  article: motion.article,
}

const RevealFade = ({
  children,
  className = '',
  as = 'div',
  delay = 0,
  duration = 0.75,
  y = 14,
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const Tag = typeof as === 'string' ? motionTags[as] ?? motion.div : as

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={fadeTransition(delay, duration)}
    >
      {children}
    </Tag>
  )
}

export default RevealFade
