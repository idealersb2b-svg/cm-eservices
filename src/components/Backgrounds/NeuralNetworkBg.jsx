import { useEffect, useRef } from 'react'
import styles from './Backgrounds.module.scss'

/**
 * Canvas-based neural-network ambient background.
 * Draws slow-drifting nodes connected by faint lines when close together —
 * a subtle "AI-powered" cue rather than a literal diagram.
 *
 * Performance notes (this was the main source of scroll jank when it
 * sat behind the Home hero, so it's kept careful even though Home no
 * longer uses it):
 * - devicePixelRatio is capped at 1.5 — retina screens don't need a
 *   4x-area canvas for a blurred ambient effect, and the uncapped
 *   version was pushing real GPU/CPU cost every frame.
 * - An IntersectionObserver pauses the rAF loop entirely once the
 *   canvas scrolls out of view, instead of drawing an invisible
 *   frame 60 times a second for the rest of the session.
 * - Resize is debounced instead of re-initializing on every pixel
 *   of a drag-resize.
 *
 * Respects prefers-reduced-motion by rendering a single static frame.
 */
export default function NeuralNetworkBg({ density = 55, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let width, height, nodes, rafId, resizeTimeout
    let isVisible = true

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const colors = {
      node: 'rgba(34, 197, 94, 0.55)',
      nodeAlt: 'rgba(91, 95, 246, 0.5)',
      line: 'rgba(247, 248, 250, 0.06)',
    }

    function resize() {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      const count = Math.round((width * height) / (16000 / density))
      nodes = Array.from({ length: Math.max(24, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.6,
        alt: Math.random() > 0.75,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.strokeStyle = colors.line
            ctx.lineWidth = 1
            ctx.globalAlpha = 1 - dist / 140
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      for (const n of nodes) {
        ctx.beginPath()
        ctx.fillStyle = n.alt ? colors.nodeAlt : colors.node
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function step() {
      if (!isVisible) {
        rafId = null
        return
      }
      draw()
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(step)
      } else {
        rafId = null
      }
    }

    function ensureRunning() {
      if (isVisible && rafId == null) {
        rafId = requestAnimationFrame(step)
      }
    }

    resize()
    init()
    draw()
    if (!prefersReducedMotion) rafId = requestAnimationFrame(step)

    const onResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resize()
        init()
        draw()
      }, 150)
    }
    window.addEventListener('resize', onResize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) ensureRunning()
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimeout)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvasLayer} ${className}`}
      aria-hidden="true"
    />
  )
}
