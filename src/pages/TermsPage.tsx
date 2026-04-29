import SEO from '../components/SEO'
import LegalPage from '../components/LegalPage'
import { termsSections } from '../data/siteData'

export default function TermsPage() {
  return (
    <>
      <SEO
        url="/terms"
        title="Terms of Use"
        description="Read the terms and conditions for using the Solar Flare Esports website and services."
      /> 
      <LegalPage
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="The rules and conditions that govern your use of the Solar Flare Esports website and services."
        lastUpdated="29 April 2026"
        sections={termsSections}
      />
    </>
  )
} 