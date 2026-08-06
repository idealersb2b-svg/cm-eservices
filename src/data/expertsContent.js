// ============================================================
// OUR EXPERTS PAGE CONTENT
// Replace placeholder images with real webp files when provided.
// ============================================================

import expertDrishya  from '../assets/images/expert_drishya.png'
import expertSahil    from '../assets/images/expert_sahil.png'
import expertUrbijit  from '../assets/images/expert_urbijit.png'

// ── Page hero stats ────────────────────────────────────────────────────────
export const expertStats = [
  { value: '3+',   label: 'Interns'     },
  { value: '12+',  label: 'Projects'    },
  { value: '100%', label: 'Dedication'  },
]

// ── Expert profiles ────────────────────────────────────────────────────────
export const experts = [
  {
    id: 'drishya',
    name: 'Drishya',
    role: 'AI / ML Engineer',
    tagline: 'Turning raw data into intelligent decisions.',
    image: expertDrishya,
    accent: 'green',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Data Science'],
    bio: `Drishya is a passionate AI/ML Engineer with a strong foundation in machine learning, deep learning, and natural language processing. She excels at designing intelligent pipelines that make products smarter — from recommendation engines to computer-vision-powered quality checks. Her work combines rigorous research with practical deployment, ensuring every model goes beyond notebooks and into real-world impact.`,
    projects: [
      {
        title: 'Smart Inventory Forecasting',
        description:
          'Built an LSTM-based demand forecasting model for an e-commerce client, reducing overstock by 34% and improving fill-rate accuracy to 91%.',
        tag: 'ML · Python · TensorFlow',
      },
      {
        title: 'Sentiment Analysis Dashboard',
        description:
          'Developed a real-time social media sentiment pipeline using BERT fine-tuning, helping a brand monitor reputation across 5 platforms simultaneously.',
        tag: 'NLP · HuggingFace · FastAPI',
      },
      {
        title: 'AI-Enabled SEO Content Classifier',
        description:
          'Trained a multi-label text classifier to automatically tag and rank blog content by SEO relevance, cutting editorial review time by 60%.',
        tag: 'NLP · scikit-learn · React',
      },
    ],
    experience: [
      { org: 'CM-eServices (IDEALERS B2B PVT LTD)', period: '2024 – Present', role: 'AI/ML Engineering Intern' },
    ],
    availability: 'Open to collaboration',
    linkedin: '#',
    github:   '#',
  },
  {
    id: 'sahil',
    name: 'Sahil',
    role: 'Full-Stack Web Developer',
    tagline: 'Crafting fast, elegant web experiences end-to-end.',
    image: expertSahil,
    accent: 'indigo',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    bio: `Sahil is a full-stack web developer who thrives at the intersection of beautiful UI and robust backend engineering. He has shipped multiple production-grade web applications — from high-conversion D2C storefronts to complex SaaS dashboards. Sahil brings a developer-first mindset: clean code, strong API design, and a relentless focus on performance and accessibility.`,
    projects: [
      {
        title: 'D2C Storefront — AuraBotanics',
        description:
          'Built a Next.js-powered storefront with a custom headless CMS, Razorpay integration, and 95+ Lighthouse score. Achieved 3× conversion uplift in Q1.',
        tag: 'Next.js · Node.js · Razorpay',
      },
      {
        title: 'Consultancy Booking Platform',
        description:
          'Developed a full-stack SaaS platform for a consultancy firm — real-time booking calendar, client portal, and automated invoice generation.',
        tag: 'React · Express · PostgreSQL',
      },
      {
        title: 'Multi-Vendor Shopify Theme',
        description:
          'Engineered a custom Shopify theme with Liquid templating for a multi-vendor marketplace, improving page speed by 42% over the previous theme.',
        tag: 'Shopify · Liquid · JS',
      },
    ],
    experience: [
      { org: 'CM-eServices (IDEALERS B2B PVT LTD)', period: '2024 – Present', role: 'Full-Stack Developer Intern' },
    ],
    availability: 'Open to collaboration',
    linkedin: '#',
    github:   '#',
  },
  {
    id: 'urbijit',
    name: 'Urbijit',
    role: 'Full-Stack Web Developer & CS Engineer',
    tagline: 'Engineering systems that scale — from whiteboard to production.',
    image: expertUrbijit,
    accent: 'mixed',
    skills: ['React', 'Python', 'Django', 'AWS', 'Docker', 'System Design'],
    bio: `Urbijit brings a computer science engineer's rigour to every project. With a deep understanding of algorithms, system design, and cloud architecture, he architects solutions that don't just work today — they scale for tomorrow. From microservices to monolith migrations, Urbijit is the person teams lean on when complexity meets deadline.`,
    projects: [
      {
        title: 'Cloud-Native BPO Operations Dashboard',
        description:
          'Designed and deployed a real-time operations dashboard on AWS for a BPO client — tracking SLAs, agent performance, and client KPIs across 200+ seats.',
        tag: 'React · Django · AWS ECS',
      },
      {
        title: 'WordPress-to-Headless Migration',
        description:
          'Led the technical migration of a legacy WordPress site to a headless architecture (Next.js + WPGraphQL), reducing TTFB by 58% and improving SEO rankings.',
        tag: 'Next.js · WPGraphQL · Vercel',
      },
      {
        title: 'IT Training Management System',
        description:
          'Built a full-featured LMS for CM-eServices\' IT training vertical — course builder, progress tracking, and certificate generation for 300+ students.',
        tag: 'React · Django · PostgreSQL',
      },
    ],
    experience: [
      { org: 'CM-eServices (IDEALERS B2B PVT LTD)', period: '2024 – Present', role: 'Full-Stack & CS Engineering Intern' },
    ],
    availability: 'Open to collaboration',
    linkedin: '#',
    github:   '#',
  },
]

