import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  FiMonitor, FiImage, FiFilm, FiYoutube, FiPlay, FiMusic,
  FiExternalLink, FiArrowRight, FiStar, FiEye, FiHeart,
  FiGlobe, FiTrendingUp, FiAward, FiZap,
} from 'react-icons/fi'
import HeroBackground from '../components/Backgrounds/HeroBackground'
import AnimatedBlobs from '../components/Backgrounds/AnimatedBlobs'
import { fadeUp, staggerContainer, easeOutExpo } from '../animations/variants'
import styles from './Portfolio.module.scss'

// ── Data ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'platforms', label: 'Platforms / Websites', icon: FiMonitor, color: '#22c55e', glow: 'rgba(34,197,94,0.35)' },
  { id: 'graphics',  label: 'Graphics',             icon: FiImage,   color: '#5b5ff6', glow: 'rgba(91,95,246,0.35)' },
  { id: 'reels',     label: 'Reels',                icon: FiFilm,    color: '#f43f5e', glow: 'rgba(244,63,94,0.35)'  },
  { id: 'videos',    label: 'Videos',               icon: FiYoutube, color: '#fb923c', glow: 'rgba(251,146,60,0.35)' },
  { id: 'animated',  label: 'Animated Videos',      icon: FiPlay,    color: '#a855f7', glow: 'rgba(168,85,247,0.35)' },
  { id: 'aitunes',   label: 'AI Tunes',             icon: FiMusic,   color: '#06b6d4', glow: 'rgba(6,182,212,0.35)'  },
]

const PLATFORMS = [
  {
    id: 'p1', title: 'TechNova SaaS Platform', category: 'SaaS Dashboard',
    description: 'A scalable cloud management platform for enterprise clients featuring real-time analytics and AI-powered insights.',
    tags: ['React', 'Node.js', 'AWS', 'UI/UX'],
    metrics: { views: '12K', stars: '98', likes: '340' },
    gradient: 'linear-gradient(135deg,#22c55e22,#5b5ff622)',
    accentColor: '#22c55e',
    mockupBg: '#0d1f17',
    icon: FiGlobe,
    url: 'https://cleantech-mart.com/',           // ← replace with real project URL
  },
  {
    id: 'p2', title: 'Artisan E-Commerce Hub', category: 'E-Commerce',
    description: 'Feature-rich marketplace for handcrafted products with advanced search, cart intelligence, and seller analytics.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'PWA'],
    metrics: { views: '8.5K', stars: '91', likes: '280' },
    gradient: 'linear-gradient(135deg,#5b5ff622,#a855f722)',
    accentColor: '#5b5ff6',
    mockupBg: '#12101f',
    icon: FiTrendingUp,
    url: 'https://shopify.com',          // ← replace with real project URL
  },
  {
    id: 'p3', title: 'HealthTrack Pro', category: 'Healthcare App',
    description: 'Patient management portal with HIPAA-compliant data handling, telemedicine integration, and smart scheduling.',
    tags: ['Vue.js', 'Django', 'WebRTC', 'HIPAA'],
    metrics: { views: '6.2K', stars: '95', likes: '210' },
    gradient: 'linear-gradient(135deg,#f43f5e22,#fb923c22)',
    accentColor: '#f43f5e',
    mockupBg: '#1f1015',
    icon: FiAward,
    url: 'https://dribbble.com',         // ← replace with real project URL
  },
  {
    id: 'p4', title: 'LearnSphere LMS', category: 'EdTech Platform',
    description: 'Modern learning management system with gamification, live sessions, and AI-adaptive learning paths.',
    tags: ['React', 'Firebase', 'Socket.io', 'AI'],
    metrics: { views: '15K', stars: '99', likes: '510' },
    gradient: 'linear-gradient(135deg,#06b6d422,#5b5ff622)',
    accentColor: '#06b6d4',
    mockupBg: '#0f1a1f',
    icon: FiZap,
    url: 'https://tailwindcss.com',      // ← replace with real project URL
  },
  {
    id: 'p5', title: 'FinEdge Dashboard', category: 'FinTech',
    description: 'Real-time financial analytics with algorithmic portfolio tracking, crypto integration, and predictive charts.',
    tags: ['React', 'D3.js', 'Python', 'WebSockets'],
    metrics: { views: '9.8K', stars: '97', likes: '375' },
    gradient: 'linear-gradient(135deg,#a855f722,#22c55e22)',
    accentColor: '#a855f7',
    mockupBg: '#1a101f',
    icon: FiTrendingUp,
    url: 'https://stripe.com',           // ← replace with real project URL
  },
  {
    id: 'p6', title: 'RecruitAI Portal', category: 'HR Tech',
    description: 'AI-driven recruitment platform with resume parsing, interview scheduling, and candidate analytics.',
    tags: ['React', 'FastAPI', 'NLP', 'PostgreSQL'],
    metrics: { views: '5.1K', stars: '88', likes: '195' },
    gradient: 'linear-gradient(135deg,#fb923c22,#f43f5e22)',
    accentColor: '#fb923c',
    mockupBg: '#1f1710',
    icon: FiAward,
    url: 'https://linear.app',           // ← replace with real project URL
  },
]

