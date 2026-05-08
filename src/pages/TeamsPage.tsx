import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { divisions, type Division } from '../data/siteData'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import LazyImage from '../components/LazyImage'

interface Player {
  id:        string
  alias:     string
  real_name: string
  role:      string
  division:  string
  country:   string
  age:       number
  image:     string
}

// ── Division Card ─────────────────────────────────────────
function DivisionCard({
  division,
  active,
  onClick,
}: {
  division: Division
  active:   boolean
  onClick:  () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative block overflow-hidden bg-sf-surface w-full text-left"
      style={{
        aspectRatio: '4/3',
        outline: active ? '2px solid #FF6A00' : 'none',
      }}
    >
      {/* Background emoji */}
      <div
        className="absolute inset-0 flex items-center justify-center text-[80px] pointer-events-none select-none transition-all duration-500"
        style={{
          opacity: hovered || active ? 0.14 : 0.07,
          transform: hovered || active ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {division.emoji}
      </div>

      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 w-0.75 transition-all duration-300 ease-out"
        style={{
          height: hovered || active ? '100%' : '0%',
          background: 'linear-gradient(to bottom, #FF6A00, #FFB800)',
        }}
      />

      {/* Active indicator */}
      {active && (
        <div className="absolute top-3 right-3 w-7 h-7 bg-sf-orange flex items-center justify-center text-white text-[12px] font-black">
          ✓
        </div>
      )}

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 md:p-7"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
      >
        <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-sf-orange mb-1 truncate block">
          {division.category}
        </span>
        <h3 className="font-condensed font-black text-[20px] md:text-[26px] uppercase leading-none text-sf-text truncate">
          {division.game}
        </h3>
        <p className="text-sf-muted text-[11px] truncate mt-1.5">
          {division.playerCount} Players
        </p>
      </div>
    </button>
  )
}

// ── Player Card ───────────────────────────────────────────
function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      to={`/roster/${player.id}`}
      className="block bg-sf-surface group hover:bg-[#222226] transition-colors duration-200"
    >
      <div className="relative h-64 bg-sf-mid overflow-hidden">
        {player.image ? (
          <LazyImage
            src={player.image}
            alt={player.alias}
            fallback={player.alias.charAt(0)}
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
          <h3 className="font-condensed font-black text-[26px] uppercase text-sf-text leading-none truncate">
            {player.alias}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] text-sf-muted">{player.real_name}</span>
          <span className="text-[20px]">{player.country}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-sf-mid text-sf-muted px-2 py-1">
            {player.division}
          </span>
          {player.age > 0 && (
            <span className="text-[10px] font-bold tracking-widest uppercase bg-sf-mid text-sf-muted px-2 py-1">
              Age {player.age}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── Main Page ─────────────────────────────────────────────
export default function TeamsPage() {
  const [players,       setPlayers]       = useState<Player[]>([])
  const [loading,       setLoading]       = useState(true)
  const [activeFilter,  setActiveFilter]  = useState('All')

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

  const filtered = activeFilter === 'All'
    ? players
    : players.filter((p) => p.division === activeFilter)

  const handleDivisionClick = (divisionGame: string) => {
    // Toggle — clicking active division resets to All
    setActiveFilter((prev) => prev === divisionGame ? 'All' : divisionGame)

    // Scroll to roster
    setTimeout(() => {
      document.getElementById('roster-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="bg-sf-darker">
      <SEO
        url="/teams"
        title="Teams & Roster"
        description="Solar Flare Esports divisions and full player roster across Free Fire, Chess, eFootball and EA FC 25."
      />

      <PageHero
        eyebrow="Our Divisions"
        title="Teams & Roster"
        subtitle="Every Solar Flare squad and every player — one org built to win."
      />

      {/* ── DIVISIONS ── */}
      <section className="max-w-275 mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="mb-8">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3">
            Our Divisions
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
          >
            Where We Compete
          </h2>
          <p className="text-sf-muted text-[14px] mt-3">
            Click a division to filter the roster below.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
          {divisions.map((d) => (
            <DivisionCard
              key={d.id}
              division={d}
              active={activeFilter === d.game}
              onClick={() => handleDivisionClick(d.game)}
            />
          ))}
        </div>
      </section>

      {/* ── ROSTER ── */}
      <section
        id="roster-section"
        className="max-w-275 mx-auto px-6 md:px-12 py-16"
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
              {activeFilter === 'All' ? 'All Divisions' : activeFilter}
            </p>
            <h2
              className="font-condensed font-black uppercase leading-none"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
            >
              {activeFilter === 'All' ? 'Full Roster' : `${activeFilter} Squad`}
            </h2>
          </div>

          {/* Reset filter */}
          {activeFilter !== 'All' && (
            <button
              onClick={() => setActiveFilter('All')}
              className="px-5 py-2.5 border border-sf-border text-sf-muted text-[11px] font-bold tracking-widests uppercase hover:border-sf-orange hover:text-sf-orange transition-colors"
            >
              ← All Players
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-sf-muted">
            <span className="w-6 h-6 border-2 border-sf-muted/30 border-t-sf-orange rounded-full animate-spin block" />
            Loading roster...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-sf-muted">
            <p className="text-[18px] mb-2">No players in this division yet</p>
            <p className="text-[14px]">Check back soon.</p>
          </div>
        ) : (
          <>
            <p className="text-sf-muted text-[13px] mb-6">
              {filtered.length} player{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {filtered.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
} 