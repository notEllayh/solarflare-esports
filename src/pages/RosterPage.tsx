import Roster from '../components/Roster'
import PageHero from '../components/PageHero'

export default function RosterPage() {
  return (
    <>
      <PageHero
        eyebrow="Athletes"
        title="Full Roster"
        subtitle="Meet every player wearing the Solar Flare jersey."
      />
      <Roster />
    </>
  )
}