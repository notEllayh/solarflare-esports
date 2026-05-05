import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'

interface Membership {
  tier:       string
  plan_name:  string
  status:     string
  amount:     number
  currency:   string
  started_at: string
  expires_at: string
}

const tierBadges: Record<string, string> = {
  spark: '🔥',
  flare: '⚡',
  solar: '☀️',
}

const tierColors: Record<string, string> = {
  spark: 'text-sf-orange',
  flare: 'text-yellow-400',
  solar: 'text-amber-300',
}

export default function AccountPage() {
  const { user, session, signOut, loading } = useAuth()
  const [membership, setMembership]         = useState<Membership | null>(null)
  const [loadingMembership, setLoadingMembership] = useState(true)
  const navigate = useNavigate()

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  // Fetch membership status
  useEffect(() => {
    const fetchMembership = async () => {
      if (!session?.access_token) return

      try {
        const res = await api.get<{ success: boolean; membership: Membership | null }>(
          '/api/membership/status',
          { Authorization: `Bearer ${session.access_token}` }
        )
        setMembership(res.membership)
      } catch (err) {
        console.error('Failed to fetch membership:', err)
      } finally {
        setLoadingMembership(false)
      }
    }

    if (session) fetchMembership()
  }, [session])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sf-darker flex items-center justify-center">
        <span className="w-10 h-10 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <SEO url="/account" title="My Account" noIndex />

      <PageHero
        eyebrow="My Account"
        title="Profile"
        subtitle="Manage your Solar Flare account and membership."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* Left — account details */}
          <div className="flex flex-col gap-6">

            {/* Profile card */}
            <div className="bg-sf-surface p-8">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
                Account Details
              </p>

              <div className="flex items-center gap-5 mb-8">
                {/* Avatar */}
                <div
                  className="w-16 h-16 flex items-center justify-center text-white text-2xl font-black shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  {(user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-condensed font-black text-[24px] uppercase text-sf-text leading-tight">
                    {user.user_metadata?.name || 'Solar Flare Fan'}
                  </h2>
                  <p className="text-sf-muted text-[13px]">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                {[
                  { label: 'Name',         value: user.user_metadata?.name || '—' },
                  { label: 'Email',        value: user.email || '—' },
                  { label: 'Member Since', value: new Date(user.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
                  { label: 'Role',         value: user.user_metadata?.role || 'Fan' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between bg-sf-mid px-5 py-4">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">
                      {item.label}
                    </span>
                    <span className="text-[13px] text-sf-text font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Membership card */}
            <div className="bg-sf-surface p-8">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
                Flame Society
              </p>

              {loadingMembership ? (
                <div className="flex items-center gap-3 text-sf-muted">
                  <span className="w-4 h-4 border-2 border-sf-muted/30 border-t-sf-muted rounded-full animate-spin block" />
                  Loading membership...
                </div>
              ) : membership ? (
                <div>
                  {/* Active membership */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[40px]">
                      {tierBadges[membership.tier] ?? '🔥'}
                    </span>
                    <div>
                      <h3
                        className={`font-condensed font-black text-[28px] uppercase ${
                          tierColors[membership.tier] ?? 'text-sf-orange'
                        }`}
                      >
                        {membership.plan_name} Member
                      </h3>
                      <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-green-500/15 text-green-400 px-2 py-0.5 mt-1">
                        {membership.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    {[
                      { label: 'Plan',       value: membership.plan_name },
                      { label: 'Amount',     value: `₦${new Intl.NumberFormat('en-NG').format(membership.amount)}` },
                      { label: 'Started',    value: new Date(membership.started_at).toLocaleDateString('en-GB') },
                      { label: 'Renews',     value: new Date(membership.expires_at).toLocaleDateString('en-GB') },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between bg-sf-mid px-5 py-4">
                        <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">
                          {item.label}
                        </span>
                        <span className="text-[13px] text-sf-text font-medium">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* No membership */
                <div className="text-center py-8">
                  <div className="text-[48px] mb-4">🔥</div>
                  <h3 className="font-condensed font-black text-[22px] uppercase text-sf-text mb-2">
                    Not a Member Yet
                  </h3>
                  <p className="text-sf-muted text-[13px] leading-relaxed mb-6 max-w-xs mx-auto">
                    Join the Flame Society to unlock exclusive content, perks and community access.
                  </p>
                  <button
                    onClick={() => navigate('/flame-society')}
                    className="px-8 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
                  >
                    View Memberships →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">

            {/* Quick links */}
            <div className="bg-sf-surface p-6">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-4">
                Quick Links
              </p>
              <div className="flex flex-col gap-0.5">
                {[
                  { label: 'Flame Society',  href: '/flame-society', emoji: '🔥' },
                  { label: 'Merch Store',    href: '/shop',          emoji: '👕' },
                  { label: 'Match Tracker',  href: '/matches',       emoji: '🏆' },
                  { label: 'Gallery',        href: '/gallery',       emoji: '📷' },
                  { label: 'Contact Us',     href: '/contact',       emoji: '💬' },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.href)}
                    className="flex items-center gap-3 px-4 py-3 bg-sf-mid hover:bg-[#222226] transition-colors duration-200 text-left group"
                  >
                    <span className="text-[16px]">{link.emoji}</span>
                    <span className="text-[13px] text-sf-muted group-hover:text-sf-text transition-colors font-medium flex-1">
                      {link.label}
                    </span>
                    <span className="text-sf-muted group-hover:text-sf-orange transition-colors text-sm">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-sf-surface p-6">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-4">
                Account
              </p>
              <button
                onClick={handleSignOut}
                className="w-full py-3 border border-red-500/20 text-red-400 text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-red-500/10 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 