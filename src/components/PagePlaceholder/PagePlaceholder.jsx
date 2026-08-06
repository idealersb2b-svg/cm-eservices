import { motion } from 'framer-motion'
import GridBg from '../Backgrounds/GridBg'
import AnimatedBlobs from '../Backgrounds/AnimatedBlobs'
import SectionTitle from '../SectionTitle/SectionTitle'
import { fadeUp } from '../../animations/variants'
import styles from './PagePlaceholder.module.scss'

/**
 * Temporary content block for routes that don't have real content yet.
 * Keeps every page on-brand (grid bg, blobs, typography) while the
 * route/navigation/layout work is validated ahead of content builds.
 *
 * Swap this out page-by-page once real sections are designed.
 */
export default function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <section className={styles.placeholder}>
      <GridBg />
      <AnimatedBlobs />
      <div className={`container ${styles.content}`}>
        <SectionTitle
          align="center"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={styles.badge}
        >
          Content in progress
        </motion.span>
      </div>
    </section>
  )
}
