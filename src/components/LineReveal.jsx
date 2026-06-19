import React from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE_OUT } from '../lib/motion'

const LineReveal = ({
  lines,
  as: Tag = 'h2',
  className = '',
  lineClassName = '',
  stagger = 0.09,
  duration = 0.9,
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })

  if (!Array.isArray(lines)) lines = [lines]
  const getLineClass = (i) =>
    Array.isArray(lineClassName) ? (lineClassName[i] ?? lineClassName[0] ?? '') : lineClassName

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${getLineClass(i)}`}
            initial={{ y: '108%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: '108%', opacity: 0 }}
            transition={{ duration, delay: i * stagger, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export default LineReveal