const GRAPHICS = [
  { id: 'g1', title: 'Brand Identity – NovaTech', type: 'Logo & Branding', color: '#22c55e', description: 'Full brand identity with logo, typography system, and style guide.', year: '2024' },
  { id: 'g2', title: 'Social Media Campaign – Bloom', type: 'Social Graphics', color: '#f43f5e', description: 'Instagram & Facebook campaign pack for a lifestyle brand — 30+ templates.', year: '2024' },
  { id: 'g3', title: 'Poster Series – Tech Summit', type: 'Print Design', color: '#5b5ff6', description: 'Event poster series for a 3-day technology summit with 5,000 attendees.', year: '2025' },
  { id: 'g4', title: 'UI Illustrations – Finova', type: 'Digital Illustration', color: '#a855f7', description: 'Custom icon and illustration set for a fintech mobile application.', year: '2025' },
  { id: 'g5', title: 'Packaging Design – OrganicLeaf', type: 'Product Packaging', color: '#06b6d4', description: 'Eco-friendly packaging design for an organic tea brand — 12 SKUs.', year: '2025' },
  { id: 'g6', title: 'Motion Graphics – PromoKit', type: 'Motion Design', color: '#fb923c', description: 'Animated social media templates and brand motion elements.', year: '2026' },
]

const REELS = [
  { id: 'r1', title: 'Product Reveal – CloudSync', platform: 'Instagram Reel', duration: '0:30', views: '42K', color: '#f43f5e', description: 'Dynamic product reveal reel showcasing CloudSync\'s key features.' },
  { id: 'r2', title: 'Behind the Scenes – Studio Day', platform: 'YouTube Shorts', duration: '0:58', views: '28K', color: '#fb923c', description: 'Company culture reel showcasing a creative day at CM-eServices.' },
  { id: 'r3', title: 'Brand Story – EcoChain', platform: 'Instagram Reel', duration: '0:45', views: '35K', color: '#22c55e', description: 'Compelling brand origin story told in 45 seconds with kinetic typography.' },
  { id: 'r4', title: '5 Dev Tips – Fast Code', platform: 'YouTube Shorts', duration: '0:52', views: '61K', color: '#5b5ff6', description: 'Quick coding tips reel that went viral among developer communities.' },
  { id: 'r5', title: 'Fashion Lookbook – Aura', platform: 'Instagram Reel', duration: '0:38', views: '19K', color: '#a855f7', description: 'Cinematic lookbook reel for a fashion startup\'s summer collection.' },
  { id: 'r6', title: 'Event Highlights – TechFest 2025', platform: 'YouTube Shorts', duration: '0:59', views: '47K', color: '#06b6d4', description: 'High-energy event recap capturing all the best moments of TechFest.' },
]

