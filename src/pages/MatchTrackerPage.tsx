import { useState } from 'react'
import { Link } from 'react-router-dom'
import { matches, type Match, type MatchStatus } from '../data/siteData'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
//import { div } from 'framer-motion/m'

const statusConfig = {
  live: {
    label: 'Live',
    dot: 'bg-red-500 animate-pulse',
    badge: 'bg-red-500/15 text-red-400 border border-red-500/20',
  },
  upcoming: {
    label: 'Upcoming',
    dot: 'bg-sf-orange',
    badge: 'bg-orange-500/15 text-sf-orange border border-orange-500/20',
  },
  completed: {
    label: 'Completed',
    dot: 'bg-white/20',
    badge: 'bg-white/5 text-sf-muted border border-white/10',
  },
}

const divisionFilters = ['All', 'Free Fire', 'Chess', 'eFootball', 'EA FC 25']
const statusFilters: { label: string; value: MatchStatus | 'all' }[] = [
  { label: 'All',       value: 'all' },
  { label: 'Live',      value: 'live' },
  { label: 'Upcoming',  value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
]

function TeamLogo({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false)
  return (
    <div className="w-10 h-10 bg-sf-mid flex items-center justify-center shrink-0 overflow-hidden">
      {!error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="w-full h-full object-contain p-1"
        />
      ) : (
        <span className="font-condensed font-black text-[14px] text-white/30">
          {name.charAt(0)}
        </span>
      )}
    </div>
  )
}

