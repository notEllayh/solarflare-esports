import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TeamsPage from './pages/TeamsPage'
import RosterPage from './pages/RosterPage'
import NewsPage from './pages/NewsPage'
import PartnersPage from './pages/PartnersPage'
import ShopPage from './pages/ShopPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import FlameSocietyPage from './pages/FlameSocietyPage'
import NotFoundPage from './pages/NotFoundPage'

export default function SolarFlareApp() {
  return (
    <div className="bg-sf-darker text-sf-text font-body min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/teams"    element={<TeamsPage />} />
        <Route path="/roster"   element={<RosterPage />} />
        <Route path="/news"     element={<NewsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/shop"     element={<ShopPage />} />
        <Route path="/careers"  element={<CareersPage />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/flame-society" element={<FlameSocietyPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
