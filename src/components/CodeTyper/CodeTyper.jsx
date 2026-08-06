import { useEffect, useState } from 'react'
import styles from './CodeTyper.module.scss'

/**
 * Mock code editor that types out a list of lines character-by-character,
 * one line at a time, with a blinking cursor on the active line.
 *
 * Driven by real timers (not CSS steps()) so the reveal speed is exact
 * and identical across browsers — the Loader syncs its progress bar to
 * the same `charMs` / `linePauseMs` values so both finish together.
 *
 * Calls `onDone` once the final character of the final line has typed.
 */
export default function CodeTyper({ lines, charMs = 26, linePauseMs = 180, onDone }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= lines.length) {
      onDone?.()
      return undefined
    }

    const currentLine = lines[lineIndex]

    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), charMs)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setLineIndex((l) => l + 1)
      setCharIndex(0)
    }, linePauseMs)
    return () => clearTimeout(timer)
  }, [lineIndex, charIndex, lines, charMs, linePauseMs, onDone])

  const linesToShow = lines.slice(0, Math.min(lineIndex + 1, lines.length))

  return (
    <div className={styles.editor} aria-hidden="true">
      <div className={styles.editorHeader}>
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
        <span className={styles.fileName}>build.js</span>
      </div>

      <div className={styles.editorBody}>
        {linesToShow.map((line, i) => {
          const isActive = i === lineIndex && i < lines.length
          const text = isActive ? line.slice(0, charIndex) : line
          return (
            <div className={styles.line} key={i}>
              <span className={styles.lineNumber}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.code}>{text}</span>
              {isActive && <span className={styles.cursor} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
