// ============================================================
// PRIMARY NAVIGATION DATA
// Supports: plain links, external links, dropdowns, and nested submenus.
// ============================================================

export const navLinks = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      {
        label: 'Carbon Consultant',
        external: true,
        href: 'https://www.carbinnov.com/',
        description: 'Sustainability & carbon advisory',
      },
      {
        label: 'Our Experts',
        path: '/services/our-experts',
        description: 'Meet the team behind the work',
      },
      {
        label: 'IT Services',
        description: 'End-to-end technology delivery',
        submenu: [
          { label: 'Web Development', path: '/services/web-development' },
          { label: 'Graphic Designing', path: '/services/graphic-designing' },
          { label: 'SEO & Content Writing', path: '/services/seo-content-writing' },
          { label: 'Social Media Management', path: '/services/social-media-management' },
          { label: 'BPO Services', path: '/services/bpo-services' },
          { label: 'IT Body Shopping', path: '/services/it-body-shopping' },
        ],
      },
    ],
  },
  {
    label: 'AI Tools',
    path: '/ai-tools',
  },
  {
    label: 'Portfolio',
    path: '/portfolio',
  },
  {
    label: 'Blogs',
    external: true,
    href: 'https://www.carbinnov.com/blogs/',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
  {
    label: 'Pricing',
    path: '/pricing',
  },
]
