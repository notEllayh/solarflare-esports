import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import logo from '../assets/Logos/RedLogo.png'

// ── Interfaces ───────────────────────────────────────────
interface Membership {
  tier:       string
  plan_name:  string
  status:     string
  started_at: string
  expires_at: string
}

interface PointsLog {
  action:     string
  points:     number
  created_at: string
}

interface LeaderboardEntry {
  user_id: string
  points:  number
}

interface PointsData {
  points:      number
  rank:        number | null
  log:         PointsLog[]
  leaderboard: LeaderboardEntry[]
}

// ── Static Data ──────────────────────────────────────────
const CONTENT_FEED = [
  { id: 1, title: 'Behind the Scenes — Free Fire Training Camp',   thumb: '🎬', duration: '8:24',       tag: 'Exclusive'   },
  { id: 2, title: 'Player Spotlight — Tennyson Chess Masterclass', thumb: '♟️', duration: '12:10',      tag: 'Exclusive'   },
  { id: 3, title: 'Match Highlights — FFWS Africa Qualifiers',     thumb: '🎮', duration: '3:45',       tag: 'New'         },
  { id: 4, title: 'How Solar Flare Dominates the Meta',            thumb: '🔥', duration: '5 min read', tag: 'Deep Dive'   },
  { id: 5, title: 'Exclusive Q&A with Coach Drex',                 thumb: '🎤', duration: '22:30',      tag: 'Members Only'},
  { id: 6, title: 'Bloopers & Team Moments — January Edition',     thumb: '😂', duration: '6:15',       tag: 'Fun'         },
]

const EVENTS = [
  { id: 1, title: 'Private FIFA Tournament',      date: 'Sunday, May 11',   time: '6:00 PM WAT', tag: 'Members Only', emoji: '🏆' },
  { id: 2, title: 'Free Fire Community Scrim',    date: 'Saturday, May 17', time: '4:00 PM WAT', tag: 'Members Only', emoji: '🎮' },
  { id: 3, title: 'Chess Workshop with Tennyson', date: 'Friday, May 23',   time: '7:00 PM WAT', tag: 'Exclusive',    emoji: '♟️' },
]

const BENEFITS = [
  { emoji: '👕', title: 'Early Merch Access',  desc: 'Shop new drops 48hrs before the public'    },
  { emoji: '💬', title: 'Private Community',   desc: 'Members-only Discord channels and chat'    },
  { emoji: '🎥', title: 'Exclusive Content',   desc: 'Behind the scenes, player vlogs and more'  },
  { emoji: '🎁', title: 'Monthly Giveaways',   desc: 'Win jerseys, gear and signed merchandise'  },
  { emoji: '🏆', title: 'Tournament Access',   desc: 'Enter private members-only tournaments'    },
  { emoji: '⚡', title: 'Priority Support',    desc: 'Fast-track responses from the SF team'     },
]

const HOW_TO_EARN = [ 
  { emoji: '👋', action: 'Join Flame Society',       points: 500  },
  { emoji: '🎥', action: 'Watch exclusive content',  points: 50   },
  { emoji: '🛍️', action: 'Buy merch from the store', points: 700 },
  { emoji: '👥', action: 'Invite a friend',          points: 300  },
  { emoji: '💬', action: 'Engage in community',      points: 25   },
  { emoji: '🏆', action: 'Win a tournament',         points: 1000 },
]

