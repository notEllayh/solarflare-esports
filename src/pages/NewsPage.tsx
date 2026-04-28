import News from '../components/News'
import PageHero from '../components/PageHero'

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Latest"
        title="News & Updates"
        subtitle="Results, signings, partnerships — everything Solar Flare."
      />
      <News />
    </>
  )
}