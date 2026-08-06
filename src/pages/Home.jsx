import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCpu } from 'react-icons/fi'
import HeroBackground from '../components/Backgrounds/HeroBackground'
import Marquee from '../components/Marquee/Marquee'
import Button from '../components/Buttons/Button'
import SectionTitle from '../components/SectionTitle/SectionTitle'
import StatCounter from '../components/StatCounter/StatCounter'
import ServiceCard from '../components/ServiceCard/ServiceCard'
import PortfolioCard from '../components/PortfolioCard/PortfolioCard'
import CTABanner from '../components/CTABanner/CTABanner'
import { services } from '../data/services'
import {
  heroStats,
  capabilities,
  processSteps,
  featuredWork,
  aiHighlights,
} from '../data/homeContent'
import { fadeUp, staggerContainer } from '../animations/variants'
import styles from './Home.module.scss'

export default function Home() {
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
            <motion.span variants={fadeUp} className={styles.heroEyebrow}>
              <span className={styles.dot} />
              CM-eServices · Digital Engineering Studio
            </motion.span>

            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              We build the digital
              <br />
              infrastructure ambitious
              <br />
              companies <span className={styles.gradientText}>run on</span>.
            </motion.h1>

            <motion.p variants={fadeUp} className={styles.heroSubtitle}>
              Web platforms, brand systems and AI-powered tooling — designed,
              built and supported by one team, end to end.
            </motion.p>

            <motion.div variants={fadeUp} className={styles.heroActions}>
              <Button to="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <Button to="/services" variant="secondary" size="lg">
                Explore services
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.hud}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.hudHeader}>
              <FiCpu />
              <span>Studio metrics</span>
              <span className={styles.hudPulse} />
            </div>
            <div className={styles.hudGrid}>
              {heroStats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className={styles.marqueeWrap}>
          <Marquee items={capabilities} />
        </div>
      </section>

      {/* ============================= SERVICES ============================= */}
      <section className={styles.section}>
        <div className="container">
          <SectionTitle
            eyebrow="What we do"
            title="Every capability a growing company needs"
            description="Six connected service lines — pick one, or let us run the whole stack."
          />

          <motion.div
            className={styles.servicesGrid}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================= PROCESS ============================= */}
      <section className={styles.section}>
        <div className="container">
          <SectionTitle
            eyebrow="How we work"
            title="A process built for momentum"
            description="Five stages, one team accountable for all of them — from first call to ongoing growth."
          />

          <motion.div
            className={styles.processGrid}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUp} className={styles.processCard}>
                <span className={styles.processNumber}>{step.step}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================= AI TOOLS TEASER ============================= */}
      <section className={styles.section}>
        <div className={`container ${styles.aiSplit}`}>
          <motion.div
            className={styles.aiCopy}
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span variants={fadeUp} className={styles.heroEyebrow}>
              <span className={styles.dot} />
              AI Tools
            </motion.span>
            <motion.h2 variants={fadeUp} className={styles.aiTitle}>
              AI, wired into the work — not bolted on after
            </motion.h2>
            <motion.p variants={fadeUp} className={styles.heroSubtitle}>
              We build the same AI tooling for clients that we use ourselves —
              practical, production-grade, and tied to real outcomes.
            </motion.p>

            <motion.ul variants={staggerContainer(0.08)} className={styles.aiList}>
              {aiHighlights.map((item) => (
                <motion.li key={item.title} variants={fadeUp} className={styles.aiItem}>
                  <span className={styles.aiItemTitle}>{item.title}</span>
                  <span className={styles.aiItemDesc}>{item.description}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <Button to="/ai-tools" variant="secondary">
                See AI Tools
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.consolePanel}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.consoleHeader}>
              <span className={styles.consoleDotRed} />
              <span className={styles.consoleDotYellow} />
              <span className={styles.consoleDotGreen} />
              <span className={styles.consoleLabel}>ai-console.log</span>
            </div>
            <div className={styles.consoleBody}>
              <p><span className={styles.consolePrompt}>$</span> analyzing content brief…</p>
              <p><span className={styles.consolePrompt}>$</span> generating SEO outline… <span className={styles.consoleOk}>done</span></p>
              <p><span className={styles.consolePrompt}>$</span> drafting response templates…</p>
              <p><span className={styles.consolePrompt}>$</span> routing support ticket → team <span className={styles.consoleOk}>ok</span></p>
              <p className={styles.consoleCursor}><span className={styles.consolePrompt}>$</span> <span className={styles.blink}>_</span></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================= PORTFOLIO TEASER ============================= */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.portfolioHeader}>
            <SectionTitle
              eyebrow="Selected work"
              title="Recent builds"
              description="A few of the platforms and products we've shipped end to end."
            />
            <Button to="/portfolio" variant="ghost" className={styles.portfolioAllLink}>
              View all work
            </Button>
          </div>

          <motion.div
            className={styles.portfolioGrid}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {featuredWork.map((item) => (
              <PortfolioCard key={item.title} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <CTABanner />
    </>
  )
}
