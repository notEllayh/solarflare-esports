import { stats } from '../data/siteData'

export default function StatsBar() {
  return (
    <div className="bg-sf-surface border-y border-sf-border">
      <div className="max-w-275 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-1 px-8 py-7 ${
              i < stats.length - 1 ? 'border-r border-sf-border' : ''
            }`}
          >
            <span
              className="font-condensed font-black text-[42px] leading-none"
              style={{
                background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {stat.value}
            </span>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 