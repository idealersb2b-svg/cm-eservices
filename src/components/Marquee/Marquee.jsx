import styles from './Marquee.module.scss'

/**
 * Infinite horizontal ticker. Renders the item list twice back-to-back
 * and animates a translateX(-50%) loop in CSS, so the seam is invisible.
 */
export default function Marquee({ items }) {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {[...items, ...items].map((item, i) => (
          <span className={styles.item} key={`${item}-${i}`}>
            {item}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
