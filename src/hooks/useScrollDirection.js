import { useEffect, useRef, useState } from 'react'

/**
 * Tracks scroll direction and position so the navbar can
 * hide on scroll-down and reveal on scroll-up.
 *
 * @param {number} threshold - minimum px scrolled before we react
 * @returns {{ direction: 'up' | 'down', scrolled: boolean }}
 */
export default function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState('up')
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const diff = currentY - lastY.current

          if (Math.abs(diff) > threshold) {
            setDirection(diff > 0 ? 'down' : 'up')
            lastY.current = currentY
          }

          setScrolled(currentY > 24)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { direction, scrolled }
}
