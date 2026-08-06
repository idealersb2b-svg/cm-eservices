import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX, FiStar, FiMail, FiLinkedin, FiGithub,
  FiChevronLeft, FiChevronRight, FiBriefcase,
  FiCode, FiExternalLink, FiCheckCircle,
} from 'react-icons/fi'
import HeroBackground from '../components/Backgrounds/HeroBackground'
import AnimatedBlobs from '../components/Backgrounds/AnimatedBlobs'
import SectionTitle from '../components/SectionTitle/SectionTitle'
import { fadeUp, staggerContainer, easeOutExpo } from '../animations/variants'
import styles from './OurExperts.module.scss'
import {
  expertStats,
  experts,
  caseStudies,
  expertTestimonials,
} from '../data/expertsContent'

import expertsHeroVisual from '../assets/images/experts_hero_visual.png'
import expertsHireVisual from '../assets/images/experts_hire_visual.png'

// ── Expert Card ──────────────────────────────────────────────────────────────
function ExpertCard({ expert, index, onClick }) {
  return (
    <motion.article
      className={`${styles.expertCard} ${styles[`accent_${expert.accent}`]}`}
      variants={fadeUp}
      custom={index}
      onClick={() => onClick(expert)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(expert)}
      aria-label={`View ${expert.name}'s profile`}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={expert.image}
          alt={`${expert.name} — ${expert.role}`}
          className={styles.cardImage}
        />
        <div className={styles.cardImageOverlay} />
        <span className={styles.cardAvailability}>
          <span className={styles.cardAvailabilityDot} />
          {expert.availability}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{expert.name}</h3>
        <p className={styles.cardRole}>{expert.role}</p>
        <p className={styles.cardTagline}>{expert.tagline}</p>

        <div className={styles.cardSkills}>
          {expert.skills.slice(0, 4).map((s) => (
            <span key={s} className={styles.skillPill}>{s}</span>
          ))}
          {expert.skills.length > 4 && (
            <span className={styles.skillPillMore}>+{expert.skills.length - 4}</span>
          )}
        </div>

        <button className={styles.cardCta} tabIndex={-1}>
          View profile <FiExternalLink size={13} />
        </button>
      </div>
    </motion.article>
  )
}

