import SEO from '../components/SEO'
import LegalPage from '../components/LegalPage'
import { privacySections } from '../data/siteData'

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        url="/privacy-policy"
        title="Privacy Policy"
        description="Learn how Solar Flare Esports collects, uses, and protects your personal data."
      />
      <LegalPage
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How Solar Flare Esports collects, uses, and protects your personal data."
        lastUpdated="29 April 2026"
        sections={privacySections}
      />
    </>
  )
} 