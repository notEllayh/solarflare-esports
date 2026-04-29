import SEO from '../components/SEO'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import Divisions from '../components/Divisions'
import Roster from '../components/Roster'
import News from '../components/News'
import SponsorsBar from '../components/SponorsBar' 
import NewsletterSignup from '../components/NewsletterSignup'

export default function HomePage() {
  return (
    <>
    <SEO
        url="/"
        title="Home"
        description="Solar Flare Esports — Born to compete. Built to win. Official home of Free Fire, Chess, eFootball and EA FC 25 competitive teams."
      />
      <Hero />
      <StatsBar />
      <Divisions />
      <Roster />
      <News />
      <SponsorsBar />
      <NewsletterSignup />
    </>
  )
}