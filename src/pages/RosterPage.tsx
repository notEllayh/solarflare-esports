import SEO from '../components/SEO'
import Roster from '../components/Roster'
import PageHero from '../components/PageHero'

export default function RosterPage() {
  return (
    <>
   <SEO
        url="/roster"
        title="Roster"
        description="Meet the Solar Flare Esports roster — professional players competing across Free Fire, Chess, eFootball and EA FC 25."
      />

      <PageHero
        eyebrow="Athletes"
        title="Full Roster"
        subtitle="Meet every player wearing the Solar Flare jersey."
      />
      <Roster />
    </>
  )
}