// ── Case Studies ──────────────────────────────────────────────────────────
export const caseStudies = [
  {
    tag: 'AI · E-Commerce',
    title: 'Demand Forecasting That Saved 34% in Overstock',
    excerpt:
      'A fast-growing online retailer was bleeding margin on overstock. Drishya built an LSTM-based forecasting model that cut excess inventory by 34% and pushed fill-rate accuracy to 91% — live within 8 weeks.',
    outcome: '34% overstock reduction',
    accentColor: 'var(--c-green)',
  },
  {
    tag: 'Web · D2C',
    title: '3× Conversion Lift with a Custom Next.js Storefront',
    excerpt:
      'AuraBotanics needed more than a pretty website. Sahil rebuilt their D2C storefront on Next.js from the ground up — achieving a 95+ Lighthouse score and tripling their conversion rate within the first quarter.',
    outcome: '3× conversion rate',
    accentColor: 'var(--c-indigo)',
  },
  {
    tag: 'Cloud · BPO',
    title: 'Real-Time Operations Dashboard for 200+ BPO Seats',
    excerpt:
      'A BPO client was managing SLAs on spreadsheets. Urbijit architected and deployed a cloud-native dashboard on AWS ECS — giving managers live visibility into agent performance, client KPIs, and SLA health.',
    outcome: '200+ seats. Zero spreadsheets.',
    accentColor: 'var(--c-green)',
  },
]

// ── Expert Testimonials ────────────────────────────────────────────────────
export const expertTestimonials = [
  {
    quote:
      "Drishya's ML pipeline was delivered ahead of schedule and performed better than our benchmarks. She's not just technically sharp — she communicates complex ideas clearly to non-technical stakeholders.",
    name: 'Arjun Nair',
    role: 'CTO, RetailEdge India',
    avatar: 'AN',
    rating: 5,
  },
  {
    quote:
      "Sahil built our entire storefront in 6 weeks. The code quality is exceptional — clean, well-documented, and easy for our in-house team to maintain. Highly recommended for any web project.",
    name: 'Priya Menon',
    role: 'Founder, AuraBotanics',
    avatar: 'PM',
    rating: 5,
  },
  {
    quote:
      "Urbijit redesigned our entire backend architecture while keeping the platform running. That's a rare skill. He delivered a system that's faster, cheaper to run, and ready to scale.",
    name: 'Marcus Becker',
    role: 'COO, TechStream GmbH',
    avatar: 'MB',
    rating: 5,
  },
]
