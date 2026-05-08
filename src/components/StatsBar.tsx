import { stats } from '../data/siteData'

export default function StatsBar() {
  return (
    <div className="bg-sf-surface border-y border-sf-border">

      {/* Desktop — horizontal row */}
      <div
        className="hidden md:grid max-w-275 mx-auto"
        style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`relative flex flex-col items-center justify-center gap-2 py-10 px-6 text-center group hover:bg-[#222226] transition-colors duration-200 ${
              i < stats.length - 1 ? 'border-r border-sf-border' : ''
            }`}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
            />
            <span
              className="font-condensed font-black text-[52px] leading-none"
              style={{
                background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {stat.value}
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-sf-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile — 2 column grid */}
      <div className="md:hidden grid grid-cols-2">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1.5 px-6 py-7"
            style={{
              borderRight:  i % 2 === 0                  ? '1px solid #2a2a2e' : 'none',
              borderBottom: i < stats.length - 2         ? '1px solid #2a2a2e' : 'none',
            }}
          >
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
            <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-sf-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
} 