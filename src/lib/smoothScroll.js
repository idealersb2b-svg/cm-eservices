// ============================================================
// Tiny singleton so any component (ScrollToTop, future anchor
// links, etc.) can trigger Lenis-driven scrolling without prop
// drilling or context. Set by SmoothScroll on mount, cleared on
// unmount.
// ============================================================

let instance = null

export function setLenisInstance(lenis) {
  instance = lenis
}

export function getLenisInstance() {
  return instance
}
