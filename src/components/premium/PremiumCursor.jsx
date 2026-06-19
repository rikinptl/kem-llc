import React, { useEffect, useRef, useState } from 'react'

const lerp = (start, end, amount) => start + (end - start) * amount

const PremiumCursor = () => {
  const haloRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const target = useRef({ x: -200, y: -200 })
  const hoveringRef = useRef(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return undefined

    setActive(true)

    const onMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY }
    }

    const onOver = (event) => {
      hoveringRef.current = Boolean(
        event.target.closest('a, button, input, textarea, select, label, [data-cursor="interactive"]')
      )
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    let frame = 0
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.1)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.1)

      if (haloRef.current) {
        const scale = hoveringRef.current ? 1.18 : 1
        haloRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale})`
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (!active) return null

  return <div ref={haloRef} className="premium-cursor-halo" aria-hidden="true" />
}

export default PremiumCursor
