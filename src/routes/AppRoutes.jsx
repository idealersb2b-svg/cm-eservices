import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import OurExperts from '../pages/OurExperts'
import WebDevelopment from '../pages/WebDevelopment'
import GraphicDesigning from '../pages/GraphicDesigning'
import SEOContentWriting from '../pages/SEOContentWriting'
import SocialMediaManagement from '../pages/SocialMediaManagement'
import BPOServices from '../pages/BPOServices'
import ITBodyShopping from '../pages/ITBodyShopping'
import AITools from '../pages/AITools'
import Portfolio from '../pages/Portfolio'
import Contact from '../pages/Contact'
import Pricing from '../pages/Pricing'
import NotFound from '../pages/NotFound'

/**
 * Central route table. Blog and Carbon Consultant are intentionally
 * absent — they are external links wired directly into the Navbar/Footer
 * data (see src/data/navLinks.js) and never render inside this app.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/our-experts" element={<OurExperts />} />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route path="/services/graphic-designing" element={<GraphicDesigning />} />
        <Route path="/services/seo-content-writing" element={<SEOContentWriting />} />
        <Route path="/services/social-media-management" element={<SocialMediaManagement />} />
        <Route path="/services/bpo-services" element={<BPOServices />} />
        <Route path="/services/it-body-shopping" element={<ITBodyShopping />} />

        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