// ── Expert Modal ─────────────────────────────────────────────────────────────
function ExpertModal({ expert, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  }
  const modalVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: easeOutExpo } },
    exit: { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      className={styles.modalBackdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className={`${styles.modal} ${styles[`accent_${expert.accent}`]}`}
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${expert.name}'s profile`}
      >
        {/* Close */}
        <button className={styles.modalClose} onClick={onClose} aria-label="Close profile">
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalImageWrap}>
            <img src={expert.image} alt={expert.name} className={styles.modalImage} />
            <div className={styles.modalImageGlow} />
          </div>
          <div className={styles.modalHeaderInfo}>
            <span className={styles.modalEyebrow}>Creative Expert</span>
            <h2 className={styles.modalName}>{expert.name}</h2>
            <p className={styles.modalRole}>{expert.role}</p>
            <p className={styles.modalTagline}>{expert.tagline}</p>

            <div className={styles.modalSkills}>
              {expert.skills.map((s) => (
                <span key={s} className={styles.skillPill}>{s}</span>
              ))}
            </div>

            <div className={styles.modalActions}>
              <a
                href={`mailto:hello@cm-eservices.com?subject=Collaborate with ${expert.name}`}
                className={styles.modalMailBtn}
              >
                <FiMail size={15} /> Hire / Collaborate
              </a>
              <a href={expert.linkedin} className={styles.modalIconBtn} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <FiLinkedin size={16} />
              </a>
              <a href={expert.github} className={styles.modalIconBtn} aria-label="GitHub" target="_blank" rel="noreferrer">
                <FiGithub size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className={styles.modalSection}>
          <h4 className={styles.modalSectionTitle}><FiBriefcase size={14} /> About</h4>
          <p className={styles.modalBio}>{expert.bio}</p>
        </div>

        {/* Experience */}
        <div className={styles.modalSection}>
          <h4 className={styles.modalSectionTitle}><FiBriefcase size={14} /> Experience</h4>
          {expert.experience.map((exp) => (
            <div key={exp.org} className={styles.expItem}>
              <div className={styles.expDot} />
              <div>
                <p className={styles.expRole}>{exp.role}</p>
                <p className={styles.expOrg}>{exp.org}</p>
                <p className={styles.expPeriod}>{exp.period}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className={styles.modalSection}>
          <h4 className={styles.modalSectionTitle}><FiCode size={14} /> Key Projects</h4>
          <div className={styles.projectGrid}>
            {expert.projects.map((proj) => (
              <div key={proj.title} className={styles.projectCard}>
                <p className={styles.projectTag}>{proj.tag}</p>
                <h5 className={styles.projectTitle}>{proj.title}</h5>
                <p className={styles.projectDesc}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Testimonial Carousel ─────────────────────────────────────────────────────
function TestimonialsCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const total = expertTestimonials.length

  const go = useCallback((next) => {
    setDir(next > active ? 1 : -1)
    setActive(next)
  }, [active])

  const prev = () => go((active - 1 + total) % total)
  const next = () => go((active + 1) % total)

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setActive((a) => (a + 1) % total)
    }, 6000)
    return () => clearInterval(t)
  }, [total])

  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOutExpo } },
    exit: (d) => ({ opacity: 0, x: -d * 60, transition: { duration: 0.32 } }),
  }

  const t = expertTestimonials[active]

  return (
    <section className={styles.testimonialsSection}>
      <AnimatedBlobs className={styles.testimonialBlobs} />
      <div className="container">
        <SectionTitle
          eyebrow="What clients say"
          title="Words from the people we've worked with"
          align="center"
        />

        <div className={styles.testimonialWrap}>
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>
              <svg width="36" height="28" viewBox="0 0 40 32" fill="none">
                <path
                  d="M0 32V19.2C0 13.6 1.6 9.2 4.8 6 8 2.8 12.8 1.07 19.2.8L20 5.6C16.53 6.4 13.87 7.73 12 9.6 10.27 11.47 9.4 13.87 9.4 16.8H16V32H0ZM24 32V19.2C24 13.6 25.6 9.2 28.8 6 32 2.8 36.8 1.07 43.2.8L44 5.6C40.53 6.4 37.87 7.73 36 9.6 34.27 11.47 33.4 13.87 33.4 16.8H40V32H24Z"
                  fill="url(#qg)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="qg" x1="0" y1="0" x2="44" y2="32">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#5b5ff6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className={styles.testimonialInner}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.blockquote
                  key={active}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.testimonialQuote}
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={`meta-${active}`}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.testimonialMeta}
                >
                  <div className={styles.testimonialAvatar}>{t.avatar}</div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                  <div className={styles.testimonialStars}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar key={i} size={13} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.testimonialControls}>
            <button className={styles.testimonialBtn} onClick={prev} aria-label="Previous">
              <FiChevronLeft size={18} />
            </button>
            <div className={styles.testimonialDots}>
              {expertTestimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.tdot} ${i === active ? styles.tdotActive : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className={styles.testimonialBtn} onClick={next} aria-label="Next">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function OurExperts() {
  const [selectedExpert, setSelectedExpert] = useState(null)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <HeroBackground />
        <div className={`container ${styles.heroInner}`}>
          {/* Left copy */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className={styles.heroCopy}
          >
            <motion.span variants={fadeUp} className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Our Creative Experts
            </motion.span>

            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              Driven minds.{' '}
              <span className={styles.gradientText}>Fresh ideas.</span>{' '}
              Real impact.
            </motion.h1>

            <motion.p variants={fadeUp} className={styles.heroParagraph}>
              Meet the passionate interns behind CM-eServices' most innovative work —
              talent that punches well above its weight.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className={styles.heroStats}>
              {expertStats.map((stat) => (
                <div key={stat.label} className={styles.heroStat}>
                  <span className={styles.heroStatValue}>{stat.value}</span>
                  <span className={styles.heroStatLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visual panel */}
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.heroVisualFrame}>
              <img
                src={expertsHeroVisual}
                alt="Our creative experts — AI, web, and CS engineering team"
                className={styles.heroVisualImg}
              />
              <div className={styles.heroVisualOverlay} />
            </div>
            {/* Floating accent badges */}
            <motion.div
              className={styles.heroBadge}
              data-pos="tl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16,1,0.3,1] }}
            >
              <span className={styles.heroBadgeDot} style={{ background: 'var(--c-green)' }} />
              AI · ML · Web · Cloud
            </motion.div>
            <motion.div
              className={styles.heroBadge}
              data-pos="br"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: [0.16,1,0.3,1] }}
            >
              <span className={styles.heroBadgeDot} style={{ background: 'var(--c-indigo)' }} />
              India's finest intern talent
            </motion.div>
            <div className={styles.heroVisualGlow} />
          </motion.div>
        </div>

        <div className={styles.heroGradientBar} />
      </section>

      {/* ── EXPERT CARDS ─────────────────────────────────────────────── */}
      <section className={styles.expertsSection}>
        <div className="container">
          <SectionTitle
            eyebrow="Meet the team"
            title="Meet our Creative Experts"
            description="Click any card to explore their work, skills, and story."
          />

          <motion.div
            className={styles.expertsGrid}
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {experts.map((expert, i) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                index={i}
                onClick={setSelectedExpert}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HIRE / COLLABORATE CTA ──────────────────────────────────── */}
      <section className={styles.hireCta}>
        <AnimatedBlobs className={styles.hireBlobs} />
        <div className="container">
          <div className={styles.hireLayout}>
            {/* Left: copy */}
            <motion.div
              className={styles.hirePanel}
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.span variants={fadeUp} className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                Work with our experts
              </motion.span>
              <motion.h2 variants={fadeUp} className={styles.hireTitle}>
                Hire or Collaborate{' '}
                <span className={styles.gradientText}>with our Interns</span>
              </motion.h2>
              <motion.p variants={fadeUp} className={styles.hireDesc}>
                Looking for a skilled AI engineer, a full-stack developer, or a CS architect?
                Our interns are available for freelance projects, internship extensions, and
                full-time opportunities. Drop us a line — we'll match you with the right talent.
              </motion.p>
              <motion.div variants={fadeUp} className={styles.hireActions}>
                <a
                  href="mailto:hello@cm-eservices.com?subject=Hire/Collaborate with CM-eServices Interns"
                  className={styles.hireMailBtn}
                  id="hire-intern-email-btn"
                >
                  <FiMail size={17} />
                  Mail us your requirement
                </a>
                <p className={styles.hireSubtext}>
                  We respond within 1 business day
                </p>
              </motion.div>

              {/* Feature bullets */}
              <motion.ul variants={fadeUp} className={styles.hireFeatures}>
                {[
                  'Pre-vetted, production-ready talent',
                  'Flexible engagement: part-time, full-time, or project-based',
                  'Competitive rates backed by India\'s cost advantage',
                  'Mentored by senior professionals at CM-eServices',
                ].map((f) => (
                  <li key={f} className={styles.hireFeatureItem}>
                    <FiCheckCircle size={15} className={styles.hireFeatureIcon} />
                    {f}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right: visual */}
            <motion.div
              className={styles.hireVisual}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.hireVisualFrame}>
                <img
                  src={expertsHireVisual}
                  alt="Hire and collaborate with CM-eServices interns"
                  className={styles.hireVisualImg}
                />
                <div className={styles.hireVisualOverlay} />
              </div>
              <motion.div
                className={styles.hireBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.5, ease: [0.16,1,0.3,1] }}
              >
                <FiMail size={14} style={{ color: 'var(--c-green)' }} />
                <span>Responding within 1 business day</span>
              </motion.div>
              <div className={styles.hireVisualGlow} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────── */}
      <section className={styles.caseStudiesSection}>
        <div className="container">
          <SectionTitle
            eyebrow="Case studies"
            title="Work that speaks for itself"
            description="Real problems. Real solutions. Real numbers."
          />

          <motion.div
            className={styles.caseGrid}
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {caseStudies.map((cs, i) => (
              <motion.article
                key={cs.title}
                className={styles.caseCard}
                variants={fadeUp}
                custom={i}
                style={{ '--cs-accent': cs.accentColor }}
              >
                <span className={styles.caseTag}>{cs.tag}</span>
                <h3 className={styles.caseTitle}>{cs.title}</h3>
                <p className={styles.caseExcerpt}>{cs.excerpt}</p>
                <div className={styles.caseOutcome}>
                  <FiCheckCircle size={14} />
                  {cs.outcome}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── EXPERT MODAL ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedExpert && (
          <ExpertModal
            expert={selectedExpert}
            onClose={() => setSelectedExpert(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
