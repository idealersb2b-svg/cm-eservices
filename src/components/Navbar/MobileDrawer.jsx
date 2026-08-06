import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronDown, FiArrowUpRight } from 'react-icons/fi'
import { drawerVariants, drawerItemVariants } from '../../animations/variants'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import { navLinks } from '../../data/navLinks'
import Button from '../Buttons/Button'
import styles from './Navbar.module.scss'

/**
 * Full-height animated mobile navigation drawer.
 * Slides in from the right; nested dropdowns expand as accordions.
 */
export default function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)
  const [expandedSub, setExpandedSub] = useState(null)

  useLockBodyScroll(open)

  const toggle = (label) => {
    setExpanded((prev) => (prev === label ? null : label))
    setExpandedSub(null)
  }
  const toggleSub = (label) => {
    setExpandedSub((prev) => (prev === label ? null : label))
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Menu</span>
              <button className={styles.drawerClose} onClick={onClose} aria-label="Close menu">
                <FiX />
              </button>
            </div>

            <nav className={styles.drawerNav}>
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={styles.drawerBlock}
                  variants={drawerItemVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.05 }}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className={styles.drawerLink}
                        onClick={() => toggle(item.label)}
                        aria-expanded={expanded === item.label}
                      >
                        {item.label}
                        <FiChevronDown
                          className={`${styles.drawerChevron} ${
                            expanded === item.label ? styles.rotated : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expanded === item.label && (
                          <motion.div
                            className={styles.drawerSubList}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.dropdown.map((entry) =>
                              entry.submenu ? (
                                <div key={entry.label}>
                                  <button
                                    className={styles.drawerSubLink}
                                    onClick={() => toggleSub(entry.label)}
                                  >
                                    {entry.label}
                                    <FiChevronDown
                                      className={`${styles.drawerChevron} ${
                                        expandedSub === entry.label ? styles.rotated : ''
                                      }`}
                                    />
                                  </button>
                                  <AnimatePresence>
                                    {expandedSub === entry.label && (
                                      <motion.div
                                        className={styles.drawerSubSubList}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        {entry.submenu.map((sub) => (
                                          <Link
                                            key={sub.label}
                                            to={sub.path}
                                            className={styles.drawerSubSubLink}
                                            onClick={onClose}
                                          >
                                            {sub.label}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : entry.external ? (
                                <a
                                  key={entry.label}
                                  href={entry.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.drawerSubLink}
                                  onClick={onClose}
                                >
                                  {entry.label}
                                  <FiArrowUpRight />
                                </a>
                              ) : (
                                <Link
                                  key={entry.label}
                                  to={entry.path}
                                  className={styles.drawerSubLink}
                                  onClick={onClose}
                                >
                                  {entry.label}
                                </Link>
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.drawerLink}
                      onClick={onClose}
                    >
                      {item.label}
                      <FiArrowUpRight />
                    </a>
                  ) : (
                    <Link to={item.path} className={styles.drawerLink} onClick={onClose}>
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className={styles.drawerFooter}>
              <Button to="/contact" variant="primary" size="md" onClick={onClose}>
                Start a project
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
