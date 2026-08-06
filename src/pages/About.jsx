import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight, FiCode, FiTrendingUp, FiGlobe, FiUsers } from 'react-icons/fi'
import HeroBackground from '../components/Backgrounds/HeroBackground'
import AnimatedBlobs from '../components/Backgrounds/AnimatedBlobs'
import Marquee from '../components/Marquee/Marquee'
import Button from '../components/Buttons/Button'
import SectionTitle from '../components/SectionTitle/SectionTitle'
import InfoCard from '../components/InfoCard/InfoCard'
import CTABanner from '../components/CTABanner/CTABanner'
import {
  heroCopy,
  marqueeWords,
  purposeTriad,
  whoWeAre,
  whoWeArePillars,
  whatWeDo,
  whatWeDoServices,
  testimonials,
} from '../data/aboutContent'
import { fadeUp, staggerContainer } from '../animations/variants'
import styles from './About.module.scss'

import aboutHeroVisual from '../assets/images/about_hero_visual.png'
import aboutTeamIndia from '../assets/images/about_team_india.png'
import aboutMissionVisual from '../assets/images/about_mission_visual.png'

// ── Floating stat cards shown in the hero right panel ──────────────────────
const heroStats = [
  { icon: FiUsers,      label: 'Happy Clients',   value: '500+',  color: 'var(--c-green)'  },
  { icon: FiGlobe,      label: 'Countries Served', value: '28+',   color: 'var(--c-indigo)' },
  { icon: FiTrendingUp, label: 'Projects Shipped', value: '1,200+',color: 'var(--c-green)'  },
  { icon: FiCode,       label: 'Lines of Code',    value: '10M+',  color: 'var(--c-indigo)' },
]

function HeroVisualPanel() {
  return (
    <motion.div
      className={styles.heroVisual}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Main illustration */}
      <div className={styles.heroVisualImg}>
        <img src={aboutHeroVisual} alt="CM-eServices team collaboration" />
        <div className={styles.heroVisualOverlay} />
      </div>

      {/* Floating stat badges */}
      {heroStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={styles.statBadge}
          data-index={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ '--badge-accent': stat.color }}
        >
          <span className={styles.statBadgeIcon}>
            <stat.icon size={14} />
          </span>
          <span className={styles.statBadgeValue}>{stat.value}</span>
          <span className={styles.statBadgeLabel}>{stat.label}</span>
        </motion.div>
      ))}

      {/* Animated ring */}
      <div className={styles.heroRing} />
    </motion.div>
  )
}

