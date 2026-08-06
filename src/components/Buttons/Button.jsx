import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import styles from './Button.module.scss'

/**
 * Universal button component.
 *
 * Renders as a <button>, an internal <Link>, or an external <a>
 * depending on the props passed in — so callers never have to think
 * about the underlying element.
 *
 * @param {'primary'|'secondary'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {string} [to] - internal route (renders react-router Link)
 * @param {string} [href] - external url (renders <a>)
 * @param {boolean} [withIcon] - show trailing arrow icon
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    withIcon = true,
    className = '',
    ...rest
  },
  ref
) {
  const classes = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {withIcon && (
        <span className={styles.iconWrap}>
          <FiArrowUpRight />
        </span>
      )}
    </>
  )

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
  }

  if (to) {
    return (
      <motion.span {...motionProps} className={styles.wrap}>
        <Link ref={ref} to={to} className={classes} {...rest}>
          {content}
        </Link>
      </motion.span>
    )
  }

  if (href) {
    return (
      <motion.span {...motionProps} className={styles.wrap}>
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {content}
        </a>
      </motion.span>
    )
  }

  return (
    <motion.span {...motionProps} className={styles.wrap}>
      <button ref={ref} className={classes} {...rest}>
        {content}
      </button>
    </motion.span>
  )
})

export default Button
