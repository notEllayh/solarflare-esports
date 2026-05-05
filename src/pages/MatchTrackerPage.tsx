import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'

interface Match {
  id:         string
  division:   string
  tournament: string
  stage:      string
  date:       string
  time:       string
  status:     string
  team_a:     { name: string; score?: number }
  team_b:     { name: string; score?: number }
  stream_url: string
  ticket_url: string
}

const statusColors: Record<string, string> = {
  live:      'bg-red-500/15 text-red-400 border border-red-500/20',
  upcoming:  'bg-orange-500/15 text-sf-orange border border-orange-500/20',
  completed: 'bg-white/5 text-sf-muted border border-white/10',
}

export default function MatchTrackerPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('All')

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get<{ data: Match[] }>('/api/matches')
        setMatches(res.data ?? [])
      } catch {
        console.error('Failed to fetch matches')
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  const statuses = ['All', 'live', 'upcoming', 'completed']
  const filtered = filter === 'All' ? matches : matches.filter((m) => m.status === filter)

  return (
    <div className="bg-sf-darker">
      <SEO
        url="/matches"
        title="Match Tracker"
        description="Follow Solar Flare Esports live scores, upcoming fixtures and results."
      />

      <PageHero
        eyebrow="Results & Fixtures"
        title="Match Tracker"
        subtitle="Live scores, upcoming fixtures and full results across all divisions."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 ${
                filter === s
                  ? 'bg-sf-orange text-white'
                  : 'bg-sf-surface text-sf-muted hover:text-sf-text'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-sf-muted">
            <span className="w-6 h-6 border-2 border-sf-muted/30 border-t-sf-orange rounded-full animate-spin block" />
            Loading matches...
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-20 text-sf-muted">
            <p className="text-[18px] mb-2">No matches yet</p>
            <p className="text-[14px]">Check back soon for fixtures.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {filtered.map((match) => (
              <div key={match.id} className="bg-sf-surface p-6 md:p-8">
                {/* Top row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-sf-orange">
                      {match.division}
                    </span>
                    <span className="text-sf-border">·</span>
                    <span className="text-[11px] text-sf-muted">{match.tournament}</span>
                    {match.stage && (
                      <>
                        <span className="text-sf-border">·</span>
                        <span className="text-[11px] text-sf-muted">{match.stage}</span>
                      </>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 ${statusColors[match.status] ?? ''}`}>
                    {match.status === 'live' ? '🔴 LIVE' : match.status}
                  </span>
                </div>

                {/* Score row */}
                <div className="flex items-center justify-between gap-4">
                  {/* Team A */}
                  <div className="flex-1 text-right">
                    <p className="font-condensed font-black text-[28px] md:text-[36px] uppercase text-sf-text leading-none">
                      {match.team_a?.name}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-3 shrink-0">
                    {match.status === 'completed' ? (
                      <>
                        <span className="font-condensed font-black text-[40px] text-sf-orange">
                          {match.team_a?.score ?? 0}
                        </span>
                        <span className="font-condensed font-black text-[24px] text-sf-muted">—</span>
                        <span className="font-condensed font-black text-[40px] text-sf-orange">
                          {match.team_b?.score ?? 0}
                        </span>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-[11px] font-bold tracking-widest uppercase text-sf-muted">
                          {match.date}
                        </p>
                        <p className="text-[13px] font-semibold text-sf-text mt-0.5">
                          {match.time}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Team B */}
                  <div className="flex-1">
                    <p className="font-condensed font-black text-[28px] md:text-[36px] uppercase text-sf-text leading-none">
                      {match.team_b?.name}
                    </p>
                  </div>
                </div>

                {/* Links */}
                {(match.stream_url || match.ticket_url) && (
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-sf-border">
                    {match.stream_url && (
                      <a
                        href={match.stream_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold tracking-widest uppercase text-sf-orange hover:underline"
                      >
                        Watch Stream →
                      </a>
                    )}
                    {match.ticket_url && (
                      <a
                        href={match.ticket_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold tracking-widest uppercase text-sf-muted hover:text-sf-text"
                      >
                        Get Tickets →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}