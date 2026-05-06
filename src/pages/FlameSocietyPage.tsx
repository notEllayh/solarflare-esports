import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { membershipTiers, fanPerks, type MembershipTier } from '../data/siteData'
import { useAuth } from '../context/useAuth'
import { api } from '../lib/api'
import SEO from '../components/SEO'

// ── Tier Card ─────────────────────────────────────────────
function TierCard({ tier, billing }: { tier: MembershipTier; billing: 'month' | 'year' }) {
  const [loading, setLoading] = useState(false)
  const { user, session }     = useAuth()
  const navigate              = useNavigate()

  const rawPrice       = billing === 'year' ? tier.price * 12 * 0.8 : tier.price
  const formattedPrice = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(rawPrice)
  const period         = billing === 'year' ? 'year' : 'month'

  const handleJoin = async () => {
    if (!user || !session) { navigate('/login'); return }
    setLoading(true)
    try {
      const res = await api.post<{ authorization_url: string }>(
        '/api/membership/initialize',
        { tier: tier.id },
        { Authorization: `Bearer ${session.access_token}` }
      )
      window.location.href = res.authorization_url
    } catch {
      alert('Failed to initialize payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`relative flex flex-col p-8 transition-all duration-200 ${
        tier.featured ? 'bg-sf-surface ring-2 ring-sf-orange' : 'bg-sf-surface hover:bg-[#222226]'
      }`}
    >
      {tier.featured && (
        <div
          className="absolute -top-px left-0 right-0 h-0.75"
          style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
        />
      )}
      {tier.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sf-orange text-white text-[10px] font-black tracking-[0.12em] uppercase px-4 py-1 whitespace-nowrap">
          Most Popular
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <span className="text-[32px]">{tier.badge}</span>
        <h3 className="font-condensed font-black text-[28px] uppercase tracking-wide text-sf-text">
          {tier.name}
        </h3>
      </div>

      <div className="mb-2 flex items-start gap-1">
        <span
          className="font-condensed font-black text-[22px] leading-tight mt-2"
          style={{
            background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ₦
        </span>
        <span
          className="font-condensed font-black text-[48px] leading-none"
          style={{
            background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {formattedPrice}
        </span>
        <span className="text-sf-muted text-[13px] self-end mb-1.5 ml-0.5">/ {period}</span>
      </div>

      {billing === 'year' && (
        <p className="text-[11px] text-green-400 font-semibold tracking-wide mb-4">
          Save 20% vs monthly
        </p>
      )}

      <p className="text-[13px] text-sf-muted leading-relaxed mb-6 min-h-10">
        {tier.description}
      </p>

      <div className="w-full h-px bg-white/8 mb-6" />

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-3 text-[13px] text-sf-text">
            <span
              className="shrink-0 w-4 h-4 flex items-center justify-center text-[10px] font-black text-white mt-0.5"
              style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
            >
              ✓
            </span>
            {perk}
          </li>
        ))}
      </ul>

      <button
        onClick={handleJoin}
        disabled={loading}
        className={`w-full py-3.5 text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          tier.featured
            ? 'bg-sf-orange text-white hover:bg-orange-500'
            : 'border border-white/20 text-sf-text hover:border-white/50'
        }`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : user ? (
          `Join ${tier.name} →`
        ) : (
          'Sign In to Join →'
        )}
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function FlameSocietyPage() {
  const [billing,    setBilling]    = useState<'month' | 'year'>('month')
  const [membership, setMembership] = useState<{ tier: string } | null>(null)
  const { user, session }           = useAuth()

  useEffect(() => {
    const fetchMembership = async () => {
      if (!session?.access_token) return
      try {
        const res = await api.get<{ membership: { tier: string } | null }>(
          '/api/membership/status',
          { Authorization: `Bearer ${session.access_token}` }
        )
        setMembership(res.membership)
      } catch { /* ignore */ }
    }
    fetchMembership()
  }, [session])

  useEffect(() => {
  const processReferral = async () => {
    const params = new URLSearchParams(window.location.search)
    const ref    = params.get('ref')
    if (!ref || !session?.access_token) return

    try {
      await api.post(
        '/api/points/referral',
        { referral_code: ref },
        { Authorization: `Bearer ${session.access_token}` }
      )
      // Remove ref from URL
      window.history.replaceState({}, '', '/flame-society')
    } catch { /* ignore */ }
  }
  processReferral()
}, [session]) 

  return (
    <div className="bg-sf-darker">
      <SEO
        url="/flame-society"
        title="Flame Society — Fan Membership"
        description="Join the Flame Society — the official Solar Flare Esports fan membership. Exclusive content, perks, and community access."
      />

      {/* ── Hero ── */}
      <div className="relative min-h-[55vh] flex flex-col items-center justify-center text-center overflow-hidden pt-17 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,106,0,0.14) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,184,0,0.07) 0%, transparent 60%)
            `,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="text-[56px]">🔥</div>
          </div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-4">
            Fan Membership
          </p>
          <h1
            className="font-condensed font-black uppercase leading-none mb-5"
            style={{ fontSize: 'clamp(56px, 10vw, 100px)' }}
          >
            <span className="block text-sf-text">Flame</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Society
            </span>
          </h1>
          <p className="text-sf-muted text-[16px] font-light max-w-xl mx-auto leading-relaxed mb-8">
            The official Solar Flare fan membership. Exclusive access, member perks,
            and a community of thousands who burn as bright as we do.
          </p>

          {/* Already a member — show dashboard button */}
          {user && membership && (
            <Link
              to="/flame-society/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
            >
              🔥 Go to Your Dashboard →
            </Link>
          )}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #060607, transparent)' }}
        />
      </div>

      {/* ── Already a member banner ── */}
      {user && membership && (
        <div className="bg-[#1a0a00] border-y border-sf-orange">
          <div className="max-w-275 mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[24px]">🔥</span>
              <div>
                <p className="font-condensed font-black text-[18px] uppercase text-white leading-tight">
                  You're already a Flame Society member!
                </p>
                <p className="text-[13px] text-[#aaaaaa]">
                  Access your dashboard to view exclusive content, events and your Flare Points.
                </p>
              </div>
            </div>
            <Link
              to="/flame-society/dashboard"
              className="shrink-0 px-8 py-3 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200 whitespace-nowrap"
            >
              Open Dashboard →
            </Link>
          </div>
        </div>
      )}

      {/* ── Perks strip ── */}
      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
          Member Benefits
        </p>
        <h2
          className="font-condensed font-black uppercase leading-none mb-12"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          Why Join the Society
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5">
          {fanPerks.map((perk) => (
            <div
              key={perk.title}
              className="bg-sf-surface p-7 group hover:bg-[#222226] transition-colors duration-200"
            >
              <div className="text-[32px] mb-4">{perk.icon}</div>
              <h3 className="font-condensed font-bold text-[18px] uppercase text-sf-text mb-2">
                {perk.title}
              </h3>
              <p className="text-[13px] text-sf-muted leading-relaxed">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Membership tiers ── */}
      <section className="max-w-275 mx-auto px-6 md:px-12 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
              Choose Your Tier
            </p>
            <h2
              className="font-condensed font-black uppercase leading-none"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
            >
              Membership Plans
            </h2>
          </div>

          <div className="flex items-center bg-sf-surface p-1 self-start md:self-auto">
            <button
              onClick={() => setBilling('month')}
              className={`px-5 py-2 text-[11px] font-bold tracking-widests uppercase transition-all duration-200 ${
                billing === 'month' ? 'bg-sf-orange text-white' : 'text-sf-muted hover:text-sf-text'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('year')}
              className={`px-5 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 ${
                billing === 'year' ? 'bg-sf-orange text-white' : 'text-sf-muted hover:text-sf-text'
              }`}
            >
              Annual
              <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 font-black tracking-wider">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {membershipTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-8 text-[12px] text-sf-muted">
          {[
            '✓ Cancel anytime',
            '✓ No hidden fees',
            '✓ Instant access on signup',
            '✓ Secure payment via Paystack',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* ── Community CTA ── */}
      <div className="border-t border-sf-border">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3
              className="font-condensed font-black uppercase leading-none text-sf-text mb-3"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Already a Member?
            </h3>
            <p className="text-sf-muted text-[14px] max-w-md leading-relaxed">
              Head to your Flame Society dashboard or join our Discord community.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {user && membership && (
              <Link
                to="/flame-society/dashboard"
                className="px-8 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200 whitespace-nowrap"
              >
                Open Dashboard →
              </Link>
            )}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 text-[12px] font-bold tracking-[0.14em] uppercase border border-white/20 text-sf-text hover:border-sf-orange hover:text-sf-orange transition-all duration-200 whitespace-nowrap"
            >
              Open Discord →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 