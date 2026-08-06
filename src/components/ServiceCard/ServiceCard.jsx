import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCode,
  FiPenTool,
  FiSearch,
  FiShare2,
  FiHeadphones,
  FiUsers,
  FiArrowUpRight,
} from 'react-icons/fi'
import { fadeUp } from '../../animations/variants'
import styles from './ServiceCard.module.scss'

const iconMap = {
  'web-development': FiCode,
  'graphic-designing': FiPenTool,
  'seo-content-writing': FiSearch,
  'social-media-management': FiShare2,
  'bpo-services': FiHeadphones,
  'it-body-shopping': FiUsers,
}

/**
 * Service summary card — used on the Home services grid.
 * Elevates on hover per the design brief.
 */
export default function ServiceCard({ service, index = 0 }) {
  const Icon = iconMap[service.id] ?? FiCode

  return (
    <motion.div variants={fadeUp} custom={index} className={styles.cardWrap}>
      <Link to={service.path} className={styles.card}>
        <div className={styles.iconBadge}>
          <Icon />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{service.title}</h3>
          <p className={styles.summary}>{service.summary}</p>
        </div>
        <span className={styles.cta}>
          Learn more <FiArrowUpRight />
        </span>
      </Link>
    </motion.div>
  )
}
