import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GridBg from '../components/Backgrounds/GridBg'
import AnimatedBlobs from '../components/Backgrounds/AnimatedBlobs'
import Button from '../components/Buttons/Button'
import { fadeUp, staggerContainer } from '../animations/variants'
import styles from './NotFound.module.scss'

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <GridBg />
      <AnimatedBlobs />
      <motion.div
        className={`container ${styles.content}`}
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={fadeUp} className={styles.code}>
          404
        </motion.span>
        <motion.h1 variants={fadeUp} className={styles.title}>
          This page hasn't been built yet
        </motion.h1>
        <motion.p variants={fadeUp} className={styles.desc}>
          The link might be broken, or the page moved. Let's get you back on track.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Button to="/" variant="primary">Back to home</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
