import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'
import styles from './InfoCard.module.scss'

/**
 * Icon + title + description card used for non-navigational content
 * blocks (principles, pillars, capability lists). Same visual
 * language as ServiceCard (elevate + glow on hover) but renders as a
 * plain block rather than a link, since not every entry has a route.
 */
export default function InfoCard({ icon: Icon, title, description, index = 0, className = '' }) {
  return (
    <motion.div variants={fadeUp} custom={index} className={`${styles.card} ${className}`}>
      <div className={styles.iconBadge}>
        <Icon />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  )
}
