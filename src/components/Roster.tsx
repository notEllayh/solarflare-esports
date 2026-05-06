import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import LazyImage from './LazyImage'

interface Player {
  id:        string
  alias:     string
  real_name: string
  role:      string
  division:  string
  country:   string
  image:     string
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      to={`/roster/${player.id}`}
      className="relative bg-sf-surface overflow-hidden group hover:bg-[#222226] transition-colors duration-200 block"
    >
      <div
        className="w-full relative overflow-hidden bg-sf-mid"
        style={{ aspectRatio: '3/4' }}
      >
        {player.image ? (
          <LazyImage
            src={player.image}
            alt={player.alias}
            fallback={player.alias.charAt(0)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            style={{ aspectRatio: '3/4' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-sf-mid">
            <span className="font-condensed font-black text-[64px] text-white/10 select-none">
              {player.alias.charAt(0)}
            </span>
          </div>
        )}

        {/* Country badge */}
        <div className="absolute top-3 right-3 text-[18px] leading-none">
          {player.country}
        </div>

        {/* Arrow on hover */}
        <div
          className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
        >
          →
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #1C1C1F 0%, rgba(28,28,31,0.6) 50%, transparent 100%)' }}
        />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
         <h3 className="font-condensed font-black text-[20px] uppercase leading-none text-sf-text tracking-wide truncate">
             {player.alias}
          </h3>
        </div>
      </div>

      <div className="px-4 pt-3 pb-5">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-sf-orange mb-0.5">
          {player.role} · {player.division}
        </p>
        <p className="text-[13px] text-sf-muted">
          {player.real_name}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
      />
    </Link>
  )
}

export default function Roster() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get<{ data: Player[] }>('/api/players')
        setPlayers((res.data ?? []).slice(0, 5))
      } catch {
        console.error('Failed to fetch players')
      } finally {
        setLoading(false)
      }
    }
    fetchPlayers()
  }, [])

  if (loading) return (
    <section id="roster" className="max-w-275 mx-auto px-6 md:px-12 pb-24">
      <div className="flex items-center gap-3 text-sf-muted py-12">
        <span className="w-5 h-5 border-2 border-sf-muted/30 border-t-sf-orange rounded-full animate-spin block" />
        Loading roster...
      </div>
    </section>
  )

  if (players.length === 0) return null

  return (
    <section id="roster" className="max-w-275 mx-auto px-6 md:px-12 pb-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
            Featured Roster
          </p>
          <h2
            className="font-condensed font-black uppercase leading-[0.95]"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
          >
            The<br />Flare Squad
          </h2>
        </div>
        <Link
          to="/roster"
          className="hidden md:inline-block px-7 py-3 text-sf-text text-[11px] font-bold tracking-[0.12em] uppercase border border-white/15 hover:border-white/40 transition-colors duration-200 whitespace-nowrap"
        >
          Full Roster →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0.5">
        {players.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </div>
    </section>
  )
} 