function MatchCard({ match }: { match: Match }) {
  const config = statusConfig[match.status]
  const sfWon =
    match.status === 'completed' &&
    match.teamA.name === 'Solar Flare' &&
    (match.teamA.score ?? 0) > (match.teamB.score ?? 0)
  const sfLost =
    match.status === 'completed' &&
    match.teamA.name === 'Solar Flare' &&
    (match.teamA.score ?? 0) < (match.teamB.score ?? 0)

  return (
    <div className="bg-sf-surface hover:bg-[#222226] transition-colors duration-200">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-sf-border">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 ${config.badge}`}>
            {config.label}
          </span>
          <span className="text-[11px] text-sf-muted">{match.tournament} · {match.stage}</span>
        </div>
        <span className="text-[11px] text-sf-orange font-semibold">{match.division}</span>
      </div>

      {/* Match row */}
      <div className="px-5 py-5 flex items-center gap-4">
        {/* Team A */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TeamLogo src={match.teamA.logo} name={match.teamA.name} />
          <span
            className={`font-condensed font-black text-[18px] uppercase truncate ${
              sfWon ? 'text-green-400' : sfLost ? 'text-sf-muted' : 'text-sf-text'
            }`}
          >
            {match.teamA.name}
          </span>
        </div>

        {/* Score / vs */}
        <div className="flex items-center gap-3 shrink-0">
          {match.status === 'completed' ? (
            <div className="flex items-center gap-2">
              <span
                className={`font-condensed font-black text-[32px] leading-none ${
                  sfWon ? 'text-green-400' : 'text-sf-text'
                }`}
              >
                {match.teamA.score}
              </span>
              <span className="text-sf-muted font-condensed font-black text-[20px]">–</span>
              <span
                className={`font-condensed font-black text-[32px] leading-none ${
                  sfLost ? 'text-red-400' : 'text-sf-text'
                }`}
              >
                {match.teamB.score}
              </span>
            </div>
          ) : match.status === 'live' ? (
            <div className="flex items-center gap-2">
              <span className="font-condensed font-black text-[32px] leading-none text-sf-text">
                {match.teamA.score ?? 0}
              </span>
              <span className="text-red-400 font-condensed font-black text-[14px] animate-pulse">LIVE</span>
              <span className="font-condensed font-black text-[32px] leading-none text-sf-text">
                {match.teamB.score ?? 0}
              </span>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-condensed font-black text-[13px] uppercase text-sf-muted">vs</p>
              <p className="text-[11px] text-sf-muted/60 mt-0.5">{match.time}</p>
            </div>
          )}
        </div>

        {/* Team B */}
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <span className="font-condensed font-black text-[18px] uppercase text-sf-text truncate text-right">
            {match.teamB.name}
          </span>
          <TeamLogo src={match.teamB.logo} name={match.teamB.name} />
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-sf-border">
        <span className="text-[11px] text-sf-muted">
          {match.date} · {match.time}
        </span>
        <div className="flex gap-2">
          {match.recap && (
            <Link
              to={match.recap}
              className="text-[10px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-3 py-1.5 hover:border-sf-orange hover:text-sf-orange transition-all duration-200"
            >
              Match Recap
            </Link>
          )}
          {match.streamUrl && match.status !== 'completed' && (
            <a
              href={match.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 transition-all duration-200 ${
                match.status === 'live'
                  ? 'bg-red-500 text-white hover:bg-red-600 border border-red-500'
                  : 'text-white bg-sf-orange border border-sf-orange hover:bg-orange-500'
              }`}
            >
              {match.status === 'live' ? '● Watch Live' : 'Set Reminder'}
            </a>
          )}
          {match.ticketUrl && match.status === 'upcoming' && (
            <a
              href={match.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-3 py-1.5 hover:border-white/30 hover:text-sf-text transition-all duration-200"
            >
              Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MatchTrackerPage() {
  const [divisionFilter, setDivisionFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState<MatchStatus | 'all'>('all')
  // const [now, setNow] = useState(new Date())

  // Tick every minute to keep "live" states fresh
 //useEffect(() => {
  //const interval = setInterval(() => setNow(new Date()), 60000)
  //return () => clearInterval(interval)
//}, []) 

  const filtered = matches.filter((m) => {
    const divMatch = divisionFilter === 'All' || m.division === divisionFilter
    const statusMatch = statusFilter === 'all' || m.status === statusFilter
    return divMatch && statusMatch
  })

  const liveMatches     = filtered.filter((m) => m.status === 'live')
  const upcomingMatches = filtered.filter((m) => m.status === 'upcoming')
  const completedMatches = filtered.filter((m) => m.status === 'completed')

  const nextMatch = matches
    .filter((m) => m.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  return (
    <>
      <SEO
        url="/matches"
        title="Match Tracker"
        description="Live scores, upcoming fixtures and completed results for all Solar Flare Esports divisions."
      />

      <PageHero
        eyebrow="Schedule & Results"
        title="Match Tracker"
        subtitle="Live scores, upcoming fixtures, and full results across all Solar Flare divisions."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">

        {/* Next match countdown banner */}
        {nextMatch && (
          <div
            className="relative overflow-hidden p-6 md:p-8 mb-12 border border-sf-border"
            style={{
              background: 'linear-gradient(135deg, rgba(255,106,0,0.08) 0%, rgba(255,184,0,0.04) 100%)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,106,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.2) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sf-orange animate-pulse" />
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-orange">
                    Next Match
                  </span>
                </div>
                <h3
                  className="font-condensed font-black uppercase text-sf-text leading-none mb-2"
                  style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}
                >
                  {nextMatch.teamA.name} vs {nextMatch.teamB.name}
                </h3>
                <p className="text-sf-muted text-[13px]">
                  {nextMatch.tournament} · {nextMatch.stage} · {nextMatch.date} at {nextMatch.time}
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                {nextMatch.streamUrl && (
                  <a
                    href={nextMatch.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-orange-500 transition-colors duration-200"
                  >
                    Watch Live →
                  </a>
                )}
                {nextMatch.ticketUrl && (
                  <a
                    href={nextMatch.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white/20 text-sf-text text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/50 transition-colors duration-200"
                  >
                    Get Tickets
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Division filter */}
          <div className="flex gap-2 flex-wrap">
            {divisionFilters.map((d) => (
              <button
                key={d}
                onClick={() => setDivisionFilter(d)}
                className={`text-[11px] font-bold tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  divisionFilter === d
                    ? 'bg-sf-orange border-sf-orange text-white'
                    : 'border-white/15 text-sf-muted hover:border-white/40 hover:text-sf-text'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex gap-2 flex-wrap sm:ml-auto">
            {statusFilters.map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`text-[11px] font-bold tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  statusFilter === s.value
                    ? 'bg-sf-surface border-white/30 text-sf-text'
                    : 'border-white/10 text-sf-muted hover:border-white/30 hover:text-sf-text'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live matches */}
        {liveMatches.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h2 className="font-condensed font-black text-[22px] uppercase text-red-400">
                Live Now
              </h2>
            </div>
            <div className="flex flex-col gap-0.5">
              {liveMatches.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        )}

        {/* Upcoming matches */}
        {upcomingMatches.length > 0 && (
          <div className="mb-10">
            <h2 className="font-condensed font-black text-[22px] uppercase text-sf-text mb-4">
              Upcoming
            </h2>
            <div className="flex flex-col gap-0.5">
              {upcomingMatches.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        )}

        {/* Completed matches */}
        {completedMatches.length > 0 && (
          <div className="mb-10">
            <h2 className="font-condensed font-black text-[22px] uppercase text-sf-text mb-4">
              Results
            </h2>
            <div className="flex flex-col gap-0.5">
              {completedMatches.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-condensed font-black text-[32px] uppercase text-sf-muted">
              No matches found
            </p>
            <p className="text-[14px] text-sf-muted/50 mt-2">
              Try a different filter.
            </p>
          </div>
        )}

        {/* Overall record */}
        <div className="border-t border-sf-border pt-10 mt-6">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-6">
            Overall Record — 2026 Season
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
            {[
              {
                label: 'Wins',
                value: matches.filter((m) => m.status === 'completed' && (m.teamA.score ?? 0) > (m.teamB.score ?? 0)).length,
                color: 'text-green-400',
              },
              {
                label: 'Losses',
                value: matches.filter((m) => m.status === 'completed' && (m.teamA.score ?? 0) < (m.teamB.score ?? 0)).length,
                color: 'text-red-400',
              },
              {
                label: 'Upcoming',
                value: matches.filter((m) => m.status === 'upcoming').length,
                color: 'text-sf-orange',
              },
              {
                label: 'Win Rate',
                value: (() => {
                  const completed = matches.filter((m) => m.status === 'completed')
                  const wins = completed.filter((m) => (m.teamA.score ?? 0) > (m.teamB.score ?? 0)).length
                  return completed.length > 0 ? `${Math.round((wins / completed.length) * 100)}%` : '—'
                })(),
                color: 'text-sf-text',
              },
            ].map((s) => (
              <div key={s.label} className="bg-sf-surface px-6 py-5">
                <span className={`font-condensed font-black text-[40px] leading-none block ${s.color}`}>
                  {s.value}
                </span>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted mt-1 block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}