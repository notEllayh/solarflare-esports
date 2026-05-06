import { useState, useCallback, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import LoginPage          from './pages/LoginPage'
import SignupPage         from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import AccountPage from './pages/AccountPage'
import MembershipVerifyPage from './pages/MembershipVerifyPage'
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ScrollToTop from './components/ScrollToTop'
import SplashScreen from './components/SplashScreen'
import PageTransition from './components/PageTransition'

// Lazy loaded pages — each becomes its own chunk
const HomePage          = lazy(() => import('./pages/HomePage'))
const TeamsPage         = lazy(() => import('./pages/TeamsPage'))
const TeamDetailPage    = lazy(() => import('./pages/TeamDetailPage'))
const RosterPage        = lazy(() => import('./pages/RosterPage'))
const PlayerProfilePage = lazy(() => import('./pages/PlayerProfilePage'))
const NewsPage          = lazy(() => import('./pages/NewsPage'))
const NewsArticlePage   = lazy(() => import('./pages/NewsArticlePage'))
const PartnersPage      = lazy(() => import('./pages/PartnersPage'))
const ShopPage          = lazy(() => import('./pages/ShopPage'))
const CareersPage       = lazy(() => import('./pages/CareersPage'))
const ContactPage       = lazy(() => import('./pages/ContactPage'))
const FlameSocietyPage  = lazy(() => import('./pages/FlameSocietyPage'))
const AboutPage         = lazy(() => import('./pages/AboutPage'))
const GalleryPage       = lazy(() => import('./pages/GalleryPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsPage         = lazy(() => import('./pages/TermsPage'))
const CookiePolicyPage  = lazy(() => import('./pages/CookiePolicyPage'))
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'))
const MatchTrackerPage  = lazy(() => import('./pages/MatchTrackerPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

// Page loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sf-darker">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 flex items-center justify-center text-white text-xs font-black animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          SF
        </div>
        <div className="w-32 h-0.5 bg-white/5 overflow-hidden">
          <div
            className="h-full w-full animate-pulse"
            style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
          />
        </div>
      </div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/login"           element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup"          element={<PageTransition><SignupPage /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
        <Route path="/teams"         element={<PageTransition><TeamsPage /></PageTransition>} />
        <Route path="/teams/:id"     element={<PageTransition><TeamDetailPage /></PageTransition>} />
        <Route path="/roster"        element={<PageTransition><RosterPage /></PageTransition>} />
        <Route path="/roster/:id"    element={<PageTransition><PlayerProfilePage /></PageTransition>} />
        <Route path="/news"          element={<PageTransition><NewsPage /></PageTransition>} />
        <Route path="/news/:id" element={<PageTransition><NewsArticlePage /></PageTransition>} /> 
        <Route path="/partners"      element={<PageTransition><PartnersPage /></PageTransition>} />
        <Route path="/shop"          element={<PageTransition><ShopPage /></PageTransition>} />
        <Route path="/careers"       element={<PageTransition><CareersPage /></PageTransition>} />
        <Route path="/contact"       element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/account" element={<PageTransition><AccountPage /></PageTransition>} /> 
        <Route path="/flame-society" element={<PageTransition><FlameSocietyPage /></PageTransition>} />
        <Route path="/membership/verify" element={<PageTransition><MembershipVerifyPage /></PageTransition>} />
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
        <ScrollToTopOnNavigate />
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
        <CookieBanner />
        <ScrollToTop />
        <Footer />
      </div>
    </>
  )
} 