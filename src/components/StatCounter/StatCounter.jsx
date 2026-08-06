import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import styles from './StatCounter.module.scss'

/**
 * Animated count-up number. Starts counting once scrolled into view,
 * settles via a spring so it doesn't feel mechanical.
 */
export default function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 })
  const nodeRef = useRef(null)

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.round(latest).toString()
      }
    })
  }, [spring])

  return (
    <motion.div ref={ref} className={styles.stat}>
      <span className={styles.value}>
        <span ref={nodeRef}>0</span>
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </motion.div>
  )
}
