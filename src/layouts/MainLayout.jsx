import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { pageTransition } from '../animations/variants'
import styles from './MainLayout.module.scss'

/**
 * App shell shared by every route: navbar + animated page outlet + footer.
 * The AnimatePresence/motion wrapper gives each page a soft fade/slide
 * transition on route change.
 */
export default function MainLayout() {
  const location = useLocation()

  return (
    <div className={styles.shell}>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className={styles.main}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
