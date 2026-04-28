import Divisions from '../components/Divisions'
import PageHero from '../components/PageHero' 

export default function TeamsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Divisions"
        title="All Teams"
        subtitle="Every Solar Flare squad, every game — one org built to win."
      />
      <Divisions />
    </>
  )
} 