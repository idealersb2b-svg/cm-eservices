import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenisInstance } from '../../lib/smoothScroll'

/**
 * Drives buttery inertial scrolling for the entire app.
 *
 * Mounted once in App.jsx (outside the route outlet) so the Lenis
 * instance survives route changes instead of being torn down and
 * rebuilt on every navigation — that rebuild churn was part of what
 * made scrolling feel like it was "sticking."
 *
 * Renders nothing; it only drives the rAF loop and native scroll
 * events, so every existing scroll-based hook (useScrollDirection,
 * Framer Motion's whileInView, etc.) keeps working unchanged.
 *
 * Fully skipped when the user prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    })

    setLenisInstance(lenis)

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  return null
}
