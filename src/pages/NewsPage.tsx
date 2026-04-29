import SEO from '../components/SEO'
import News from '../components/News'
import PageHero from '../components/PageHero'
import NewsletterSignup from '../components/NewsletterSignup'

export default function NewsPage() {
  return (
    <>
      <SEO
        url="/news"
        title="News"
        description="Latest news, results, roster updates and announcements from Solar Flare Esports."
      />

      <PageHero
        eyebrow="Latest"
        title="News & Updates"
        subtitle="Results, signings, partnerships — everything Solar Flare."
      />
      <News />
      <NewsletterSignup />
    </>
  )
} 