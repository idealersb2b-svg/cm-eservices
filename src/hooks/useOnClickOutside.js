import { useEffect } from 'react'

/**
 * Fires a callback when a click/touch happens outside the given ref(s).
 * Accepts a single ref or an array of refs (useful for a trigger + panel pair).
 */
export default function useOnClickOutside(refs, handler) {
  useEffect(() => {
    const list = Array.isArray(refs) ? refs : [refs]

    const listener = (event) => {
      const clickedInside = list.some(
        (ref) => ref.current && ref.current.contains(event.target)
      )
      if (!clickedInside) handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
