/** Shared motion tokens — slow, restrained, editorial */
export const EASE_OUT = [0.22, 1, 0.36, 1]
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94]

export const revealTransition = (delay = 0, duration = 0.85) => ({
  duration,
  delay,
  ease: EASE_OUT,
})

export const fadeTransition = (delay = 0, duration = 0.7) => ({
  duration,
  delay,
  ease: EASE_SMOOTH,
})
