import { useState } from 'react'
import { players, type Player } from '../data/siteData'

function PlayerCard({ player }: { player: Player }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative bg-sf-surface overflow-hidden cursor-pointer group hover:bg-[#222226] transition-colors duration-200">
      {/* Image area */}
      <div
        className="w-full relative overflow-hidden bg-sf-mid"
        style={{ aspectRatio: '3/4' }}
      >
        {!imgError ? (
          <img
            src={player.image}
            alt={player.alias}
            onError={(e) => {
                console.error('Image failed to load:', player.image, e)
                setImgError(true)
            }}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Fallback if image fails to load */
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

        {/* Bottom gradient fade into card */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #1C1C1F 0%, rgba(28,28,31,0.6) 50%, transparent 100%)' }}
        />

        {/* Alias overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h3 className="font-condensed font-black text-[26px] uppercase leading-none text-sf-text tracking-wide">
            {player.alias}
          </h3>
        </div>
      </div>

      {/* Info below image */}
      <div className="px-4 pt-3 pb-5">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-sf-orange mb-0.5">
          {player.role} · {player.division}
        </p>
        <p className="text-[13px] text-sf-muted">
          {player.realName}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
      />
    </div>
  )
}

export default function Roster() {
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
        <a
          href="#"
          className="hidden md:inline-block px-7 py-3 text-sf-text text-[11px] font-bold tracking-[0.12em] uppercase border border-white/15 hover:border-white/40 transition-colors duration-200 whitespace-nowrap"
        >
          Full Roster →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0.5">
        {players.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </div>
    </section>
  )
}