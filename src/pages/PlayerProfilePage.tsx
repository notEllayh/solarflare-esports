import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/useAuth'
import SEO from '../components/SEO'

interface Stat   { label: string; value: string }
interface Social { platform: string; handle: string; href: string }

interface Player {
  id:           string
  alias:        string
  real_name:    string
  role:         string
  division:     string
  country:      string
  nationality:  string
  age:          number
  image:        string
  bio:          string
  signature:    string
  stats:        Stat[]
  socials:      Social[]
  achievements: string[]
}

export default function PlayerProfilePage() {
  const { id }                    = useParams<{ id: string }>()
  const navigate                  = useNavigate()
  const { user, session }         = useAuth()

  const [player,     setPlayer]     = useState<Player | null>(null)
  const [teammates,  setTeammates]  = useState<Player[]>([])
  const [loading,    setLoading]    = useState(true)
  const [imgError,   setImgError]   = useState(false)
  const [isFav,      setIsFav]      = useState(false)
  const [favLoading, setFavLoading] = useState(false)

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await api.get<{ data: Player }>(`/api/players/${id}`)
        setPlayer(res.data)

        const all = await api.get<{ data: Player[] }>('/api/players')
        setTeammates(
          (all.data ?? []).filter(
            (p) => p.division === res.data.division && p.id !== res.data.id
          )
        )
      } catch {
        navigate('/roster', { replace: true })
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchPlayer()
  }, [id, navigate])

  // Check if already favourited
  useEffect(() => {
    const checkFav = async () => {
      if (!session?.access_token || !player) return
      try {
        const res = await api.get<{ data: { player_id: string }[] }>(
          '/api/profile/favourites',
          { Authorization: `Bearer ${session.access_token}` }
        )
        setIsFav(res.data?.some((f) => f.player_id === player.id) ?? false)
      } catch { /* ignore */ }
    }
    checkFav()
  }, [session, player])

  const toggleFav = async () => {
    if (!session?.access_token || !player) {
      navigate('/login')
      return
    }
    setFavLoading(true)
    try {
      if (isFav) {
        await api.delete(
          `/api/profile/favourites/${player.id}`,
          { Authorization: `Bearer ${session.access_token}` }
        )
        setIsFav(false)
      } else {
        await api.post(
          `/api/profile/favourites/${player.id}`,
          {},
          { Authorization: `Bearer ${session.access_token}` }
        )
        setIsFav(true)
      }
    } catch { /* ignore */ }
    finally { setFavLoading(false) }
  }

  if (loading) return (
    <div className="min-h-screen bg-sf-darker flex items-center justify-center">
      <span className="w-10 h-10 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
    </div>
  )

  if (!player) return null

  const stats        = Array.isArray(player.stats)        ? player.stats        : []
  const socials      = Array.isArray(player.socials)      ? player.socials      : []
  const achievements = Array.isArray(player.achievements) ? player.achievements : []

  return (
    <div className="bg-sf-darker min-h-screen">
      <SEO
        url={`/roster/${player.id}`}
        title={`${player.alias} — ${player.role}`}
        description={player.bio}
        image={player.image}
        type="profile"
      />

      {/* ── HERO ── */}
      <div className="relative overflow-hidden pt-17 border-b border-sf-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(255,106,0,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          }}
        />

        {/* Alias watermark */}
        <div
          className="absolute right-5 top-10 font-condensed font-black uppercase leading-none pointer-events-none select-none hidden md:block"
          style={{ fontSize: 'clamp(120px, 18vw, 220px)', opacity: 0.03, color: '#fff' }}
        >
          {player.alias}
        </div>

        <div className="relative z-10 max-w-275 mx-auto px-6 md:px-12 pt-12 pb-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-sf-muted mb-10">
            <Link to="/" className="hover:text-sf-text transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/roster" className="hover:text-sf-text transition-colors">Roster</Link>
            <span className="text-white/20">/</span>
            <span className="text-sf-text">{player.alias}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-end">

            {/* Player image */}
            <div
              className="relative overflow-hidden bg-sf-mid shrink-0 self-end"
              style={{ width: '260px', aspectRatio: '3/4' }}
            >
              {player.image && !imgError ? (
                <img
                  src={player.image}
                  alt={player.alias}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-condensed font-black text-[80px] text-white/10 select-none">
                    {player.alias.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3 text-[24px]">
                {player.country}
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: 'linear-gradient(to top, #060607 0%, transparent 100%)' }}
              />
            </div>

            {/* Player info */}
            <div className="pb-10">
              {/* Role + division badge */}
              <div className="inline-flex items-center gap-2 border border-sf-border px-3 py-1.5 mb-4">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-orange">
                  {player.role}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted">
                  {player.division}
                </span>
              </div>

              {/* Name */}
              <h1
                className="font-condensed font-black uppercase leading-none text-sf-text mb-1"
                style={{ fontSize: 'clamp(48px, 10vw, 112px)' }}
              >
                {player.alias}
              </h1>

              <p className="text-sf-muted text-[18px] font-light mb-6">
                {player.real_name}
              </p>

              {/* Quick details */}
              <div className="flex flex-wrap gap-0.5 mb-8">
                {[
                  { label: 'Nationality', value: player.nationality },
                  { label: 'Age',         value: player.age ? `${player.age} yrs` : '—' },
                  { label: 'Division',    value: player.division },
                ].map((d) => (
                  <div key={d.label} className="bg-sf-surface px-5 py-3 flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-sf-muted">
                      {d.label}
                    </span>
                    <span className="font-condensed font-bold text-[16px] uppercase text-sf-text">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Signature quote */}
              {player.signature && (
                <div className="border-l-2 border-sf-orange pl-4 mb-8">
                  <p
                    className="font-condensed font-black text-[20px] uppercase"
                    style={{
                      background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    "{player.signature}"
                  </p>
                </div>
              )}

              {/* Social links */}
              {socials.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-5">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-4 py-2 hover:border-sf-orange hover:text-sf-orange transition-all duration-200"
                    >
                      {s.platform}
                      <span className="text-white/30">·</span>
                      {s.handle}
                    </a>
                  ))}
                </div>
              )}

              {/* Favourite button */}
              <button
                onClick={toggleFav}
                disabled={favLoading}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-bold tracking-[0.12em] uppercase transition-all duration-200 border disabled:opacity-60 disabled:cursor-not-allowed ${
                  isFav
                    ? 'bg-sf-orange border-sf-orange text-white'
                    : 'border-white/20 text-sf-muted hover:border-sf-orange hover:text-sf-orange'
                }`}
              >
                {favLoading ? (
                  <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                ) : isFav ? (
                  <>❤️ Favourited</>
                ) : (
                  <>{user ? '🤍 Add to Favourites' : '🤍 Favourite'}</>
                )}
              </button>

              {!user && (
                <p className="text-[11px] text-sf-muted mt-2">
                  <Link to="/login" className="text-sf-orange hover:underline">Sign in</Link> to save favourites
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-14">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-14">

            {/* Bio */}
            {player.bio && (
              <div>
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">About</p>
                <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-6">Bio</h2>
                <p className="text-sf-muted text-[15px] leading-relaxed max-w-2xl">{player.bio}</p>
              </div>
            )}

            {/* Stats */}
            {stats.length > 0 && (
              <div>
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">Performance</p>
                <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-8">Stats</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-sf-surface px-6 py-6 flex flex-col gap-2">
                      <span
                        className="font-condensed font-black text-[40px] leading-none"
                        style={{
                          background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
              <div>
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">Honours</p>
                <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-8">Achievements</h2>
                <div className="flex flex-col gap-0.5">
                  {achievements.map((a, i) => (
                    <div
                      key={i}
                      className="bg-sf-surface px-6 py-4 flex items-center gap-4 hover:bg-[#222226] transition-colors duration-200"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
                      />
                      <p className="font-condensed font-bold text-[17px] uppercase text-sf-text">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="flex flex-col gap-4">

            {/* Teammates */}
            {teammates.length > 0 && (
              <div className="mb-2">
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                  {player.division}
                </p>
                <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text leading-none mb-4">
                  Teammates
                </h3>
                <div className="flex flex-col gap-0.5">
                  {teammates.map((t) => (
                    <Link
                      key={t.id}
                      to={`/roster/${t.id}`}
                      className="bg-sf-surface flex items-center gap-4 px-4 py-3.5 hover:bg-[#222226] transition-colors duration-200 group"
                    >
                      <div className="w-10 h-10 bg-sf-mid overflow-hidden shrink-0 flex items-center justify-center">
                        <span className="font-condensed font-black text-[16px] text-white/20 select-none">
                          {t.alias.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-condensed font-black text-[16px] uppercase text-sf-text leading-tight">
                          {t.alias}
                        </p>
                        <p className="text-[11px] text-sf-muted truncate">{t.role}</p>
                      </div>
                      <span className="text-sf-muted text-sm group-hover:text-sf-orange transition-colors">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              to="/shop"
              className="flex items-center justify-between px-6 py-4 bg-sf-surface text-sf-text text-[12px] font-bold tracking-widest uppercase hover:bg-[#222226] transition-colors duration-200 group"
            >
              Player Merch
              <span className="text-sf-muted group-hover:text-sf-orange transition-colors">→</span>
            </Link>

            <Link
              to="/flame-society"
              className="flex items-center justify-between px-6 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-widest uppercase hover:bg-orange-500 transition-colors duration-200"
            >
              Join Flame Society
              <span>→</span>
            </Link>

            <Link
              to="/roster"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-sf-muted text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/30 hover:text-sf-text transition-all duration-200"
            >
              ← Full Roster
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}