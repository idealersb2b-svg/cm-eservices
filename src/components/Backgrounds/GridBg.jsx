import styles from './Backgrounds.module.scss'

/**
 * Faint digital grid + radial spotlight — used behind hero/section
 * headers for depth without competing with foreground content.
 */
export default function GridBg({ className = '' }) {
  return (
    <div className={`${styles.gridLayer} ${className}`} aria-hidden="true">
      <div className={styles.gridLines} />
      <div className={styles.gridSpotlight} />
    </div>
  )
}
