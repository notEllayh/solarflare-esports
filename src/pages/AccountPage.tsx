import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'

interface Membership {
  tier:       string
  plan_name:  string
  status:     string
  amount:     number
  started_at: string
  expires_at: string
}

interface Profile {
  name:       string
  bio:        string
  avatar_url: string
}

interface Player {
  id:       string
  alias:    string
  role:     string
  division: string
  image:    string
}

interface FavouriteEntry {
  player_id:  string
  created_at: string
}

const tierBadges: Record<string, string> = {
  spark: '🔥', flare: '⚡', solar: '☀️',
}
const tierColors: Record<string, string> = {
  spark: 'text-sf-orange', flare: 'text-yellow-400', solar: 'text-amber-300',
}

const tabs = ['Profile', 'Membership', 'Favourites', 'Settings'] as const
type Tab = typeof tabs[number]

// ── Avatar component ────────────────────────────────────
function Avatar({ url, name, size = 'lg' }: { url: string; name: string; size?: 'sm' | 'lg' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const dim = size === 'lg' ? 'w-32 h-32 text-4xl' : 'w-10 h-10 text-base'
  const letter = (name || 'U').charAt(0).toUpperCase()

  if (url && !imgFailed) {
    return (
      <img
        key={url}
        src={url}
        alt={name}
        className={`${dim} rounded-full object-cover shrink-0`}
        onError={() => setImgFailed(true)}
      />
    )
  } 

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center text-white font-black shrink-0`}
      style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
    >
      {letter}
    </div>
  )
} 

// ── Main page ───────────────────────────────────────────
export default function AccountPage() {
  const { user, session, signOut, loading } = useAuth()
  const navigate = useNavigate()

  const [activeTab,   setActiveTab]   = useState<Tab>('Profile')
  const [membership,  setMembership]  = useState<Membership | null>(null)
  const [profile,     setProfile]     = useState<Profile>({ name: '', bio: '', avatar_url: '' })
  const [favourites,  setFavourites]  = useState<Player[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [saving,      setSaving]      = useState(false)
  const [saveMsg,     setSaveMsg]     = useState('')

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  const fetchData = useCallback(async () => {
    if (!session?.access_token) return
    setLoadingData(true)
    try {
      const [memberRes, profileRes, favRes] = await Promise.all([
        api.get<{ membership: Membership | null }>('/api/membership/status', { Authorization: `Bearer ${session.access_token}` }),
        api.get<{ data: Profile | null }>('/api/profile', { Authorization: `Bearer ${session.access_token}` }),
        api.get<{ data: FavouriteEntry[] }>('/api/profile/favourites', { Authorization: `Bearer ${session.access_token}` }),
      ])

      setMembership(memberRes.membership)

      if (profileRes.data) {
        setProfile({
          name:       profileRes.data.name      ?? user?.user_metadata?.name ?? '',
          bio:        profileRes.data.bio        ?? '',
          avatar_url: profileRes.data.avatar_url ?? '',
        })
      } else {
        setProfile({ name: user?.user_metadata?.name ?? '', bio: '', avatar_url: '' })
      }

      if (favRes.data?.length) {
        const playerDetails = await Promise.all(
          favRes.data.map((f) =>
            api.get<{ data: Player }>(`/api/players/${f.player_id}`)
              .then((r) => r.data)
              .catch(() => null)
          )
        )
        setFavourites(playerDetails.filter(Boolean) as Player[])
      } else {
        setFavourites([])
      }
    } catch {
      console.error('Failed to fetch account data')
    } finally {
      setLoadingData(false)
    }
  }, [session, user])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSaveProfile = async () => {
    if (!session?.access_token) return
    setSaving(true)
    setSaveMsg('')
    try {
      await api.put('/api/profile', profile, { Authorization: `Bearer ${session.access_token}` })
      setSaveMsg('✓ Profile saved!')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch {
      setSaveMsg('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveFavourite = async (playerId: string) => {
    if (!session?.access_token) return
    try {
      await api.delete(`/api/profile/favourites/${playerId}`, { Authorization: `Bearer ${session.access_token}` })
      setFavourites((prev) => prev.filter((p) => p.id !== playerId))
    } catch {
      console.error('Failed to remove favourite')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (loading) return (
    <div className="min-h-screen bg-sf-darker flex items-center justify-center">
      <span className="w-10 h-10 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
    </div>
  )

  if (!user) return null

  const inputClass = 'w-full bg-sf-mid border border-white/10 text-sf-text text-[14px] px-4 py-3 outline-none focus:border-sf-orange transition-colors placeholder:text-sf-muted/50'
  const labelClass = 'block text-[11px] font-semibold tracking-[0.1em] uppercase text-sf-muted mb-2'

  return (
    <>
      <SEO url="/account" title="My Account" noIndex />

      <PageHero
        eyebrow="My Account"
        title={profile.name || user.user_metadata?.name || 'Fan'}
        subtitle="Manage your Solar Flare account."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-12">

        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-sf-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[12px] font-bold tracking-widest uppercase transition-all duration-200 border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab
                  ? 'border-sf-orange text-sf-text'
                  : 'border-transparent text-sf-muted hover:text-sf-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loadingData ? (
          <div className="flex items-center gap-3 text-sf-muted py-12">
            <span className="w-5 h-5 border-2 border-sf-muted/30 border-t-sf-orange rounded-full animate-spin block" />
            Loading...
          </div>
        ) : (
          <>
            {/* ── PROFILE TAB ── */}
            {activeTab === 'Profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

                {/* Left — avatar preview */}
                <div className="flex flex-col items-center gap-5 py-8 bg-sf-surface px-6">
                  <Avatar
                    url={profile.avatar_url}
                    name={profile.name || user.email || 'U'}
                    size="lg"
                  />
                  <div className="text-center">
                    <p className="font-condensed font-black text-[22px] uppercase text-sf-text leading-tight">
                      {profile.name || 'Solar Flare Fan'}
                    </p>
                    <p className="text-sf-muted text-[13px] mt-1">{user.email}</p>
                    {membership && (
                      <p className={`text-[12px] font-bold uppercase mt-2 ${tierColors[membership.tier] ?? 'text-sf-orange'}`}>
                        {tierBadges[membership.tier]} {membership.plan_name} Member
                      </p>
                    )}
                  </div>

                  {/* Quick links */}
                  <div className="w-full flex flex-col gap-1 pt-4 border-t border-sf-border">
                    {[
                      { label: 'Flame Society', href: '/flame-society', emoji: '🔥' },
                      { label: 'Merch Store',   href: '/shop',          emoji: '👕' },
                      { label: 'Roster',        href: '/roster',        emoji: '👤' },
                    ].map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="flex items-center gap-3 px-3 py-2.5 bg-sf-mid hover:bg-[#222226] transition-colors group"
                      >
                        <span className="text-[15px]">{link.emoji}</span>
                        <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-sf-muted group-hover:text-sf-text transition-colors flex-1">
                          {link.label}
                        </span>
                        <span className="text-sf-muted group-hover:text-sf-orange text-sm transition-colors">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right — edit form */}
                <div className="bg-sf-surface p-8">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
                    Edit Profile
                  </p>

                  <div className="flex flex-col gap-5">
                    <div>
                      <label className={labelClass}>Display Name</label>
                      <input
                        className={inputClass}
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Avatar URL</label>
                      <input
                        className={inputClass}
                        value={profile.avatar_url}
                        onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                      />
                      <p className="text-[11px] text-sf-muted mt-1.5">
                        Paste a direct link to your profile image — the preview updates live on the left.
                      </p>
                      {/* Inline preview */}
                      {profile.avatar_url && (
                        <div className="mt-3 flex items-center gap-3">
                          <Avatar url={profile.avatar_url} name={profile.name} size="sm" />
                          <span className="text-[11px] text-sf-muted">Preview</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}>Bio</label>
                      <textarea
                        className={inputClass}
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="px-8 py-3 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors disabled:opacity-60 flex items-center gap-2"
                      >
                        {saving ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : 'Save Profile'}
                      </button>
                      {saveMsg && (
                        <span className={`text-[13px] font-semibold ${saveMsg.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
                          {saveMsg}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── MEMBERSHIP TAB ── */}
            {activeTab === 'Membership' && (
              <div className="max-w-xl">
                {membership ? (
                  <div className="bg-sf-surface p-8">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
                      Current Plan
                    </p>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[48px]">{tierBadges[membership.tier] ?? '🔥'}</span>
                      <div>
                        <h3 className={`font-condensed font-black text-[32px] uppercase ${tierColors[membership.tier] ?? 'text-sf-orange'}`}>
                          {membership.plan_name}
                        </h3>
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-green-500/15 text-green-400 px-2 py-0.5">
                          {membership.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 mb-8">
                      {[
                        { label: 'Plan',    value: membership.plan_name },
                        { label: 'Amount',  value: `₦${new Intl.NumberFormat('en-NG').format(membership.amount)}` },
                        { label: 'Started', value: new Date(membership.started_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
                        { label: 'Renews',  value: new Date(membership.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between bg-sf-mid px-5 py-4">
                          <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">{item.label}</span>
                          <span className="text-[13px] text-sf-text font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/flame-society"
                      className="inline-block px-8 py-3 border border-white/20 text-sf-text text-[12px] font-bold tracking-[0.14em] uppercase hover:border-sf-orange hover:text-sf-orange transition-colors duration-200"
                    >
                      Upgrade Plan →
                    </Link>
                  </div>
                ) : (
                  <div className="bg-sf-surface p-10 text-center">
                    <div className="text-[56px] mb-4">🔥</div>
                    <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text mb-3">
                      No Active Membership
                    </h3>
                    <p className="text-sf-muted text-[14px] leading-relaxed mb-8 max-w-xs mx-auto">
                      Join the Flame Society to unlock exclusive perks and community access.
                    </p>
                    <Link
                      to="/flame-society"
                      className="inline-block px-10 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors"
                    >
                      View Memberships →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ── FAVOURITES TAB ── */}
            {activeTab === 'Favourites' && (
              <div>
                {favourites.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-[56px] mb-4">⭐</div>
                    <h3 className="font-condensed font-black text-[24px] uppercase text-sf-text mb-3">
                      No Favourite Players Yet
                    </h3>
                    <p className="text-sf-muted text-[14px] mb-8">
                      Visit a player profile and click the heart to add them here.
                    </p>
                    <Link
                      to="/roster"
                      className="inline-block px-8 py-3 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors"
                    >
                      Browse Roster →
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-sf-muted text-[13px] mb-6">
                      {favourites.length} favourite player{favourites.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5">
                      {favourites.map((player) => (
                        <div key={player.id} className="relative bg-sf-surface group">
                          <Link to={`/roster/${player.id}`} className="block">
                            <div className="relative overflow-hidden bg-sf-mid" style={{ aspectRatio: '3/4' }}>
                              {player.image ? (
                                <img
                                  src={player.image}
                                  alt={player.alias}
                                  className="w-full h-full object-cover object-top"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="font-condensed font-black text-[48px] text-white/10">
                                    {player.alias.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div
                                className="absolute inset-x-0 bottom-0 h-2/3"
                                style={{ background: 'linear-gradient(to top, #1C1C1F 0%, transparent 100%)' }}
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <p className="font-condensed font-black text-[18px] uppercase text-sf-text leading-none truncate">
                                  {player.alias}
                                </p>
                                <p className="text-[10px] text-sf-orange font-bold uppercase mt-0.5">
                                  {player.role}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <button
                            onClick={() => handleRemoveFavourite(player.id)}
                            className="absolute top-2 right-2 w-7 h-7 bg-black/60 flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                            title="Remove from favourites"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── SETTINGS TAB ── */}
            {activeTab === 'Settings' && (
              <div className="max-w-xl flex flex-col gap-4">
                <div className="bg-sf-surface p-8">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
                    Account Settings
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {[
                      { label: 'Email',        value: user.email ?? '—' },
                      { label: 'Member Since', value: new Date(user.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
                      { label: 'Account Type', value: user.user_metadata?.role === 'admin' ? 'Admin' : 'Fan' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between bg-sf-mid px-5 py-4">
                        <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">{item.label}</span>
                        <span className="text-[13px] text-sf-text font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Referral link */}
<div className="bg-sf-surface p-8 mt-4">
  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-4">
    Refer a Friend
  </p>
  <p className="text-[13px] text-sf-muted mb-4">
    Share your referral link. You earn <span className="text-sf-orange font-bold">+300 XP</span> when a friend joins Flame Society using your link.
  </p>
  <div className="flex items-center gap-2">
    <div className="flex-1 bg-sf-mid border border-sf-border px-4 py-3 text-[12px] text-sf-text font-mono truncate">
      {`${window.location.origin}/flame-society?ref=${user.id}`}
    </div>
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(`${window.location.origin}/flame-society?ref=${user.id}`)
        alert('Referral link copied!')
      }}
      className="px-4 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-widest uppercase hover:bg-orange-500 transition-colors shrink-0"
    >
      Copy
    </button>
  </div>
</div>
                </div>

                <div className="bg-sf-surface p-8">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
                    Notifications
                  </p>
                  {[
                    { label: 'Match Alerts',       desc: 'Get notified before matches' },
                    { label: 'News Updates',        desc: 'Latest news and announcements' },
                    { label: 'Membership Renewal',  desc: 'Reminders before renewal' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-sf-border last:border-0">
                      <div>
                        <p className="text-[13px] text-sf-text font-semibold">{item.label}</p>
                        <p className="text-[11px] text-sf-muted">{item.desc}</p>
                      </div>
                      <div className="w-10 h-5 bg-sf-orange rounded-full relative cursor-pointer shrink-0">
                        <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-sf-surface p-8">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
                    Danger Zone
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-3 border border-red-500/20 text-red-400 text-[12px] font-bold tracking-[0.12em] uppercase hover:bg-red-500/10 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
} 