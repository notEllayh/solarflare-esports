import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
}

const SITE_NAME    = 'Solar Flare Esports'
const SITE_URL     = 'https://solarflareesports.com'
const DEFAULT_DESC = 'Solar Flare Esports — Born to compete. Built to win. Official home of the Solar Flare esports organisation.'
const DEFAULT_IMG  = `${SITE_URL}/og-image.jpg`
const TWITTER_HANDLE = '@SolarFlareEsp'

export default function SEO({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMG,
  url,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const fullUrl   = url ? `${SITE_URL}${url}` : SITE_URL
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={fullImage} />
      <meta property="og:url"         content={fullUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={fullImage} />

      {/* Theme colour — matches brand */}
      <meta name="theme-color" content="#FF6A00" />
    </Helmet>
  )
} 