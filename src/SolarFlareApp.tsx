import { useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ScrollToTop from './components/ScrollToTop'
import SplashScreen from './components/SplashScreen'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import TeamsPage from './pages/TeamsPage'
import TeamDetailPage from './pages/TeamDetailPage'
import RosterPage from './pages/RosterPage'
import PlayerProfilePage from './pages/PlayerProfilePage'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'
import PartnersPage from './pages/PartnersPage'
import ShopPage from './pages/ShopPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import FlameSocietyPage from './pages/FlameSocietyPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import CookiePolicyPage from './pages/CookiePolicyPage'
import AccessibilityPage from './pages/AccessibilityPage'
import MatchTrackerPage from './pages/MatchTrackerPage'
import NotFoundPage from './pages/NotFoundPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/teams"         element={<PageTransition><TeamsPage /></PageTransition>} />
        <Route path="/teams/:id"     element={<PageTransition><TeamDetailPage /></PageTransition>} />
        <Route path="/roster"        element={<PageTransition><RosterPage /></PageTransition>} />
        <Route path="/roster/:id"    element={<PageTransition><PlayerProfilePage /></PageTransition>} />
        <Route path="/news"          element={<PageTransition><NewsPage /></PageTransition>} />
        <Route path="/news/:id"      element={<PageTransition><NewsArticlePage /></PageTransition>} />
        <Route path="/partners"      element={<PageTransition><PartnersPage /></PageTransition>} />
        <Route path="/shop"          element={<PageTransition><ShopPage /></PageTransition>} />
        <Route path="/careers"       element={<PageTransition><CareersPage /></PageTransition>} />
        <Route path="/contact"       element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/flame-society" element={<PageTransition><FlameSocietyPage /></PageTransition>} />
        <Route path="/about"         element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/gallery"       element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/privacy"       element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
        <Route path="/terms"         element={<PageTransition><TermsPage /></PageTransition>} />
        <Route path="/cookies"       element={<PageTransition><CookiePolicyPage /></PageTransition>} />
        <Route path="/accessibility" element={<PageTransition><AccessibilityPage /></PageTransition>} />
        <Route path="/matches"       element={<PageTransition><MatchTrackerPage /></PageTransition>} />
        <Route path="*"              element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('sf_splash') === 'done'
  )

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('sf_splash', 'done')
    setSplashDone(true)
  }, [])

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        className="bg-sf-darker text-sf-text font-body min-h-screen"
        style={{
          opacity:    splashDone ? 1 : 0,
          transition: splashDone ? 'opacity 0.4s ease' : 'none',
        }}
      >
        <Navbar />
        <AnimatedRoutes />
        <CookieBanner />
        <ScrollToTop />
        <Footer />
      </div>
    </>
  )
}