// ── Testimonial Carousel ─────────────────────────────────────────────────────
function TestimonialSection() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)

  const total = testimonials.length

  const go = (next) => {
    setDir(next > active ? 1 : -1)
    setActive(next)
  }
  const prev = () => go((active - 1 + total) % total)
  const next = () => go((active + 1) % total)

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setActive(a => (a + 1) % total)
    }, 6000)
    return () => clearInterval(t)
  }, [total])

  const variants = {
    enter: (d) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
    exit:  (d) => ({ opacity: 0, x: -d * 60, transition: { duration: 0.35 } }),
  }

  const t = testimonials[active]

  return (
    <section className={styles.testimonialsSection}>
      <AnimatedBlobs className={styles.testimonialBlobs} />
      <div className="container">
        <SectionTitle
          eyebrow="Client stories"
          title="Trusted by businesses worldwide"
          description="Don't take our word for it — here's what our clients say."
        />

        <div className={styles.testimonialWrap}>
          {/* Quote card */}
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIconWrap}>
              <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                <path
                  d="M0 32V19.2C0 13.6 1.6 9.2 4.8 6 8 2.8 12.8 1.06667 19.2 0.799999L20 5.6C16.5333 6.4 13.8667 7.73333 12 9.6 10.2667 11.4667 9.4 13.8667 9.4 16.8H16V32H0ZM24 32V19.2C24 13.6 25.6 9.2 28.8 6 32 2.8 36.8 1.06667 43.2 0.799999L44 5.6C40.5333 6.4 37.8667 7.73333 36 9.6 34.2667 11.4667 33.4 13.8667 33.4 16.8H40V32H24Z"
                  fill="url(#qGrad)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="qGrad" x1="0" y1="0" x2="44" y2="32">
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
                  variants={variants}
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
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.testimonialMeta}
                >
                  <div className={styles.testimonialAvatar}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                  <div className={styles.testimonialStars}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar key={i} size={14} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className={styles.testimonialControls}>
            <button className={styles.testimonialBtn} onClick={prev} aria-label="Previous testimonial">
              <FiChevronLeft size={20} />
            </button>

            <div className={styles.testimonialDots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button className={styles.testimonialBtn} onClick={next} aria-label="Next testimonial">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      {/* ============================= HERO ============================= */}
      <section className={styles.hero}>
        <HeroBackground />

        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroCopy}
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={fadeUp} className={styles.eyebrow}>
              <span className={styles.dot} />
              {heroCopy.eyebrow}
            </motion.span>

            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              Where <span className={styles.gradientText}>innovation</span> meets purpose
            </motion.h1>

            <motion.p variants={fadeUp} className={styles.heroParagraph}>
              {heroCopy.paragraph}
            </motion.p>

            <motion.div variants={fadeUp} className={styles.heroFooter}>
              <span className={styles.badge}>{heroCopy.badge}</span>
              <div className={styles.heroActions}>
                <Button to="/contact" variant="primary" size="lg">
                  Start a project
                </Button>
                <Button to="/services" variant="secondary" size="lg">
                  Explore services
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right-side animated visual panel ── */}
          <HeroVisualPanel />
        </div>

        <div className={styles.marqueeWrap}>
          <Marquee items={marqueeWords} />
        </div>
      </section>

      {/* ============================= PURPOSE TRIAD ============================= */}
      <section className={styles.section}>
        <div className="container">
          <SectionTitle
            eyebrow="Our foundation"
            title="Three principles, one mission"
            description="Everything we build gets measured against the same three things."
          />

          <motion.div
            className={styles.triadGrid}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {purposeTriad.map((item, i) => (
              <InfoCard key={item.title} {...item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================= WHO WE ARE ============================= */}
      <section className={styles.whoSection}>
        <AnimatedBlobs className={styles.whoBlobs} />

        <div className={`container ${styles.whoInner}`}>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionTitle eyebrow={whoWeAre.eyebrow} title={whoWeAre.title} />
            <motion.p variants={fadeUp} className={styles.whoLead}>
              {whoWeAre.paragraph}
            </motion.p>
          </motion.div>

          {/* Who We Are Image */}
          <motion.div
            className={styles.sectionImageWrap}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <img
              src={aboutTeamIndia}
              alt="India's finest digital talent powering global businesses"
              className={styles.sectionImage}
            />
            <div className={styles.sectionImageOverlay} />
            <div className={styles.sectionImageCaption}>
              <span>Powered by India's finest talent — recognized worldwide</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.whoGrid}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {whoWeArePillars.map((item, i) => (
              <InfoCard key={item.title} {...item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================= WHAT WE DO ============================= */}
      <section className={styles.section}>
        <div className="container">
          <SectionTitle
            eyebrow={whatWeDo.eyebrow}
            title={whatWeDo.title}
            description={whatWeDo.description}
          />

          {/* What We Do Image */}
          <motion.div
            className={`${styles.sectionImageWrap} ${styles.sectionImageWrapMission}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <img
              src={aboutMissionVisual}
              alt="Global digital network connecting clients and solutions"
              className={styles.sectionImage}
            />
            <div className={styles.sectionImageOverlay} />
            <div className={styles.sectionImageCaption}>
              <span>A complete digital toolkit — 10 services, one team</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.servicesGrid}
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {whatWeDoServices.map((item, i) => (
              <InfoCard key={item.title} {...item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================= TESTIMONIALS ============================= */}
      <TestimonialSection />

      {/* ============================= CTA ============================= */}
      <CTABanner
        eyebrow="Let's talk"
        title="Ready to build with a global digital powerhouse?"
        description="Tell us about your goals — we'll show you how our team and tools get you there."
      />
    </>
  )
}
