import React from 'react'
import LineReveal from '../LineReveal'

const DisplayHeadline = ({
  lines,
  as = 'h2',
  className = '',
  lineClassName = '',
  stagger = 0.09,
  duration = 0.9,
}) => {
  const content = Array.isArray(lines) ? lines : [lines]

  return (
    <LineReveal
      as={as}
      lines={content}
      className={`landing-display normal-case ${className}`}
      lineClassName={lineClassName}
      stagger={stagger}
      duration={duration}
    />
  )
}

export default DisplayHeadline
