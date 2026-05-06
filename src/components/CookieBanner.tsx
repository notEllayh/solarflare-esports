import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible,  setVisible]  = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState({
    analytics:   false,
    marketing:   false,
    preferences: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem('sf_cookie_prefs')
    if (!stored) {
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
    <div className="fixed bottom-0 left-0 right-0 z-60 p-3 md:p-6">
      <div className="max-w-4xl mx-auto bg-sf-darker border border-sf-border shadow-2xl shadow-black/50">

        {/* Main banner */}
        <div className="px-5 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4">
            {/* Text */}
            <div className="flex items-start gap-3">
              <span className="text-[22px] shrink-0 mt-0.5">🍪</span>
              <div>
                <h3 className="font-condensed font-bold text-[17px] uppercase text-sf-text leading-tight mb-1">
                  We use cookies
                </h3>
                <p className="text-[12px] text-sf-muted leading-relaxed">
                  We use cookies to improve your experience, analyse traffic, and personalise content.{' '}
                  <Link to="/cookies" className="text-sf-orange hover:underline">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="text-[10px] font-bold tracking-widest uppercase text-sf-muted border border-white/15 px-3 py-2 hover:border-white/30 hover:text-sf-text transition-all duration-200"
              >
                {expanded ? 'Hide' : 'Customise'}
              </button>
              <button
                onClick={rejectAll}
                className="text-[10px] font-bold tracking-widest uppercase text-sf-muted border border-white/15 px-3 py-2 hover:border-white/30 hover:text-sf-text transition-all duration-200"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="text-[10px] font-bold tracking-widest uppercase text-white bg-sf-orange px-5 py-2 hover:bg-orange-500 transition-colors duration-200 flex-1 md:flex-none text-center"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>

        {/* Expanded custom options */}
        {expanded && (
          <div className="border-t border-sf-border px-5 py-4 md:px-6 md:py-5">
            <div className="flex flex-col gap-2 mb-4">
              {[
                { key: 'analytics'   as const, label: 'Analytics',   desc: 'Help us understand site usage' },
                { key: 'marketing'   as const, label: 'Marketing',   desc: 'Personalised ads and campaigns' },
                { key: 'preferences' as const, label: 'Preferences', desc: 'Remember your settings' },
              ].map((c) => (
                <div
                  key={c.key}
                  className="bg-sf-surface px-4 py-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-condensed font-bold text-[14px] uppercase text-sf-text leading-tight">
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
              className="w-full md:w-auto text-[11px] font-bold tracking-[0.12em] uppercase text-white bg-sf-orange px-7 py-2.5 hover:bg-orange-500 transition-colors duration-200"
            >
              Save My Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 