const VIDEOS = [
  { id: 'v1', title: 'AI Revolution: What 2025 Holds', category: 'Tech Documentary', duration: '12:30', views: '124K', color: '#22c55e', description: 'An in-depth exploration of how artificial intelligence is reshaping industries globally.' },
  { id: 'v2', title: 'Building a SaaS from Scratch', category: 'Tutorial Series', duration: '45:10', views: '87K', color: '#5b5ff6', description: 'Complete walkthrough of building a SaaS product from idea to production launch.' },
  { id: 'v3', title: 'Design Thinking Masterclass', category: 'Educational', duration: '28:50', views: '63K', color: '#fb923c', description: 'Deep-dive into design thinking principles with real-world case studies.' },
  { id: 'v4', title: 'CM-eServices Company Story', category: 'Brand Video', duration: '6:45', views: '41K', color: '#f43f5e', description: 'Cinematic brand documentary about CM-eServices\' journey and mission.' },
  { id: 'v5', title: 'Web3 & Blockchain Explained', category: 'Tech Explainer', duration: '18:22', views: '95K', color: '#a855f7', description: 'Breaking down Web3 concepts for developers and business leaders.' },
  { id: 'v6', title: 'The Future of Remote Work', category: 'Business Insight', duration: '22:15', views: '78K', color: '#06b6d4', description: 'Expert panel discussion on remote work culture, tools, and future trends.' },
]

const ANIMATED = [
  { id: 'a1', title: 'How AI Learns – Explained', style: '2D Animation', duration: '5:20', views: '210K', color: '#5b5ff6', description: 'A fun, accessible cartoon explaining how machine learning models are trained.' },
  { id: 'a2', title: 'The Digital World Journey', style: '3D Motion', duration: '8:45', views: '156K', color: '#22c55e', description: 'A stunning 3D animated journey through the evolution of the internet.' },
  { id: 'a3', title: 'CyberSafe Kids – Episode 1', style: 'Character Animation', duration: '11:30', views: '342K', color: '#f43f5e', description: 'Child-friendly animated series teaching online safety fundamentals.' },
  { id: 'a4', title: 'FinanceBot Explains Taxes', style: '2D Explainer', duration: '6:15', views: '98K', color: '#fb923c', description: 'A charming animated character explains tax concepts in simple terms.' },
  { id: 'a5', title: 'Space Data Visualization', style: '3D Data Viz', duration: '4:50', views: '183K', color: '#a855f7', description: 'Breathtaking 3D animation of planetary data and astronomical phenomena.' },
  { id: 'a6', title: 'Brand World – NovaTech', style: 'Motion Branding', duration: '3:30', views: '67K', color: '#06b6d4', description: 'An animated brand world showcasing NovaTech\'s identity in motion.' },
]

const AI_TUNES = [
  { id: 't1', title: 'Digital Horizons', genre: 'Electronic / Ambient', duration: '4:32', plays: '85K', color: '#06b6d4', description: 'Futuristic ambient track composed entirely by AI, reflecting the digital age.' },
  { id: 't2', title: 'Neural Pulse', genre: 'Synthwave / Retro', duration: '3:58', plays: '142K', color: '#5b5ff6', description: 'A pulsating synthwave journey through cybernetic soundscapes.' },
  { id: 't3', title: 'Leaf & Circuit', genre: 'Lo-fi / Chill', duration: '5:14', plays: '231K', color: '#22c55e', description: 'Calming lo-fi beats blending natural sounds with electronic textures.' },
  { id: 't4', title: 'Binary Sunset', genre: 'Orchestral / Cinematic', duration: '6:20', plays: '93K', color: '#a855f7', description: 'Epic orchestral piece generated for a tech startup\'s brand film.' },
  { id: 't5', title: 'Code Rain', genre: 'Drum & Bass', duration: '4:05', plays: '178K', color: '#f43f5e', description: 'High-energy D&B track inspired by hacker culture and matrix aesthetics.' },
  { id: 't6', title: 'Morning Algorithm', genre: 'Jazz / AI Fusion', duration: '5:48', plays: '64K', color: '#fb923c', description: 'AI-generated jazz with improvisation patterns trained on Miles Davis.' },
]

