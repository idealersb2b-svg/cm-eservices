import { motion } from 'framer-motion'
import styles from './Backgrounds.module.scss'

/**
 * Ambient gradient blobs that drift slowly behind glass panels.
 * Purely decorative — marked aria-hidden.
 */
export default function AnimatedBlobs({ variant = 'default', className = '' }) {
  return (
    <div className={`${styles.blobLayer} ${styles[variant]} ${className}`} aria-hidden="true">
      <motion.div
        className={`${styles.blob} ${styles.blobGreen}`}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${styles.blob} ${styles.blobIndigo}`}
        animate={{ x: [0, -50, 30, 0], y: [0, 25, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
