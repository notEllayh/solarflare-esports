import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'

interface Player {
  id:          string
  alias:       string
  real_name:   string
  role:        string
  division:    string
  country:     string
  nationality: string
  age:         number
  image:       string
  bio:         string
  signature:   string
}

export default function RosterPage() {
  const [players,  setPlayers]  = useState<Player[]>([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('All')

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get<{ data: Player[] }>('/api/players')
        setPlayers(res.data ?? [])
      } catch {
        console.error('Failed to fetch players')
      } finally {
        setLoading(false)
      }
    }
    fetchPlayers()
  }, [])

  const divisions = ['All', ...Array.from(new Set(players.map((p) => p.division).filter(Boolean)))]
  const filtered  = filter === 'All' ? players : players.filter((p) => p.division === filter)

  return (
    <div className="bg-sf-darker">
      <SEO
        url="/roster"
        title="Roster"
        description="Meet the Solar Flare Esports roster — our players across all divisions."
      />

      <PageHero
        eyebrow="Our Athletes"
        title="Roster"
        subtitle="The players who represent Solar Flare across all divisions."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {divisions.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-4 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 ${
                filter === d
                  ? 'bg-sf-orange text-white'
                  : 'bg-sf-surface text-sf-muted hover:text-sf-text'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-sf-muted">
            <span className="w-6 h-6 border-2 border-sf-muted/30 border-t-sf-orange rounded-full animate-spin block" />
            Loading roster...
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-20 text-sf-muted">
            <p className="text-[18px] mb-2">No players yet</p>
            <p className="text-[14px]">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {filtered.map((player) => (
              <Link
                key={player.id}
                to={`/roster/${player.id}`}
                className="block bg-sf-surface group hover:bg-[#222226] transition-colors duration-200"
              >
                {/* Player image */}
                <div className="relative h-64 bg-sf-mid overflow-hidden">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.alias}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-condensed font-black text-[80px] uppercase text-sf-border">
                        {player.alias.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #1C1C1F 0%, transparent 60%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-1">
                      {player.role}
                    </p>
                    <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text leading-none">
                      {player.alias}
                    </h3>
                  </div>
                </div>

                {/* Player info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] text-sf-muted">{player.real_name}</span>
                    <span className="text-[20px]">{player.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-sf-mid text-sf-muted px-2 py-1">
                      {player.division}
                    </span>
                    {player.age && (
                      <span className="text-[10px] font-bold tracking-widest uppercase bg-sf-mid text-sf-muted px-2 py-1">
                        Age {player.age}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
} 