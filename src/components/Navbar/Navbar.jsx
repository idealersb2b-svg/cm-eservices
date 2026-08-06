import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiArrowUpRight } from 'react-icons/fi'
import { navLinks } from '../../data/navLinks'
import useScrollDirection from '../../hooks/useScrollDirection'
import { navbarVariants } from '../../animations/variants'
import NavDropdown from './NavDropdown'
import MobileDrawer from './MobileDrawer'
import Button from '../Buttons/Button'
import logo from '../../assets/images/logo.png'
import styles from './Navbar.module.scss'

/**
 * Sticky, glass-morphic primary navigation.
 * - Hides on scroll-down, reveals on scroll-up (desktop + mobile)
 * - Gains a solid glass background once the page has scrolled
 * - Renders animated dropdowns on desktop, a slide-in drawer on mobile
 */
export default function Navbar() {
  const { direction, scrolled } = useScrollDirection()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        variants={navbarVariants}
        animate={direction === 'down' && scrolled ? 'hidden' : 'visible'}
        initial="visible"
      >
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.brand} aria-label="CM-eServices home">
            <img src={logo} alt="CM-eServices" className={styles.logoImg} />
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {navLinks.map((item) =>
              item.dropdown ? (
                <NavDropdown key={item.label} item={item} />
              ) : item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLinkExternal}
                >
                  {item.label}
                  <FiArrowUpRight className={styles.externalIcon} />
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className={styles.actions}>
            <Button to="/contact" variant="primary" size="sm" className={styles.ctaDesktop}>
              Start a project
            </Button>
            <button
              className={styles.hamburger}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
