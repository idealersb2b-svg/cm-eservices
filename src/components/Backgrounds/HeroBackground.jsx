import styles from './Backgrounds.module.scss'

/**
 * Hero backdrop: carbon-black base, a slow-drifting green glow, and the
 * digital grid — all pure CSS (gradients + one transform keyframe).
 *
 * This replaces the earlier canvas-based NeuralNetworkBg in the hero:
 * same "futuristic AI studio" read, but nothing recalculates on the
 * main thread every frame, so it doesn't compete with scroll for CPU.
 */
export default function HeroBackground({ className = '' }) {
  return (
    <div className={`${styles.heroGradient} ${className}`} aria-hidden="true">
      <div className={styles.heroGlow} />
      <div className={styles.heroGridMask}>
        <div className={styles.heroGridLines} />
      </div>
      <div className={styles.gridSpotlight} />
    </div>
  )
}
