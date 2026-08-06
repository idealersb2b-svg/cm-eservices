import { useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeTyper from '../CodeTyper/CodeTyper'
import styles from './Loader.module.scss'

const CODE_LINES = [
  "import studio from 'cm-eservices'",
  "studio.build({ craft: true })",
  "> compiling design system... done",
  "> ready",
]
const CHAR_MS = 26
const LINE_PAUSE_MS = 180
const OUTRO_PAUSE_MS = 350

/**
 * Full-screen loading sequence shown once while the app boots.
 * A mock code editor types out a short build script; the progress
 * bar underneath is timed to the same typing constants so both
 * finish together, then `onComplete` fires and App.jsx unmounts us.
 */
export default function Loader({ visible, onComplete }) {
  const typingDurationMs = useMemo(
    () =>
      CODE_LINES.reduce((total, line) => total + line.length * CHAR_MS + LINE_PAUSE_MS, 0),
    []
  )

  useEffect(() => {
    if (!visible) return undefined
    const timer = setTimeout(() => onComplete?.(), typingDurationMs + OUTRO_PAUSE_MS)
    return () => clearTimeout(timer)
  }, [visible, typingDurationMs, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className={styles.inner}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <CodeTyper lines={CODE_LINES} charMs={CHAR_MS} linePauseMs={LINE_PAUSE_MS} />
            </motion.div>

            <div className={styles.barTrack}>
              <motion.div
                className={styles.barFill}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: typingDurationMs / 1000, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <motion.span
              className={styles.tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Welcome to CM-eServices
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