// ── Floating 3D Orbs (decorative) ────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className={styles.orbsLayer} aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.orb}
          style={{ '--i': i }}
          animate={{
            y: [0, -30 - i * 8, 10, 0],
            x: [0, 15 - i * 5, -10, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 8 + i * 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  )
}

// ── 3D Tilt Card wrapper ──────────────────────────────────────────────────────
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.tiltCard} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// ── Tab Navigation ────────────────────────────────────────────────────────────
function PortfolioNav({ active, onChange }) {
  const indicatorRef = useRef(null)
  const navRef = useRef(null)
  const btnRefs = useRef([])

  useEffect(() => {
    const idx = TABS.findIndex(t => t.id === active)
    const btn = btnRefs.current[idx]
    const indicator = indicatorRef.current
    if (!btn || !indicator || !navRef.current) return
    const navRect = navRef.current.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    indicator.style.width = `${btnRect.width}px`
    indicator.style.transform = `translateX(${btnRect.left - navRect.left}px)`
  }, [active])

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.portfolioNav} ref={navRef} role="tablist" aria-label="Portfolio categories">
        <div
          className={styles.navIndicator}
          ref={indicatorRef}
          style={{ '--tab-color': TABS.find(t => t.id === active)?.color }}
        />
        {TABS.map((tab, i) => {
          const Icon = tab.icon
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              ref={el => (btnRefs.current[i] = el)}
              className={`${styles.navTab} ${isActive ? styles.navTabActive : ''}`}
              onClick={() => onChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              id={`portfolio-tab-${tab.id}`}
              style={{ '--tab-color': tab.color, '--tab-glow': tab.glow }}
            >
              <Icon size={16} className={styles.navTabIcon} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// ── Browser Mockup with iframe ────────────────────────────────────────────────
function BrowserMockup({ url, accentColor, mockupBg }) {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={styles.platformMockup}
      style={{ background: mockupBg }}
    >
      {/* Window chrome */}
      <div className={styles.mockupBar}>
        <span /><span /><span />
        <div className={styles.mockupUrlBar}>
          <span className={styles.mockupUrlDot} style={{ background: accentColor }} />
          <span className={styles.mockupUrlText}>{url.replace('https://', '')}</span>
        </div>
      </div>

      {/* Screen area */}
      <div
        className={styles.mockupScreen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Loading shimmer */}
        {!loaded && (
          <div className={styles.iframeShimmer}>
            <div className={styles.shimmerBar} style={{ width: '100%', height: 28 }} />
            <div className={styles.shimmerContent}>
              <div className={styles.shimmerLine} style={{ width: '60%', background: accentColor + '33' }} />
              <div className={styles.shimmerLine} style={{ width: '85%' }} />
              <div className={styles.shimmerLine} style={{ width: '70%' }} />
              <div className={styles.shimmerGrid}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={styles.shimmerCard} style={{ borderColor: accentColor + '22' }} />
                ))}
              </div>
            </div>
            <div className={styles.shimmerPulse} />
          </div>
        )}

        {/* Live iframe */}
        <iframe
          src={url}
          title={`Website preview: ${url}`}
          className={styles.mockupIframe}
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          tabIndex={-1}
        />

        {/* Overlay — blocks pointer events so 3D tilt works;
            becomes transparent on hover so user can actually see the site */}
        <div
          className={styles.iframeOverlay}
          style={{
            opacity: hovered ? 0 : 1,
            background: `linear-gradient(to bottom, transparent 60%, ${mockupBg}ee 100%)`,
            pointerEvents: hovered ? 'none' : 'all',
          }}
        />

        {/* "Hover to explore" hint */}
        <div className={styles.iframeHint} style={{ opacity: hovered ? 1 : 0, borderColor: accentColor + '55' }}>
          <span style={{ color: accentColor }}>🖱 Scroll to explore</span>
        </div>
      </div>
    </div>
  )
}

