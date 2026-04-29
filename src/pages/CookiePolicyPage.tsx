import SEO from '../components/SEO' 
import { useState } from 'react'
import LegalPage from '../components/LegalPage'
import { cookieSections } from '../data/siteData'

type CookiePrefs = {
  essential: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export default function CookiePolicyPage() {
  const [prefs, setPrefs] = useState<CookiePrefs>({
    essential:   true,
    analytics:   false,
    marketing:   false,
    preferences: false,
  })
  const [saved, setSaved] = useState(false)

  const toggle = (key: keyof CookiePrefs) => {
    if (key === 'essential') return
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
    setSaved(false)
  }

  const savePrefs = () => {
    localStorage.setItem('sf_cookie_prefs', JSON.stringify(prefs))
    setSaved(true)
  }

  const acceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true, preferences: true }
    setPrefs(all)
    localStorage.setItem('sf_cookie_prefs', JSON.stringify(all))
    setSaved(true)
  }

  const rejectAll = () => {
    const min = { essential: true, analytics: false, marketing: false, preferences: false }
    setPrefs(min)
    localStorage.setItem('sf_cookie_prefs', JSON.stringify(min))
    setSaved(true)
  }

  const cookieTypes = [
    {
      key: 'essential' as keyof CookiePrefs,
      label: 'Essential',
      description: 'Required for the website to function. Cannot be disabled.',
      required: true,
    },
    {
      key: 'analytics' as keyof CookiePrefs,
      label: 'Analytics',
      description: 'Help us understand how you use the site so we can improve it.',
      required: false,
    },
    {
      key: 'marketing' as keyof CookiePrefs,
      label: 'Marketing',
      description: 'Used to deliver relevant ads and measure campaign effectiveness.',
      required: false,
    },
    {
      key: 'preferences' as keyof CookiePrefs,
      label: 'Preferences',
      description: 'Remember your settings and preferences across visits.',
      required: false,
    },
  ]

  return (
    <div>
      <SEO
        url="/cookie-policy"
        title="Cookie Policy"
        description="Learn how Solar Flare Esports uses cookies and how you can manage your preferences."
      />
      {/* Cookie settings panel */}
      <div className="bg-sf-surface border-b border-sf-border">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-12">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
            Cookie Preferences
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none text-sf-text mb-3"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
          >
            Manage Your Cookies
          </h2>
          <p className="text-sf-muted text-[14px] max-w-xl leading-relaxed mb-10">
            Choose which cookies you allow us to use. Essential cookies are always active as they are required for the website to function.
          </p>

          {/* Toggle rows */}
          <div className="flex flex-col gap-0.5 mb-8">
            {cookieTypes.map((cookie) => (
              <div
                key={cookie.key}
                className="bg-sf-mid px-6 py-5 flex items-center justify-between gap-6"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-condensed font-bold text-[18px] uppercase text-sf-text">
                      {cookie.label}
                    </h3>
                    {cookie.required && (
                      <span className="text-[10px] font-bold tracking-widest uppercase bg-sf-orange/15 text-sf-orange px-2 py-0.5">
                        Always On
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-sf-muted leading-relaxed">
                    {cookie.description}
                  </p>
                </div>

                {/* Toggle switch */}
                <button
                  onClick={() => toggle(cookie.key)}
                  disabled={cookie.required}
                  className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-200 ${
                    prefs[cookie.key]
                      ? 'bg-sf-orange'
                      : 'bg-white/10'
                  } ${cookie.required ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                  aria-label={`Toggle ${cookie.label} cookies`}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
                    style={{ transform: prefs[cookie.key] ? 'translateX(26px)' : 'translateX(2px)' }}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={savePrefs}
              className="px-8 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
            >
              Save Preferences
            </button>
            <button
              onClick={acceptAll}
              className="px-8 py-3 border border-white/20 text-sf-text text-[11px] font-bold tracking-[0.14em] uppercase hover:border-white/50 transition-colors duration-200"
            >
              Accept All
            </button>
            <button
              onClick={rejectAll}
              className="px-8 py-3 border border-white/10 text-sf-muted text-[11px] font-bold tracking-[0.14em] uppercase hover:border-white/30 hover:text-sf-text transition-colors duration-200"
            >
              Reject All
            </button>

            {saved && (
              <span className="text-[12px] text-green-400 font-semibold">
                ✓ Preferences saved
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Policy content */}
      <LegalPage
        eyebrow="Legal"
        title="Cookie Policy"
        subtitle="How Solar Flare Esports uses cookies and similar tracking technologies."
        lastUpdated="29 April 2026"
        sections={cookieSections}
      />
    </div>
  )
} 