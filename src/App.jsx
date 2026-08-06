import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Loader from './components/Loader/Loader'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'

/**
 * Root component: boots the loading screen, then mounts the router.
 * Loader controls its own timing (synced to its code-typing animation)
 * and calls onComplete once it's done — swap that internal timing for
 * real asset/data readiness once pages fetch real content.
 */
export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <SmoothScroll />
      <Loader visible={loading} onComplete={() => setLoading(false)} />
      <AppRoutes />
    </BrowserRouter>
  )
}