// ── Platform Card ─────────────────────────────────────────────────────────────
function PlatformCard({ item, index }) {
  return (
    <motion.div variants={fadeUp} custom={index} className={styles.itemWrapper}>
      <TiltCard>
        <article
          className={styles.platformCard}
          style={{ '--card-gradient': item.gradient, '--card-accent': item.accentColor, background: item.mockupBg }}
        >
          <BrowserMockup url={item.url} accentColor={item.accentColor} mockupBg={item.mockupBg} />

          <div className={styles.platformInfo}>
            <span className={styles.cardCategory} style={{ color: item.accentColor }}>{item.category}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>

            <div className={styles.cardTags}>
              {item.tags.map(tag => (
                <span key={tag} className={styles.tag} style={{ borderColor: item.accentColor + '44', color: item.accentColor }}>{tag}</span>
              ))}
            </div>

            <div className={styles.cardMetrics}>
              <span><FiEye size={12} /> {item.metrics.views}</span>
              <span><FiStar size={12} /> {item.metrics.stars}</span>
              <span><FiHeart size={12} /> {item.metrics.likes}</span>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardBtn}
              style={{ '--btn-color': item.accentColor }}
            >
              View Project <FiExternalLink size={13} />
            </a>
          </div>

          <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 70% 30%, ${item.accentColor}22, transparent 60%)` }} />
        </article>
      </TiltCard>
    </motion.div>
  )
}

// ── Graphic Card ──────────────────────────────────────────────────────────────
function GraphicCard({ item, index }) {
  return (
    <motion.div variants={fadeUp} custom={index} className={styles.itemWrapper}>
      <TiltCard>
        <article className={styles.graphicCard} style={{ '--card-accent': item.color }}>
          <div className={styles.graphicCanvas}>
            <div className={styles.graphicShape} style={{ '--shape-color': item.color }} />
            <div className={styles.graphicShape2} style={{ '--shape-color': item.color }} />
            <div className={styles.graphicShape3} style={{ '--shape-color': item.color }} />
            <span className={styles.graphicTypeLabel} style={{ background: item.color + '22', color: item.color, borderColor: item.color + '44' }}>
              {item.type}
            </span>
          </div>
          <div className={styles.graphicInfo}>
            <span className={styles.graphicYear}>{item.year}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
            <button className={styles.cardBtn} style={{ '--btn-color': item.color }}>
              View Work <FiArrowRight size={13} />
            </button>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  )
}

// ── Reel / Video Card ─────────────────────────────────────────────────────────
function MediaCard({ item, index, showViews = true, metricLabel = 'views', metricKey = 'views' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div variants={fadeUp} custom={index} className={styles.itemWrapper}>
      <TiltCard>
        <article
          className={styles.mediaCard}
          style={{ '--card-accent': item.color }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className={styles.mediaThumb}>
            <div className={styles.thumbBg} style={{ background: `radial-gradient(circle at 30% 30%, ${item.color}44, ${item.color}11 70%)` }} />
            <div className={styles.thumbLines}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.thumbLine} style={{ '--i': i, borderColor: item.color + '22' }} />
              ))}
            </div>
            <motion.div
              className={styles.playBtn}
              animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
              style={{ borderColor: item.color, boxShadow: `0 0 24px ${item.color}55` }}
            >
              <FiPlay size={22} style={{ color: item.color }} />
            </motion.div>
            <span className={styles.mediaDuration} style={{ background: item.color + '22', color: item.color }}>
              {item.duration}
            </span>
          </div>

          <div className={styles.mediaInfo}>
            <span className={styles.cardCategory} style={{ color: item.color }}>
              {item.platform || item.category || item.style || item.genre}
            </span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
            <div className={styles.mediaMeta}>
              <span style={{ color: item.color }}><FiEye size={13} /> {item[metricKey] || item.views || item.plays}</span>
              <span className={styles.metricLabel}>{metricLabel}</span>
            </div>
            <button className={styles.cardBtn} style={{ '--btn-color': item.color }}>
              Watch Now <FiPlay size={13} />
            </button>
          </div>
          <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}18, transparent 60%)` }} />
        </article>
      </TiltCard>
    </motion.div>
  )
}

