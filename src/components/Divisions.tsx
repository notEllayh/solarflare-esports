// import efootballTeamImage from ''../assets/TeamImages/Efootball_Team.JPG'; 
// import freefireTeamImage from '../assets/TeamImages/FF_Team.JPG'; 
// import chessTeam from '../assets/TeamImages/Tennyson.JPG'; 
// import { Link } from 'react-router-dom';

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { divisions, type Division } from '../data/siteData'

function DivisionCard({ division }: { division: Division }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/teams/${division.id}`}
      className="relative block overflow-hidden bg-sf-surface group"
      style={{ aspectRatio: '4/3' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background emoji */}
      <div
        className="absolute inset-0 flex items-center justify-center text-[80px] pointer-events-none select-none transition-all duration-500"
        style={{
          opacity: hovered ? 0.14 : 0.07,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {division.emoji}
      </div>

      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 w-0.75 transition-all duration-300 ease-out"
        style={{
          height: hovered ? '100%' : '0%',
          background: 'linear-gradient(to bottom, #FF6A00, #FFB800)',
        }}
      />

      {/* Bottom arrow indicator */}
      <div
        className="absolute top-4 right-4 w-8 h-8 border border-white/10 flex items-center justify-center text-sf-muted text-sm transition-all duration-200"
        style={{
          opacity: hovered ? 1 : 0,
          background: hovered ? '#FF6A00' : 'transparent',
          borderColor: hovered ? '#FF6A00' : 'rgba(255,255,255,0.1)',
          color: hovered ? '#fff' : '#888884',
        }}
      >
        →
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-7"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
        }}
      >
        <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-sf-orange mb-1 truncate block">
  {division.category}
</span>
        <h3 className="font-condensed font-black text-[22px] md:text-[28px] uppercase leading-none text-sf-text truncate">
  {division.game}
</h3>
        <div className="flex flex-col gap-1 mt-2">
  <p className="text-sf-muted text-[11px] truncate">
    {division.playerCount} Players · {division.league}
  </p>
  <p 
    className="text-[10px] font-bold tracking-widest uppercase transition-all duration-200"
    style={{
      opacity: hovered ? 1 : 0,
      color: '#FF6A00',
    }}
  >
    View Team
  </p>
</div>
      </div>
    </Link>
  )
}

export default function Divisions() {
  return (
    <section id="teams" className="max-w-275 mx-auto px-6 md:px-12 py-24">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
            Our Divisions
          </p>
          <h2
            className="font-condensed font-black uppercase leading-[0.95]"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
          >
            Where We<br />Compete
          </h2>
        </div>
        <Link
          to="/teams"
          className="hidden md:inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-sf-text text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/40 transition-colors duration-200"
        >
          All Teams →
        </Link>
      </div>

      <p className="text-sf-muted text-[15px] max-w-md leading-relaxed mb-14">
        Four elite squads. One mission. Solar Flare fields world-class rosters across the biggest titles on the planet.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
        {divisions.map((d) => (
          <DivisionCard key={d.id} division={d} />
        ))}
      </div>
    </section>
  )
}