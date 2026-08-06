// ============================================================
// REUSABLE FRAMER MOTION VARIANTS
// Centralized so every component shares the same motion language.
// ============================================================

export const easeOutExpo = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

export const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98, pointerEvents: 'none' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: 'auto',
    transition: { duration: 0.25, ease: easeOutExpo },
  },
}

export const submenuVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: easeOutExpo },
  },
}

export const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease: easeOutExpo },
  },
}

export const drawerItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOutExpo } },
}

export const navbarVariants = {
  visible: { y: 0, transition: { duration: 0.35, ease: easeOutExpo } },
  hidden: { y: '-100%', transition: { duration: 0.35, ease: easeOutExpo } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.35, ease: easeOutExpo },
  },
}
