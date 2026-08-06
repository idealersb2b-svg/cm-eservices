import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { fadeUp } from '../../animations/variants'
import styles from './PortfolioCard.module.scss'

/**
 * Featured-work card for the Home portfolio teaser strip.
 * Purely visual for now — will link out to real case-study
 * pages once /portfolio has detail routes.
 */
export default function PortfolioCard({ item }) {
  return (
    <motion.article variants={fadeUp} className={styles.card}>
      <div className={styles.glow} aria-hidden="true" />
      <span className={styles.tag}>{item.tag}</span>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.client}>{item.client}</p>
      <p className={styles.description}>{item.description}</p>
      <span className={styles.link}>
        View case study <FiArrowUpRight />
      </span>
    </motion.article>
  )
}