// ── AI Tune Card ──────────────────────────────────────────────────────────────
function TuneCard({ item, index }) {
  const [playing, setPlaying] = useState(false)

  return (
    <motion.div variants={fadeUp} custom={index} className={styles.itemWrapper}>
      <TiltCard>
        <article className={styles.tuneCard} style={{ '--card-accent': item.color }}>
          <div className={styles.tuneVinyl}>
            <motion.div
              className={styles.vinyl}
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', pause: !playing }}
              style={{ borderColor: item.color + '66', boxShadow: playing ? `0 0 40px ${item.color}44` : 'none' }}
            >
              <div className={styles.vinylInner} style={{ background: `conic-gradient(${item.color}22, transparent, ${item.color}11, transparent, ${item.color}22)` }} />
              <div className={styles.vinylLabel} style={{ background: item.color + '22', borderColor: item.color + '55' }}>
                <FiMusic size={14} style={{ color: item.color }} />
              </div>
            </motion.div>

            <div className={styles.waveform} aria-hidden="true">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.waveBar}
                  style={{ '--bar-color': item.color }}
                  animate={playing ? {
                    height: [`${20 + Math.random() * 60}%`, `${10 + Math.random() * 80}%`, `${20 + Math.random() * 60}%`],
                  } : { height: '30%' }}
                  transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>

          <div className={styles.tuneInfo}>
            <span className={styles.cardCategory} style={{ color: item.color }}>{item.genre}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
            <div className={styles.tuneMeta}>
              <span style={{ color: 'var(--c-white-faint)' }}>{item.duration}</span>
              <span style={{ color: item.color }}><FiPlay size={11} /> {item.plays} plays</span>
            </div>
            <button
              className={styles.tunePlayBtn}
              style={{ '--btn-color': item.color, background: playing ? item.color + '22' : 'transparent' }}
              onClick={() => setPlaying(p => !p)}
            >
              {playing ? '⏸ Pause' : '▶ Play Sample'}
            </button>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  )
}

