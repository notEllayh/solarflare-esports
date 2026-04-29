import SEO from '../components/SEO'
import LegalPage from '../components/LegalPage'
import { accessibilitySections } from '../data/siteData'

export default function AccessibilityPage() {
  return (
    <>
      <SEO
        url="/accessibility"
        title="Accessibility Statement"
        description="Learn about Solar Flare Esports' commitment to accessibility and how we strive to make our website usable for everyone."
      />
      <LegalPage
        eyebrow="Accessibility"
        title="Accessibility Statement"
        subtitle="Our commitment to making Solar Flare Esports accessible to everyone."
        lastUpdated="29 April 2026"
        sections={accessibilitySections}
      />
    </>
  )
} 