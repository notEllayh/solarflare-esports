import SEO from '../components/SEO'
import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { teamDetails, players } from '../data/siteData'
//import { div } from 'framer-motion/m'

const outcomeStyles = {
  W: 'bg-green-500/15 text-green-400 border border-green-500/20',
  L: 'bg-red-500/15 text-red-400 border border-red-500/20',
  D: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
}

export default function TeamDetailPage() {
  const { id } = useParams<{ id: string }>()
  const team = teamDetails.find((t) => t.id === id)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  if (!team) return <Navigate to="/teams" replace />

  const teamPlayers = players.filter((p) => team.roster.includes(p.id))
  const setImgError = (key: string) =>
    setImgErrors((prev) => ({ ...prev, [key]: true }))

  const wins   = team.recentResults.filter((r) => r.outcome === 'W').length
  const losses = team.recentResults.filter((r) => r.outcome === 'L').length
  const draws  = team.recentResults.filter((r) => r.outcome === 'D').length
  const winRate = team.recentResults.length > 0
    ? Math.round((wins / team.recentResults.length) * 100)
    : 0

  return (
    <div className="bg-sf-darker min-h-screen">
      <SEO
        url={`/teams/${team.id}`}
        title={team.game}
        description={team.description}
        type="website"
      />

      {/* ── HERO ── */}
      <div className="relative overflow-hidden pt-17 border-b border-sf-border">
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(255,106,0,0.1) 0%, transparent 70%)',
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
        {/* Giant emoji watermark */}
        <div
          className="absolute right-5 top-12.5 text-[320px] leading-none pointer-events-none select-none"
          style={{ opacity: 0.03 }}
        >
          {team.emoji}
        </div>

        <div className="relative z-10 max-w-275 mx-auto px-6 md:px-12 pt-12 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-sf-muted mb-10">
            <Link to="/" className="hover:text-sf-text transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/teams" className="hover:text-sf-text transition-colors">Teams</Link>
            <span className="text-white/20">/</span>
            <span className="text-sf-text">{team.game}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 border border-sf-border px-3 py-1.5 mb-5">
                <span className="text-[18px]">{team.emoji}</span>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-orange">
                  {team.category}
                </span>
              </div>

              <h1
                className="font-condensed font-black uppercase leading-none text-sf-text mb-5"
                style={{ fontSize: 'clamp(56px, 9vw, 96px)' }}
              >
                {team.game}
              </h1>
              <p className="text-sf-muted text-[15px] leading-relaxed max-w-lg">
                {team.description}
              </p>

              {/* Social links */}
              {team.socials.length > 0 && (
                <div className="flex gap-2 mt-7 flex-wrap">
                  {team.socials.map((s) => (
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
            </div>

            {/* Quick stat pills */}
            <div className="grid grid-cols-3 gap-0.5 shrink-0">
              {[
                { label: 'League',  value: team.league },
                { label: 'Region',  value: team.region },
                { label: 'Founded', value: team.founded },
              ].map((s) => (
                <div key={s.label} className="bg-sf-surface px-5 py-4 flex flex-col gap-1 text-center">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-sf-muted">
                    {s.label}
                  </span>
                  <span className="font-condensed font-black text-[15px] uppercase text-sf-text">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-16">

            {/* Roster */}
            {teamPlayers.length > 0 && (
              <div>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                      Active Roster
                    </p>
                    <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none">
                      Players
                    </h2>
                  </div>
                  <Link
                    to="/roster"
                    className="text-[11px] font-bold tracking-widest uppercase text-sf-muted hover:text-sf-text transition-colors"
                  >
                    Full Roster →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0.5">
                  {teamPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="relative bg-sf-surface overflow-hidden group cursor-pointer hover:bg-[#222226] transition-colors duration-200"
                    >
                      <div
                        className="w-full relative overflow-hidden bg-sf-mid"
                        style={{ aspectRatio: '3/4' }}
                      >
                        {!imgErrors[player.id] ? (
                          <img
                            src={player.image}
                            alt={player.alias}
                            onError={() => setImgError(player.id)}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-condensed font-black text-[48px] text-white/10 select-none">
                              {player.alias.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 text-[14px] leading-none">
                          {player.country}
                        </div>
                        <div
                          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                          style={{ background: 'linear-gradient(to top, #1C1C1F 0%, transparent 100%)' }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
                          <h3 className="font-condensed font-black text-[20px] uppercase leading-none text-sf-text">
                            {player.alias}
                          </h3>
                        </div>
                      </div>
                      <div className="px-3 pt-2.5 pb-4">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-sf-orange mb-0.5">
                          {player.role}
                        </p>
                        <p className="text-[12px] text-sf-muted">{player.realName}</p>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coaching staff */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                Coaching Staff
              </p>
              <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-8">
                Staff
              </h2>
              <div className="flex flex-col gap-0.5">
                {team.coaches.map((coach) => (
                  <div
                    key={coach.name}
                    className="bg-sf-surface flex items-center gap-5 px-6 py-5 hover:bg-[#222226] transition-colors duration-200"
                  >
                    <div className="w-14 h-14 rounded-full bg-sf-mid overflow-hidden shrink-0 flex items-center justify-center border border-white/5">
                      {!imgErrors[`coach-${coach.name}`] ? (
                        <img
                          src={coach.image}
                          alt={coach.name}
                          onError={() => setImgError(`coach-${coach.name}`)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-condensed font-black text-[20px] text-white/20">
                          {coach.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-condensed font-bold text-[20px] uppercase text-sf-text leading-tight">
                        {coach.name}
                      </h3>
                      <p className="text-[11px] font-semibold tracking-widest uppercase text-sf-orange mt-0.5">
                        {coach.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent results */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                Recent Form
              </p>
              <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none mb-8">
                Results
              </h2>

              {/* W/L/D/WR summary */}
              <div className="grid grid-cols-4 gap-0.5 mb-6">
                {[
                  { label: 'Wins',     value: wins,          color: 'text-green-400' },
                  { label: 'Losses',   value: losses,        color: 'text-red-400'   },
                  { label: 'Draws',    value: draws,         color: 'text-yellow-400'},
                  { label: 'Win Rate', value: `${winRate}%`, color: 'text-sf-text'   },
                ].map((s) => (
                  <div key={s.label} className="bg-sf-surface px-5 py-5 flex flex-col gap-1">
                    <span className={`font-condensed font-black text-[36px] leading-none ${s.color}`}>
                      {s.value}
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-sf-muted">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Results rows */}
              <div className="flex flex-col gap-0.5">
                {team.recentResults.map((result, i) => (
                  <div
                    key={i}
                    className="bg-sf-surface flex items-center justify-between px-6 py-4 gap-4 hover:bg-[#222226] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`w-8 h-8 flex items-center justify-center text-[11px] font-black shrink-0 ${outcomeStyles[result.outcome]}`}
                      >
                        {result.outcome}
                      </span>
                      <div className="min-w-0">
                        <p className="font-condensed font-bold text-[17px] uppercase text-sf-text leading-tight truncate">
                          vs {result.opponent}
                        </p>
                        <p className="text-[11px] text-sf-muted">{result.tournament}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="font-condensed font-black text-[22px] text-sf-text">
                        {result.score}
                      </span>
                      <span className="text-[11px] text-sf-muted hidden sm:block w-24 text-right">
                        {result.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="flex flex-col gap-6">

            {/* Achievements */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                Honours
              </p>
              <h2 className="font-condensed font-black text-[36px] uppercase text-sf-text leading-none mb-5">
                Achievements
              </h2>
              <div className="flex flex-col gap-[2p">
                {team.achievements.map((a, i) => (
                  <div key={i} className="bg-sf-surface p-5 hover:bg-[#222226] transition-colors duration-200">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-condensed font-bold text-[16px] uppercase text-sf-text leading-tight">
                        {a.title}
                      </h3>
                      <span
                        className="text-[10px] font-black tracking-widest text-white px-2 py-0.5 shrink-0"
                        style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
                      >
                        {a.year}
                      </span>
                    </div>
                    <p className="text-[12px] font-semibold text-sf-orange">
                      {a.placement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form guide */}
            <div className="bg-sf-surface p-6">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-4">
                Form Guide (Last {team.recentResults.length})
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {team.recentResults.map((r, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 flex items-center justify-center text-[11px] font-black ${outcomeStyles[r.outcome]}`}
                    title={`vs ${r.opponent} — ${r.score}`}
                  >
                    {r.outcome}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-sf-border" />

            {/* CTA buttons */}
            <div className="flex flex-col gap-0.5">
              <Link
                to="/roster"
                className="flex items-center justify-between px-6 py-4 bg-sf-surface text-sf-text text-[12px] font-bold tracking-widest uppercase hover:bg-[#222226] transition-colors duration-200 group"
              >
                Full Roster
                <span className="text-sf-muted group-hover:text-sf-orange transition-colors">→</span>
              </Link>
              <Link
                to="/shop"
                className="flex items-center justify-between px-6 py-4 bg-sf-surface text-sf-text text-[12px] font-bold tracking-widest uppercase hover:bg-[#222226] transition-colors duration-200 group"
              >
                Team Merch
                <span className="text-sf-muted group-hover:text-sf-orange transition-colors">→</span>
              </Link>
              <Link
                to="/flame-society"
                className="flex items-center justify-between px-6 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-widest uppercase hover:bg-orange-500 transition-colors duration-200"
              >
                Join Flame Society
                <span>→</span>
              </Link>
            </div>

            {/* Back link */}
            <Link
              to="/teams"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-sf-muted text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/30 hover:text-sf-text transition-all duration-200"
            >
              ← All Divisions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}