// ── Stats Row ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '6', label: 'Creative Domains' },
  { value: '5★', label: 'Average Rating' },
]

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('platforms')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const activeTabData = TABS.find(t => t.id === activeTab)

  const tabContent = {
    platforms: PLATFORMS.map((item, i) => <PlatformCard key={item.id} item={item} index={i} />),
    graphics:  GRAPHICS.map((item, i)  => <GraphicCard  key={item.id} item={item} index={i} />),
    reels:     REELS.map((item, i)     => <MediaCard    key={item.id} item={item} index={i} metricLabel="views" metricKey="views" />),
    videos:    VIDEOS.map((item, i)    => <MediaCard    key={item.id} item={item} index={i} metricLabel="views" metricKey="views" />),
    animated:  ANIMATED.map((item, i)  => <MediaCard    key={item.id} item={item} index={i} metricLabel="views" metricKey="views" />),
    aitunes:   AI_TUNES.map((item, i)  => <TuneCard     key={item.id} item={item} index={i} />),
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className={styles.hero} ref={heroRef}>
        <HeroBackground />
        <FloatingOrbs />

        <motion.div className={styles.heroParallax} style={{ y: heroY, opacity: heroOpacity }}>
          <div className={`container ${styles.heroInner}`}>
            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              animate="visible"
              className={styles.heroCopy}
            >
              <motion.span variants={fadeUp} className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                Selected Work · CM-eServices
              </motion.span>

              <motion.h1 variants={fadeUp} className={styles.heroTitle}>
                Where{' '}
                <span className={styles.gradientText}>Creativity</span>
                {' '}meets{' '}
                <span className={styles.gradientText2}>Technology</span>
              </motion.h1>

              <motion.p variants={fadeUp} className={styles.heroParagraph}>
                Explore our portfolio across platforms, graphics, video production,
                animated storytelling, and AI-generated music.
              </motion.p>

              <motion.div variants={fadeUp} className={styles.heroStats}>
                {STATS.map(stat => (
                  <div key={stat.label} className={styles.heroStat}>
                    <span className={styles.heroStatValue}>{stat.value}</span>
                    <span className={styles.heroStatLabel}>{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* 3D floating scene */}
            <motion.div
              className={styles.heroScene}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: easeOutExpo }}
            >
              <div className={styles.scene3D}>
                {TABS.map((tab, i) => {
                  const Icon = tab.icon
                  return (
                    <motion.div
                      key={tab.id}
                      className={styles.sceneCard}
                      style={{ '--tab-color': tab.color, '--tab-glow': tab.glow, '--i': i }}
                      animate={{
                        y: [0, -8 - i * 3, 4, 0],
                        rotateX: [0, 2, -1, 0],
                        rotateZ: [0, 0.5, -0.5, 0],
                      }}
                      transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                      whileHover={{ scale: 1.06, zIndex: 10 }}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className={styles.heroGradientBar} />
      </section>

      {/* ── PORTFOLIO TABS & CONTENT ───────────────────────────────────── */}
      <section className={styles.portfolioSection} id="portfolio-content">
        <AnimatedBlobs />
        <div className={styles.portfolioInner}>
          <PortfolioNav active={activeTab} onChange={setActiveTab} />

          {/* Tab header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`header-${activeTab}`}
              className={styles.tabHeader}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            >
              <div className={styles.tabHeaderIcon} style={{ '--icon-color': activeTabData?.color, '--icon-glow': activeTabData?.glow }}>
                {activeTabData && <activeTabData.icon size={28} />}
              </div>
              <div>
                <h2 className={styles.tabHeaderTitle} style={{ '--title-color': activeTabData?.color }}>
                  {activeTabData?.label}
                </h2>
                <p className={styles.tabHeaderSub}>
                  {activeTab === 'platforms' && 'Web platforms, dashboards, and digital products we\'ve engineered.'}
                  {activeTab === 'graphics' && 'Brand identities, illustrations, and visual assets we\'ve designed.'}
                  {activeTab === 'reels' && 'Short-form video content for Instagram and YouTube Shorts.'}
                  {activeTab === 'videos' && 'Long-form YouTube videos — documentaries, tutorials, and brand films.'}
                  {activeTab === 'animated' && 'Cartoon and motion animation projects for brands and education.'}
                  {activeTab === 'aitunes' && 'AI-generated music compositions available on Spotify.'}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={styles.portfolioGrid}
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <AnimatedBlobs />
        <div className={`container ${styles.ctaInner}`}>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.span variants={fadeUp} className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Ready to work together?
            </motion.span>
            <motion.h2 variants={fadeUp} className={styles.ctaTitle}>
              Let's build something{' '}
              <span className={styles.gradientText}>extraordinary</span>
            </motion.h2>
            <motion.p variants={fadeUp} className={styles.ctaDesc}>
              From websites to AI music — our team delivers across every creative domain.
              Tell us your vision, and we'll bring it to life.
            </motion.p>
            <motion.div variants={fadeUp} className={styles.ctaActions}>
              <a href="/contact" className={styles.ctaPrimary} id="portfolio-cta-contact">
                Start a Project <FiArrowRight size={16} />
              </a>
              <a href="mailto:hello@cm-eservices.com" className={styles.ctaSecondary} id="portfolio-cta-email">
                hello@cm-eservices.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
