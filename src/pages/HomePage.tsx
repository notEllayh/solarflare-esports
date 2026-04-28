import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import Divisions from '../components/Divisions'
import Roster from '../components/Roster'
import News from '../components/News'
import SponsorsBar from '../components/SponorsBar' 

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Divisions />
      <Roster />
      <News />
      <SponsorsBar />
    </>
  )
}