// ── Countdown ────────────────────────────────────────────
function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000) / 60000),
        secs:  Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex gap-3 flex-wrap">
      {[
        { label: 'Days',  value: timeLeft.days  },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins',  value: timeLeft.mins  },
        { label: 'Secs',  value: timeLeft.secs  },
      ].map((unit) => (
        <div key={unit.label} className="flex flex-col items-center bg-[#1a1a1d] border border-[#2a2a2e] px-4 py-3 min-w-16">
          <span className="font-condensed font-black text-[28px] leading-none text-sf-orange">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#aaaaaa] mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Header ───────────────────────────────────────────────
function DashboardHeader({ onSignOut }: { onSignOut: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#060607] border-b-2 border-[#2a2a2e] h-16 flex items-center justify-between px-6 md:px-10">
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="Solar Flare Logo" className="w-8 h-8 object-contain" />
        <div>
          <p className="font-condensed font-black text-[14px] uppercase text-white leading-none">Solar Flare</p>
          <p className="text-[9px] font-bold tracking-widest uppercase text-sf-orange leading-none">Flame Society</p>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {[
          { label: 'Dashboard', href: '#dashboard' },
          { label: 'Drops',     href: '#drops'     },
          { label: 'Community', href: '#community' },
        ].map((item) => (
          <a key={item.label} href={item.href}
            className="px-4 py-2 text-[11px] font-bold tracking-widest uppercase text-[#aaaaaa] hover:text-white hover:bg-[#1a1a1d] transition-all duration-150"
          >
            {item.label}
          </a>
        ))}
        <Link to="/account"
          className="px-4 py-2 text-[11px] font-bold tracking-widests uppercase text-[#aaaaaa] hover:text-white hover:bg-[#1a1a1d] transition-all duration-150"
        >
          Profile
        </Link>
        <button onClick={onSignOut}
          className="ml-2 px-4 py-2 text-[11px] font-bold tracking-widest uppercase text-[#aaaaaa] hover:text-red-400 transition-colors"
        >
          Sign Out
        </button>
      </nav>

      <button className="md:hidden flex flex-col gap-1.25 p-2" onClick={() => setMenuOpen(!menuOpen)}>
        <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: 'white', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#060607] border-b-2 border-[#2a2a2e] md:hidden">
          <div className="flex flex-col px-6 py-4 gap-2">
            {['Dashboard', 'Drops', 'Community'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="py-2 text-[13px] font-bold tracking-widest uppercase text-white border-b border-[#2a2a2e]"
              >
                {item}
              </a>
            ))}
            <Link to="/account" onClick={() => setMenuOpen(false)}
              className="py-2 text-[13px] font-bold tracking-widest uppercase text-white border-b border-[#2a2a2e]"
            >
              Profile
            </Link>
            <button onClick={onSignOut} className="py-2 text-[13px] font-bold tracking-widest uppercase text-red-400 text-left">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

// ── Main Page ────────────────────────────────────────────
export default function FlameSocietyDashboard() {
  const { user, session, signOut, loading } = useAuth()
  const navigate = useNavigate()

  const [membership,    setMembership]    = useState<Membership | null>(null)
  const [pointsData,    setPointsData]    = useState<PointsData>({ points: 0, rank: null, log: [], leaderboard: [] })
  const [loadingPoints, setLoadingPoints] = useState(true)
  const [showEarnModal, setShowEarnModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  const fetchData = useCallback(async () => {
    if (!session?.access_token) return
    try {
      // Fetch membership
      const memberRes = await api.get<{ membership: Membership | null }>(
        '/api/membership/status',
        { Authorization: `Bearer ${session.access_token}` }
      )
      setMembership(memberRes.membership)
      if (!memberRes.membership) { navigate('/flame-society'); return }

      // Award join points (silently — will fail if already awarded)
      api.post(
        '/api/points/award',
        { action: 'joined_flame_society' },
        { Authorization: `Bearer ${session.access_token}` }
      ).catch(() => {})

      // Fetch points
      const pointsRes = await api.get<{ success: boolean } & PointsData>(
        '/api/points',
        { Authorization: `Bearer ${session.access_token}` }
      )
      setPointsData({
        points:      pointsRes.points      ?? 0,
        rank:        pointsRes.rank        ?? null,
        log:         pointsRes.log         ?? [],
        leaderboard: pointsRes.leaderboard ?? [],
      })
    } catch {
      navigate('/flame-society')
    } finally {
      setLoadingPoints(false)
    }
  }, [session, navigate])

  useEffect(() => { fetchData() }, [fetchData])

  // Track which content items have been watched this session
 const [watchedContent, setWatchedContent] = useState<Set<number>>(new Set())
  // Award points for watching content
 const handleWatchContent = async (contentId: number) => {
  if (!session?.access_token) return
  if (watchedContent.has(contentId)) return // already watched this session 
      try {
    const res = await api.post<{ success: boolean; points: number; total: number }>(
      '/api/points/award',
      { action: 'watched_content', meta: { contentId } },
      { Authorization: `Bearer ${session.access_token}` }
    )
    if (res.success) {
      setWatchedContent((prev) => new Set([...prev, contentId]))
      // Update points display
      setPointsData((prev) => ({
        ...prev,
        points: res.total,
        log: [
          { action: `watched_content:${contentId}`, points: res.points, created_at: new Date().toISOString() },
          ...prev.log,
        ],
      }))
    }
  } catch { /* already watched */ } 
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#060607] flex items-center justify-center">
      <span className="w-10 h-10 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
    </div>
  )

  if (!user) return null

  const name       = user.user_metadata?.name || user.email?.split('@')[0] || 'Flame Member'
  const tierLabel  = membership?.plan_name ?? 'Flame Member'
  const userPoints = pointsData.points
  const userRank   = pointsData.rank ?? 0

  const tierColors: Record<string, string> = {
    spark: '#FF6A00', flare: '#FFB800', solar: '#FFE566',
  }
  const tierColor = tierColors[membership?.tier ?? 'spark'] ?? '#FF6A00'

  // Progress to next tier
  const nextTierPoints = 2000
  const progressPct    = Math.min(Math.round((userPoints / nextTierPoints) * 100), 100)

  return (
    <>
      <SEO url="/flame-society/dashboard" title="Flame Society Dashboard" noIndex />
      <DashboardHeader onSignOut={handleSignOut} />

      <div className="bg-[#060607] min-h-screen pt-16">

        {/* ── HERO ── */}
        <div
          id="dashboard"
          className="relative overflow-hidden px-6 md:px-10 py-16 border-b-2 border-[#2a2a2e]"
          style={{ background: `radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,106,0,0.15) 0%, transparent 70%), #060607` }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(255,106,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />

          <div className="relative max-w-275 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">Welcome back</p>
                <h1 className="font-condensed font-black uppercase leading-none text-white mb-4" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
                  {name} 🔥
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  <div className="flex items-center gap-2 bg-[#1a1a1d] border border-[#2a2a2e] px-4 py-2">
                    <span className="text-[12px] font-bold uppercase text-[#aaaaaa]">Tier</span>
                    <span className="font-condensed font-black text-[14px] uppercase" style={{ color: tierColor }}>{tierLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#1a1a1d] border border-[#2a2a2e] px-4 py-2">
                    <span className="text-[12px] font-bold uppercase text-[#aaaaaa]">Flare Points</span>
                    {loadingPoints ? (
                      <span className="w-4 h-4 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
                    ) : (
                      <span className="font-condensed font-black text-[14px] uppercase text-sf-orange">
                        {userPoints.toLocaleString()} XP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 bg-[#1a1a1d] border border-[#2a2a2e] px-4 py-2">
                    <span className="text-[12px] font-bold uppercase text-[#aaaaaa]">Rank</span>
                    {loadingPoints ? (
                      <span className="w-4 h-4 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
                    ) : (
                      <span className="font-condensed font-black text-[14px] uppercase text-white">
                        {userRank > 0 ? `#${userRank}` : 'Unranked'}
                      </span>
                    )}
                  </div>
                </div>

                <a href="#content" className="inline-flex items-center gap-2 px-8 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors">
                  Continue Your Journey →
                </a>
              </div>

              {/* Tier badge */}
              <div className="shrink-0 hidden md:flex flex-col items-center gap-3">
                <div
                  className="w-32 h-32 flex items-center justify-center text-[56px]"
                  style={{ background: `linear-gradient(135deg, ${tierColor}22, ${tierColor}44)`, border: `2px solid ${tierColor}` }}
                >
                  {membership?.tier === 'solar' ? '☀️' : membership?.tier === 'flare' ? '⚡' : '🔥'}
                </div>
                <p className="font-condensed font-black text-[14px] uppercase tracking-widest" style={{ color: tierColor }}>
                  {tierLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-275 mx-auto px-6 md:px-10 py-12 flex flex-col gap-16">

          {/* ── QUICK ACTIONS ── */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">Quick Actions</p>
            <h2 className="font-condensed font-black text-[36px] uppercase text-white leading-none mb-8">What's Next</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { emoji: '🎥', label: 'Watch Exclusive Content', href: '#content',          external: false },
                { emoji: '💬', label: 'Join Community',          href: 'https://discord.com', external: true  },
                { emoji: '🛍️', label: 'View Upcoming Drop',     href: '#drops',             external: false },
                { emoji: '🎮', label: 'Enter Tournament',        href: '#events',            external: false },
              ].map((action) =>
                action.external ? (
                  <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-[#1a1a1d] border-2 border-[#2a2a2e] hover:border-sf-orange transition-all duration-200 group text-center"
                  >
                    <span className="text-[36px] group-hover:scale-110 transition-transform duration-200">{action.emoji}</span>
                    <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-white leading-tight">{action.label}</span>
                  </a>
                ) : (
                  <a key={action.label} href={action.href}
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-[#1a1a1d] border-2 border-[#2a2a2e] hover:border-sf-orange transition-all duration-200 group text-center"
                  >
                    <span className="text-[36px] group-hover:scale-110 transition-transform duration-200">{action.emoji}</span>
                    <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-white leading-tight">{action.label}</span>
                  </a>
                )
              )}
            </div>
          </div>

          {/* ── CONTENT FEED ── */}
          <div id="content">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">Members Only</p>
                <h2 className="font-condensed font-black text-[36px] uppercase text-white leading-none">Exclusive Content</h2>
              </div>
              <span className="text-[11px] font-bold uppercase text-[#aaaaaa] hidden md:block">Updated weekly</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CONTENT_FEED.map((item) => (
  <div
    key={item.id}
    onClick={() => handleWatchContent(item.id)}
    className={`bg-[#1a1a1d] border transition-all duration-200 cursor-pointer group ${
      watchedContent.has(item.id) ? 'border-green-600' : 'border-[#2a2a2e] hover:border-sf-orange'
    }`}
  >
    <div className="aspect-video bg-[#242428] flex items-center justify-center relative border-b border-[#2a2a2e]">
      <span className="text-[48px] group-hover:scale-110 transition-transform duration-300">{item.thumb}</span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-12 h-12 bg-sf-orange flex items-center justify-center">
          <span className="text-white text-[20px] ml-1">▶</span>
        </div>
      </div>
      <div className="absolute top-2 left-2 text-[9px] font-black tracking-widest uppercase px-2 py-1 bg-sf-orange text-white">
        {item.tag}
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-[#060607] px-2 py-0.5 border border-[#2a2a2e]">
        {item.duration}
      </div>
      {watchedContent.has(item.id) && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-[9px] font-black px-2 py-1">
          ✓ Watched
        </div>
      )}
    </div>
    <div className="p-4">
      <p className="text-[13px] font-bold text-white leading-snug group-hover:text-sf-orange transition-colors">
        {item.title}
      </p>
      <p className={`text-[10px] mt-1 font-semibold ${watchedContent.has(item.id) ? 'text-green-400' : 'text-sf-orange'}`}>
        {watchedContent.has(item.id) ? '✓ +50 XP earned' : '+50 XP for watching'}
      </p>
    </div>
  </div>
              ))}
            </div>
          </div>

          {/* ── LEADERBOARD + FLARE POINTS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Leaderboard */}
            <div className="bg-[#1a1a1d] border border-[#2a2a2e] p-6">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-2">All Time</p>
              <h2 className="font-condensed font-black text-[28px] uppercase text-white leading-none mb-6">Top Fans</h2>

              {loadingPoints ? (
                <div className="flex items-center gap-3 text-[#aaaaaa] py-8 justify-center">
                  <span className="w-5 h-5 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
                  Loading leaderboard...
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {pointsData.leaderboard.length > 0 ? (
                    pointsData.leaderboard.map((entry, i) => {
                      const rank = i + 1
                      const isMe = entry.user_id === user.id
                      return (
                        <div
                          key={entry.user_id}
                          className={`flex items-center gap-4 px-4 py-3 border ${
                            isMe
                              ? 'border-sf-orange bg-[#FF6A00]/10'
                              : rank === 1
                              ? 'border-sf-orange bg-[#FF6A00]/5'
                              : 'border-[#2a2a2e] bg-[#242428]'
                          }`}
                        >
                          <span className={`font-condensed font-black text-[20px] w-8 text-center ${
                            rank === 1 ? 'text-sf-orange' :
                            rank === 2 ? 'text-[#aaaaaa]' :
                            rank === 3 ? 'text-[#cd7f32]' : 'text-[#555555]'
                          }`}>
                            {rank === 1 ? '👑' : `#${rank}`}
                          </span>
                          <span className={`flex-1 text-[13px] font-bold ${isMe ? 'text-sf-orange' : 'text-white'}`}>
                            {isMe ? `${name} (You)` : `Member #${rank}`}
                          </span>
                          <span className="text-[12px] font-black text-sf-orange">
                            {entry.points.toLocaleString()} pts
                          </span>
                        </div>
                      )
                    })
                  ) : (
                    // Fallback placeholder leaderboard
                    [
                      { rank: 1, name: '@blaze_official', points: 3200 },
                      { rank: 2, name: '@sf_legend',      points: 2800 },
                      { rank: 3, name: '@flare_nation',   points: 2500 },
                    ].map((entry) => (
                      <div key={entry.rank} className={`flex items-center gap-4 px-4 py-3 border ${entry.rank === 1 ? 'border-sf-orange bg-[#FF6A00]/5' : 'border-[#2a2a2e] bg-[#242428]'}`}>
                        <span className={`font-condensed font-black text-[20px] w-8 text-center ${entry.rank === 1 ? 'text-sf-orange' : entry.rank === 2 ? 'text-[#aaaaaa]' : 'text-[#cd7f32]'}`}>
                          {entry.rank === 1 ? '👑' : `#${entry.rank}`}
                        </span>
                        <span className="flex-1 text-[13px] font-bold text-white">{entry.name}</span>
                        <span className="text-[12px] font-black text-sf-orange">{entry.points.toLocaleString()} pts</span>
                      </div>
                    ))
                  )}

                  {/* Current user row */}
                  {!loadingPoints && userPoints > 0 && (
                    <div className="flex items-center gap-4 px-4 py-3 border-2 border-sf-orange bg-[#FF6A00]/10 mt-2">
                      <span className="font-condensed font-black text-[20px] w-8 text-center text-sf-orange">
                        {userRank > 0 ? `#${userRank}` : '—'}
                      </span>
                      <span className="flex-1 text-[13px] font-bold text-sf-orange">You</span>
                      <span className="text-[12px] font-black text-sf-orange">{userPoints.toLocaleString()} pts</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setShowEarnModal(true)}
                className="mt-4 w-full py-3 border-2 border-[#2a2a2e] text-white text-[11px] font-bold tracking-widest uppercase hover:border-sf-orange hover:text-sf-orange transition-colors"
              >
                How to Earn Flare Points →
              </button>
            </div>

            {/* Flare Points card */}
            <div className="bg-[#1a1a1d] border border-[#2a2a2e] p-6">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-2">Your Progress</p>
              <h2 className="font-condensed font-black text-[28px] uppercase text-white leading-none mb-2">Flare Points</h2>

              {loadingPoints ? (
                <div className="flex items-center gap-3 text-[#aaaaaa] py-8">
                  <span className="w-5 h-5 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
                  Loading points...
                </div>
              ) : (
                <>
                  <p
                    className="font-condensed font-black text-[56px] leading-none mb-1"
                    style={{
                      background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {userPoints.toLocaleString()}
                  </p>
                  <p className="text-[12px] text-[#aaaaaa] mb-6">XP earned total</p>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase text-[#aaaaaa]">Next tier at {nextTierPoints.toLocaleString()} XP</span>
                      <span className="text-[11px] font-bold text-white">{progressPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a2e]">
                      <div
                        className="h-2 transition-all duration-500"
                        style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
                      />
                    </div>
                  </div>

                  {/* Activity log */}
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#aaaaaa] mb-3">Recent Activity</p>
                  <div className="flex flex-col gap-2">
                    {pointsData.log.length > 0 ? (
                      pointsData.log.slice(0, 5).map((entry, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#2a2a2e] last:border-0">
                          <div>
                            <p className="text-[12px] font-semibold text-white capitalize">
                              {entry.action.replace(/_/g, ' ')}
                            </p>
                            <p className="text-[10px] text-[#aaaaaa]">
                              {new Date(entry.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <span className="text-[13px] font-black text-green-400">+{entry.points} XP</span>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center">
                        <p className="text-[13px] text-[#aaaaaa]">No activity yet</p>
                        <p className="text-[11px] text-[#aaaaaa] mt-1">Watch content or engage to earn Flare Points!</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── DROPS ── */}
          <div id="drops">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">Coming Soon</p>
            <h2 className="font-condensed font-black text-[36px] uppercase text-white leading-none mb-8">Drops & Rewards</h2>

            <div
              className="relative overflow-hidden p-8 md:p-12 border-2 border-sf-orange"
              style={{ background: 'linear-gradient(135deg, #1a0a00, #0a0a0b)' }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(255,106,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.08) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-sf-orange bg-[#1a0800] px-3 py-1 border border-sf-orange">
                    Members Get Early Access
                  </span>
                  <h3 className="font-condensed font-black text-[32px] md:text-[40px] uppercase text-white leading-none mt-4 mb-2">
                    Champion Edition Jersey
                  </h3>
                  <p className="text-[14px] text-[#aaaaaa] mb-6">
                    Limited to 200 units. Members get 48hr early access before public release.
                  </p>
                  <Countdown targetDate="2026-05-20T18:00:00" />
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <div className="text-[80px] text-center">👕</div>
                  <button className="px-8 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors">
                    Notify Me →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── EVENTS ── */}
          <div id="events">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">Members Only</p>
            <h2 className="font-condensed font-black text-[36px] uppercase text-white leading-none mb-8">Events & Tournaments</h2>

            <div className="flex flex-col gap-2">
              {EVENTS.map((event) => (
                <div key={event.id}
                  className="flex items-center justify-between gap-4 bg-[#1a1a1d] border border-[#2a2a2e] px-6 py-5 hover:border-sf-orange transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[32px]">{event.emoji}</span>
                    <div>
                      <span className="text-[9px] font-black tracking-widest uppercase text-sf-orange bg-[#1a0800] px-2 py-0.5 border border-sf-orange/50">
                        {event.tag}
                      </span>
                      <p className="font-condensed font-black text-[18px] uppercase text-white leading-tight mt-1">
                        {event.title}
                      </p>
                      <p className="text-[12px] text-[#aaaaaa] mt-0.5">{event.date} · {event.time}</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-sf-orange text-white text-[11px] font-bold tracking-widest uppercase hover:bg-orange-500 transition-colors shrink-0">
                    Join →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── BENEFITS ── */}
          <div id="community">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">Why You're Here</p>
            <h2 className="font-condensed font-black text-[36px] uppercase text-white leading-none mb-8">Member Benefits</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title}
                  className="bg-[#1a1a1d] border border-[#2a2a2e] p-6 hover:border-sf-orange transition-colors duration-200"
                >
                  <span className="text-[32px] block mb-4">{benefit.emoji}</span>
                  <h3 className="font-condensed font-black text-[18px] uppercase text-white mb-2">{benefit.title}</h3>
                  <p className="text-[13px] text-[#aaaaaa] leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM CTA ── */}
          <div className="border-t-2 border-[#2a2a2e] pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-condensed font-black text-[28px] uppercase text-white">Upgrade Your Membership</p>
              <p className="text-[13px] text-[#aaaaaa] mt-1">Unlock more perks, higher points multipliers and exclusive drops.</p>
            </div>
            <Link to="/flame-society"
              className="px-8 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors shrink-0"
            >
              View Plans →
            </Link>
          </div>
        </div>
      </div>

      {/* ── HOW TO EARN MODAL ── */}
      {showEarnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#060607]" style={{ opacity: 0.92 }} onClick={() => setShowEarnModal(false)} />
          <div className="relative w-full max-w-lg bg-[#0e0e10] border-2 border-[#2a2a2e] p-8 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowEarnModal(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white bg-[#2a2a2e] hover:bg-sf-orange transition-colors font-bold"
            >
              ✕
            </button>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-2">Points System</p>
            <h3 className="font-condensed font-black text-[28px] uppercase text-white mb-6">How to Earn Flare Points</h3>
            <div className="flex flex-col gap-2">
              {HOW_TO_EARN.map((item) => (
                <div key={item.action} className="flex items-center justify-between px-4 py-3 bg-[#1a1a1d] border border-[#2a2a2e]">
                  <div className="flex items-center gap-3">
                    <span className="text-[20px]">{item.emoji}</span>
                    <span className="text-[13px] font-semibold text-white">{item.action}</span>
                  </div>
                  <span className="text-[13px] font-black text-sf-orange">+{item.points} XP</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#aaaaaa] mt-4">
              Flare Points accumulate over time. Top earners appear on the leaderboard.
            </p>
          </div>
        </div>
      )}
    </>
  )
} 