import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState({
    analytics:   false,
    marketing:   false,
    preferences: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem('sf_cookie_prefs')
    if (!stored) {
      // Slight delay so it doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem(
      'sf_cookie_prefs',
      JSON.stringify({ essential: true, analytics: true, marketing: true, preferences: true })
    )
    setVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem(
      'sf_cookie_prefs',
      JSON.stringify({ essential: true, analytics: false, marketing: false, preferences: false })
    )
    setVisible(false)
  }

  const saveCustom = () => {
    localStorage.setItem(
      'sf_cookie_prefs',
      JSON.stringify({ essential: true, ...prefs })
    )
    setVisible(false)
  }

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-225 mx-auto bg-sf-surface border border-sf-border shadow-2xl">

        {/* Main banner */}
        <div className="px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <span className="text-[24px] shrink-0 mt-0.5">🍪</span>
            <div>
              <h3 className="font-condensed font-bold text-[18px] uppercase text-sf-text leading-tight mb-1">
                We use cookies
              </h3>
              <p className="text-[13px] text-sf-muted leading-relaxed">
                We use cookies to improve your experience, analyse traffic, and personalise content.{' '}
                <Link to="/cookies" className="text-sf-orange hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-[11px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-4 py-2.5 hover:border-white/30 hover:text-sf-text transition-all duration-200"
            >
              {expanded ? 'Hide Options' : 'Customise'}
            </button>
            <button
              onClick={rejectAll}
              className="text-[11px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-4 py-2.5 hover:border-white/30 hover:text-sf-text transition-all duration-200"
            >
              Reject All
            </button>
            <button
              onClick={acceptAll}
              className="text-[11px] font-bold tracking-widest uppercase text-white bg-sf-orange px-5 py-2.5 hover:bg-orange-500 transition-colors duration-200"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Expanded custom options */}
        {expanded && (
          <div className="border-t border-sf-border px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 mb-5">
              {[
                { key: 'analytics'   as const, label: 'Analytics',   desc: 'Help us understand site usage' },
                { key: 'marketing'   as const, label: 'Marketing',   desc: 'Personalised ads and campaigns' },
                { key: 'preferences' as const, label: 'Preferences', desc: 'Remember your settings' },
              ].map((c) => (
                <div key={c.key} className="bg-sf-mid px-4 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-condensed font-bold text-[15px] uppercase text-sf-text leading-tight">
                      {c.label}
                    </p>
                    <p className="text-[11px] text-sf-muted mt-0.5">{c.desc}</p>
                  </div>
                  <button
                    onClick={() => toggle(c.key)}
                    className={`relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${
                      prefs[c.key] ? 'bg-sf-orange' : 'bg-white/10'
                    }`}
                    aria-label={`Toggle ${c.label}`}
                  >
                    <span
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                      style={{ transform: prefs[c.key] ? 'translateX(22px)' : 'translateX(2px)' }}
                    />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={saveCustom}
              className="text-[11px] font-bold tracking-[0.12em] uppercase text-white bg-sf-orange px-7 py-2.5 hover:bg-orange-500 transition-colors duration-200"
            >
              Save My Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 