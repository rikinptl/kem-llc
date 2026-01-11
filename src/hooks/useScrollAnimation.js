import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-driven animations
 * Returns scroll progress and element visibility
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let scrollHandler = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        
        if (entry.isIntersecting) {
          const calculateProgress = () => {
            const rect = element.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementTop = rect.top
            const elementHeight = rect.height
            
            // Calculate progress: 0 when element enters viewport, 1 when it leaves
            const progress = Math.max(
              0,
              Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight))
            )
            setScrollProgress(progress)
          }
          
          calculateProgress()
          scrollHandler = calculateProgress
          window.addEventListener('scroll', scrollHandler, { passive: true })
        } else if (scrollHandler) {
          window.removeEventListener('scroll', scrollHandler)
          scrollHandler = null
        }
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible, scrollProgress }
}

