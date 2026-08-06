import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations/variants'
import styles from './SectionTitle.module.scss'

/**
 * Standard section heading used across every page:
 * mono eyebrow label -> display heading -> optional supporting copy.
 *
 * @param {string} eyebrow - small mono label above the heading
 * @param {string} title - main heading text
 * @param {string} [description] - supporting paragraph
 * @param {'left'|'center'} [align]
 */
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  return (
    <motion.div
      className={`${styles.wrap} ${styles[align]} ${className}`}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {eyebrow && (
        <motion.span variants={fadeUp} className={styles.eyebrow}>
          <span className={styles.dot} />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 variants={fadeUp} className={styles.title}>
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className={styles.description}>
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
