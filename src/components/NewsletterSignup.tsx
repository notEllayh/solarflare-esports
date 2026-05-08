import { useState } from 'react'
import { api } from '../lib/api' 
import { Sparkles } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error'

const interests = [
  'Free Fire',
  'Chess',
  'eFootball',
  'EA FC 25',
  'Flame Society',
  'Merch Drops',
  'Events',
]

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const toggleInterest = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const validate = () => {
    if (!email.trim()) return 'Email address is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
    return ''
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const err = validate()
  if (err) { setError(err); return }
  setError('')
  setStatus('loading')

  try {
    await api.post('/api/newsletter/subscribe', {
      email,
      interests: selected,
    })
    setStatus('success')
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Something went wrong')
    setStatus('idle')
  }
} 

  return (
    <div className="relative overflow-hidden border-t border-sf-border">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,106,0,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 100% 50%, rgba(255,184,0,0.04) 0%, transparent 70%)
          `,
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,106,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      <div className="relative max-w-275 mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 border border-sf-border px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sf-orange animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-sf-orange">
                Stay in the Loop
              </span>
            </div>

            <h2
              className="font-condensed font-black uppercase leading-none text-sf-text mb-5"
              style={{ fontSize: 'clamp(40px, 6vw, 68px)' }}
            >
              Never Miss<br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                A Flare
              </span>
            </h2>

            <p className="text-sf-muted text-[15px] leading-relaxed max-w-md mb-8">
              Get match results, roster news, merch drops, and Flame Society updates delivered straight to your inbox. No spam — ever.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-3">
              {[
                { icon: <Sparkles className="text-[#ff6c00]" />, text: 'Match results & highlights every week' },
                { icon: <Sparkles className="text-[#ff6c00]" />, text: 'Early access to merch drops' },
                { icon: <Sparkles className="text-[#ff6c00]" />, text: 'Flame Society member exclusives' },
                { icon: <Sparkles className="text-[#ff6c00]" />, text: 'Tournament previews & predictions' },
              ].map((perk) => (
                <div key={perk.text} className="flex items-center gap-3">
                  <span className="text-[16px]">{perk.icon}</span>
                  <p className="text-[13px] text-sf-muted">{perk.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-sf-surface p-8 md:p-10">
            {status === 'success' ? (
              /* Success state */
              <div className="flex flex-col items-center text-center py-8">
                <div
                  className="w-16 h-16 flex items-center justify-center text-white text-2xl mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  ✓
                </div>
                <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text mb-3">
                  You're In!
                </h3>
                <p className="text-sf-muted text-[14px] leading-relaxed max-w-xs mb-6">
                  Welcome to the Solar Flare newsletter. Check your inbox for a confirmation email.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setEmail(''); setSelected([]) }}
                  className="text-[11px] font-bold tracking-[0.12em] uppercase text-sf-orange hover:underline"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-condensed font-black text-[24px] uppercase text-sf-text mb-1">
                  Subscribe Free
                </h3>
                <p className="text-[13px] text-sf-muted mb-7">
                  Join 1,000+ Solar Flare fans already subscribed.
                </p>

                {/* Email input */}
                <div className="mb-5">
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="you@example.com"
                    className={`w-full bg-sf-mid border text-sf-text text-[14px] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-sf-muted/40 focus:border-sf-orange ${
                      error ? 'border-red-500/60' : 'border-white/10'
                    }`}
                  />
                  {error && (
                    <p className="text-[11px] text-red-400 mt-1.5">{error}</p>
                  )}
                </div>

                {/* Interests */}
                <div className="mb-7">
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-3">
                    I'm interested in <span className="text-white/30">(optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`text-[11px] font-bold tracking-[0.08em] uppercase px-3.5 py-1.5 border transition-all duration-200 ${
                          selected.includes(item)
                            ? 'bg-sf-orange border-sf-orange text-white'
                            : 'bg-transparent border-white/10 text-sf-muted hover:border-white/30 hover:text-sf-text'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                      />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe to the Newsletter →'
                  )}
                </button>

                {/* Fine print */}
                <p className="text-[11px] text-sf-muted/40 mt-4 leading-relaxed text-center">
                  By subscribing you agree to our{' '}
                  <a href="/privacy" className="hover:text-sf-muted transition-colors underline">
                    Privacy Policy
                  </a>
                  . Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 