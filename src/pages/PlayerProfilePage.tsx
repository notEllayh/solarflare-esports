import SEO from '../components/SEO'
import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { players, divisionIdMap } from '../data/siteData'
//import { div } from 'framer-motion/m'

export default function PlayerProfilePage() {
  const { id } = useParams<{ id: string }>()
  const player = players.find((p) => p.id === id)
  const [imgError, setImgError] = useState(false)

  if (!player) return <Navigate to="/roster" replace />

  const teammates = players.filter(
    (p) => p.division === player.division && p.id !== player.id
  )

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
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(255,106,0,0.1) 0%, transparent 70%)',
          }}
        />
        {/* Grid */}
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
          style={{
            fontSize: 'clamp(120px, 18vw, 220px)',
            opacity: 0.03,
            color: '#fff',
          }}
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
              {!imgError ? (
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
              {/* Country flag */}
              <div className="absolute top-3 right-3 text-[24px]">
                {player.country}
              </div>
              {/* Gradient fade at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: 'linear-gradient(to top, #060607 0%, transparent 100%)' }}
              />
            </div>

            {/* Player info */}
            <div className="pb-10">
              <div className="inline-flex items-center gap-2 border border-sf-border px-3 py-1.5 mb-4">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-orange">
                  {player.role}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted">
                  {player.division}
                </span>
              </div>

              <h1
                className="font-condensed font-black uppercase leading-none text-sf-text mb-1"
                style={{ fontSize: 'clamp(64px, 10vw, 112px)' }}
              >
                {player.alias}
              </h1>

              <p className="text-sf-muted text-[18px] font-light mb-6">
                {player.realName}
              </p>

              {/* Quick details */}
              <div className="flex flex-wrap gap-0.5 mb-8">
                {[
                  { label: 'Nationality', value: player.nationality },
                  { label: 'Age',         value: `${player.age} yrs` },
                  { label: 'Joined',      value: player.joinedYear },
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

              {/* Social links */}
              <div className="flex gap-2 flex-wrap">
                {player.socials.map((s) => (
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
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                About
              </p>
              <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-6">
                Bio
              </h2>
              <p className="text-sf-muted text-[15px] leading-relaxed max-w-2xl">
                {player.bio}
              </p>
            </div>

            {/* Stats */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                Performance
              </p>
              <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-8">
                Stats
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5">
                {player.stats.map((stat) => (
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

            {/* Achievements */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                Honours
              </p>
              <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-8">
                Achievements
              </h2>
              <div className="flex flex-col gap-0.5">
                {player.achievements.map((a, i) => (
                  <div
                    key={i}
                    className="bg-sf-surface px-6 py-4 flex items-center gap-4 hover:bg-[#222226] transition-colors duration-200"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
                    />
                    <p className="font-condensed font-bold text-[17px] uppercase text-sf-text">
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="flex flex-col gap-6">

            {/* Teammates */}
            {teammates.length > 0 && (
              <div>
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                  {player.division}
                </p>
                <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text leading-none mb-5">
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
                      <span className="text-sf-muted text-sm group-hover:text-sf-orange transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Division link */}
            <Link
            to={`/teams/${divisionIdMap[player.division] ?? 'freefire'}`}
                 className="flex items-center justify-between px-6 py-4 bg-sf-surface text-sf-text text-[12px] font-bold tracking-widest uppercase hover:bg-[#222226] transition-colors duration-200 group"
>
                View {player.division} Team
             <span className="text-sf-muted group-hover:text-sf-orange transition-colors">→</span>
             </Link>

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

            {/* Back */}
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