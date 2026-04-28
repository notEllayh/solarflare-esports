// import efootballTeamImage from ''../assets/TeamImages/Efootball_Team.JPG'; 
// import freefireTeamImage from '../assets/TeamImages/FF_Team.JPG'; 
// import chessTeam from '../assets/TeamImages/Tennyson.JPG'; 
// import { Link } from 'react-router-dom';
import { useState } from 'react'
import { divisions, type Division } from '../data/siteData'

function DivisionCard({ division }: { division: Division }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative aspect-4/3 overflow-hidden bg-sf-surface cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center text-[80px] transition-all duration-500 ${
          hovered ? 'opacity-[0.14] scale-110' : 'opacity-[0.07] scale-100'
        }`}
      >
        {division.emoji}
      </div>

      <div
        className="absolute top-0 left-0 w-0.75 transition-all duration-300 ease-out"
        style={{
          height: hovered ? '100%' : '0%',
          background: 'linear-gradient(to bottom, #FF6A00, #FFB800)',
        }}
      />

      <div
        className="absolute inset-0 flex flex-col justify-end p-7"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
      >
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-sf-orange mb-1.5">
          {division.category}
        </span>
        <h3 className="font-condensed font-black text-[28px] uppercase leading-none text-sf-text">
          {division.game}
        </h3>
        <p className="text-sf-muted text-[12px] mt-1.5">
          {division.playerCount} Players · {division.league}
        </p>
      </div>
    </div>
  )
}

export default function Divisions() {
  return (
    <section id="teams" className="max-w-275 mx-auto px-6 md:px-12 py-24">
      <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
        Our Divisions
      </p>
      <h2
        className="font-condensed font-black uppercase leading-[0.95] mb-5"
        style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
      >
        Where We<br />Compete
      </h2>
      <p className="text-sf-muted text-[15px] max-w-md leading-relaxed">
        Four elite squads. One mission. Solar Flare fields world-class rosters across the biggest titles on the planet.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5 mt-14">
        {divisions.map((d) => (
          <DivisionCard key={d.id} division={d} />
        ))}
      </div>
    </section>
  )
}