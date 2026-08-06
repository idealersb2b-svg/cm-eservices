import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronRight, FiArrowUpRight } from 'react-icons/fi'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { dropdownVariants, submenuVariants } from '../../animations/variants'
import styles from './Navbar.module.scss'

/**
 * Desktop dropdown panel for a nav item that has `item.dropdown`.
 * Supports a second nesting level via `entry.submenu` (used by
 * "Services" -> "IT Services" -> individual service pages).
 */
export default function NavDropdown({ item, closeParent }) {
  const [open, setOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const ref = useRef(null)

  useOnClickOutside(ref, () => {
    setOpen(false)
    setActiveSubmenu(null)
  })

  const close = () => {
    setOpen(false)
    setActiveSubmenu(null)
    closeParent?.()
  }

  return (
    <div
      className={styles.navItem}
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false)
        setActiveSubmenu(null)
      }}
    >
      <button
        className={styles.navTrigger}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {item.path ? (
          <NavLink to={item.path} className={styles.navLabel} onClick={(e) => e.preventDefault()}>
            {item.label}
          </NavLink>
        ) : (
          <span className={styles.navLabel}>{item.label}</span>
        )}
        <FiChevronRight className={styles.chevron} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdown}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ul className={styles.dropdownList}>
              {item.dropdown.map((entry) => (
                <li
                  key={entry.label}
                  className={styles.dropdownItem}
                  onMouseEnter={() => setActiveSubmenu(entry.submenu ? entry.label : null)}
                >
                  {entry.submenu ? (
                    <div className={styles.submenuTrigger}>
                      <div className={styles.entryText}>
                        <span className={styles.entryTitle}>{entry.label}</span>
                        {entry.description && (
                          <span className={styles.entryDesc}>{entry.description}</span>
                        )}
                      </div>
                      <FiChevronRight className={styles.entryArrow} />

                      <AnimatePresence>
                        {activeSubmenu === entry.label && (
                          <motion.ul
                            className={styles.submenu}
                            variants={submenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {entry.submenu.map((sub) => (
                              <li key={sub.label}>
                                <Link to={sub.path} className={styles.submenuLink} onClick={close}>
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : entry.external ? (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.dropdownLink}
                      onClick={close}
                    >
                      <div className={styles.entryText}>
                        <span className={styles.entryTitle}>{entry.label}</span>
                        {entry.description && (
                          <span className={styles.entryDesc}>{entry.description}</span>
                        )}
                      </div>
                      <FiArrowUpRight className={styles.entryArrow} />
                    </a>
                  ) : (
                    <Link to={entry.path} className={styles.dropdownLink} onClick={close}>
                      <div className={styles.entryText}>
                        <span className={styles.entryTitle}>{entry.label}</span>
                        {entry.description && (
                          <span className={styles.entryDesc}>{entry.description}</span>
                        )}
                      </div>
                      <FiChevronRight className={styles.entryArrow} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
