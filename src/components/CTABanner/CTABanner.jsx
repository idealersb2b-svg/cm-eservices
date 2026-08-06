import { motion } from 'framer-motion'
import AnimatedBlobs from '../Backgrounds/AnimatedBlobs'
import Button from '../Buttons/Button'
import { fadeUp, staggerContainer } from '../../animations/variants'
import styles from './CTABanner.module.scss'

/**
 * Full-width closing CTA panel. Reused at the bottom of any page
 * that needs a final conversion push.
 */
export default function CTABanner({
  eyebrow = "Let's build",
  title = 'Have a project in mind?',
  description = "Tell us what you're building — we'll reply within one business day.",
}) {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.panel}
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <AnimatedBlobs className={styles.blobs} />
          <div className={styles.content}>
            <motion.span variants={fadeUp} className={styles.eyebrow}>
              {eyebrow}
            </motion.span>
            <motion.h2 variants={fadeUp} className={styles.title}>
              {title}
            </motion.h2>
            <motion.p variants={fadeUp} className={styles.description}>
              {description}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button to="/contact" variant="primary" size="lg">
                Start a project
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
