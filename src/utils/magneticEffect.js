import { useRef } from 'react'

/**
 * Magnetic effect utility for buttons and interactive elements
 */
export const useMagneticEffect = (strength = 0.3) => {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    const element = ref.current
    if (!element) return
    element.style.transform = 'translate(0, 0)'
  }

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}

