# CM-eServices — Website Foundation

Production-ready **React + Vite** foundation for the CM-eServices marketing
site: routing, navigation (with nested dropdowns + mobile drawer), footer,
design system, ambient AI-style backgrounds, loading screen, and reusable
components. Page **content** is intentionally left as placeholders — see
`src/components/PagePlaceholder` — ready for you to design section-by-section.

## Stack

- React 18 + Vite 5
- React Router v6
- Framer Motion (all page/menu/scroll animations)
- Lenis (site-wide smooth/inertial scrolling)
- Swiper.js (installed, ready for carousels — not yet used)
- React Icons (Feather + Font Awesome 6 sets)
- SCSS Modules + CSS custom-property design tokens

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## Smooth scroll & performance

`src/components/SmoothScroll/SmoothScroll.jsx` mounts a single Lenis
instance once at the app root (in `App.jsx`, outside the routed page
content) and drives it off `requestAnimationFrame`. Because it's mounted
once rather than per-page, it survives route changes instead of being
torn down and rebuilt on every navigation. It's skipped entirely when
`prefers-reduced-motion` is set. Any component can trigger a Lenis
scroll via `getLenisInstance()` from `src/lib/smoothScroll.js` (see
`ScrollToTop` for an example) — native `window.scrollTo` remains the
fallback.

A few other choices were made specifically to keep scrolling smooth:

- The hero background (`components/Backgrounds/HeroBackground`) is pure
  CSS — a radial gradient + one `transform` keyframe — instead of a
  canvas redrawing every frame. `NeuralNetworkBg` (the canvas/particle
  version) is still available for other pages, but now caps
  `devicePixelRatio` at 1.5 and pauses its render loop via
  `IntersectionObserver` whenever it scrolls out of view.
- Decorative layers (grid, blobs, hero glow) use `contain: paint` (or
  `strict` for the canvas) so their repaints don't force layout work
  elsewhere on the page.
- The glass navbar's `backdrop-filter` blur radius was trimmed — a
  large blur recomputed every frame behind a fixed, scrolling backdrop
  is one of the more expensive things a browser can be asked to do.
- Native `scroll-behavior: smooth` was removed from `global.scss`;
  having it fight Lenis's own scroll physics was part of what made
  scrolling feel like it was catching.

## Design system

All tokens live in `src/styles/_variables.scss` as CSS custom properties:
palette (Leaf Green / Carbon Black / Indigo Blue / White), type scale,
spacing, radii, motion easings and z-index layers. Change a token once and
it cascades everywhere — no hard-coded colors in components.

- **Display font:** Space Grotesk (headings, buttons, nav)
- **Body font:** Inter
- **Mono/eyebrow font:** JetBrains Mono (labels, tags)

## Navigation data

The entire nav — including the nested `Services → IT Services → …` submenu
and the two external links (`Blogs`, `Carbon Consultant`) — is driven by
`src/data/navLinks.js`. Add, remove or reorder items there; `Navbar`,
`NavDropdown` and `MobileDrawer` all read from the same source, so desktop
and mobile stay in sync automatically.

- **Blogs** → external, opens `https://www.carbinnov.com/blogs/`
- **Carbon Consultant** → external, opens `https://www.carbinnov.com/`
- Everything else routes internally via React Router.

## Folder structure

```
src/
  assets/
    images/            # logo + future image assets
  components/
    Navbar/             Sticky glass navbar, dropdown, mobile drawer
    Footer/              Newsletter, quick links, socials
    Buttons/             Universal Button (Link / <a> / <button>)
    SectionTitle/         Eyebrow + heading + description block
    ScrollToTop/          Floating scroll-to-top FAB
    Loader/                Full-screen boot loader
    Backgrounds/           NeuralNetworkBg, GridBg, AnimatedBlobs
    PagePlaceholder/       Shared "content coming soon" block for stub pages
  layouts/
    MainLayout.jsx         Navbar + animated page outlet + Footer + FAB
  pages/                  One file per route (currently placeholders)
  hooks/
    useScrollDirection.js  Hide/show navbar on scroll
    useOnClickOutside.js   Close dropdowns/menus on outside click
    useLockBodyScroll.js   Lock body scroll while drawer is open
  data/
    navLinks.js            Single source of truth for navigation
    services.js             IT Services list (Services page + footer)
    socialLinks.js          Footer social icons
  routes/
    AppRoutes.jsx           Route table
  styles/
    _variables.scss         Design tokens (CSS custom properties)
    _mixins.scss             Breakpoints, glass(), eyebrow(), focus-ring
    global.scss               Reset + base styles
  animations/
    variants.js              Shared Framer Motion variants
  App.jsx                    Boot loader + router mount
  main.jsx                   React entry point
```

## What's built

- ✅ Responsive sticky navbar — glass background on scroll, hides on
  scroll-down / reveals on scroll-up, animated dropdown + nested submenu
  on desktop, animated slide-in drawer with accordions on mobile
- ✅ Footer — newsletter form shell, quick links, IT services list, socials
- ✅ Scroll-to-top button
- ✅ Full-screen loading sequence on first load
- ✅ Route table for all 13 pages (7 top-level + 6 IT Service sub-pages) + 404
- ✅ Reusable Button, SectionTitle, and three ambient AI-style backgrounds
  (neural network canvas, digital grid, animated gradient blobs)
- ✅ Design tokens, global reset, motion variants, custom hooks
- ✅ Site-wide smooth/inertial scrolling (Lenis), tuned for performance
- ✅ Home page — hero, capabilities marquee, services grid, process
  timeline, AI Tools teaser, portfolio teaser, closing CTA

## Next steps

1. Design and build out each page's real sections (swap out
   `<PagePlaceholder />` in `src/pages/*.jsx`).
2. Wire the newsletter form and the Contact page to a real backend/email
   service.
3. Add Swiper carousels where useful (Portfolio, testimonials, logo strip).
4. Add real portfolio/case-study data once available.
