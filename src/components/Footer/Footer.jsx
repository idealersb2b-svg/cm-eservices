import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowUpRight,
  FiSend,
  FiMapPin,
  FiMail,
  FiPhone,
} from 'react-icons/fi'
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from 'react-icons/fa6'
import { navLinks } from '../../data/navLinks'
import { services } from '../../data/services'
import { socialLinks } from '../../data/socialLinks'
import { fadeUp, staggerContainer } from '../../animations/variants'
import logo from '../../assets/images/logo.png'
import styles from './Footer.module.scss'

const iconMap = {
  FaLinkedinIn: FaLinkedinIn,
  FaInstagram: FaInstagram,
  FaFacebookF: FaFacebookF,
  FaXTwitter: FaXTwitter,
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    // Wiring to a real newsletter provider happens later — this is
    // just the interaction shell for now.
    setSubmitted(true)
    setEmail('')
  }

  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <motion.div
        className={`container ${styles.top}`}
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={fadeUp} className={styles.brandCol}>
          <img src={logo} alt="CM-eServices" className={styles.logo} />
          <p className={styles.tagline}>
            An AI-forward digital studio building web platforms, brand
            systems and growth engines for ambitious companies.
          </p>

          <ul className={styles.contactList}>
            <li>
              <FiMapPin /> <span>India</span>
            </li>
            <li>
              <FiMail /> <a href="mailto:hello@cm-eservices.com">hello@cm-eservices.com</a>
            </li>
            <li>
              <FiPhone /> <a href="tel:+910000000000">+91 00000 00000</a>
            </li>
          </ul>

          <div className={styles.socials}>
            {socialLinks.map((s) => {
              const Icon = iconMap[s.icon]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={styles.socialIcon}
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className={styles.linkCol}>
          <span className={styles.colTitle}>Navigate</span>
          <ul>
            {navLinks.map((item) =>
              item.external ? (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label} <FiArrowUpRight />
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              )
            )}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className={styles.linkCol}>
          <span className={styles.colTitle}>IT Services</span>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <Link to={s.path}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className={styles.newsletterCol}>
          <span className={styles.colTitle}>Stay in the loop</span>
          <p className={styles.newsletterCopy}>
            Product updates, case studies and the occasional AI experiment.
            No spam.
          </p>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe">
              <FiSend />
            </button>
          </form>
          {submitted && <span className={styles.confirm}>You're on the list.</span>}
        </motion.div>
      </motion.div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} CM-eServices. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
