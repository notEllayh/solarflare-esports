import SEO from '../components/SEO'
import Divisions from '../components/Divisions'
import PageHero from '../components/PageHero' 


export default function TeamsPage() {
  return (
    <>
      <SEO
        url="/teams"
        title="Teams"
        description="Solar Flare Esports competes across Free Fire, Chess, eFootball and EA FC 25. Explore all our divisions."
      />
      <PageHero
        eyebrow="Our Divisions"
        title="All Teams"
        subtitle="Every Solar Flare squad, every game — one org built to win."
      />
      <Divisions />
    </>
  )
} 