import { sponsors } from '../data/siteData'

export default function SponsorsBar() {
  return (
    <div id="partners" className="border-b border-sf-border px-8 py-12">
      <p className="text-center text-[10px] font-bold tracking-[0.2em] uppercase text-sf-muted mb-9">
        Our Partners
      </p>
      <div className="flex justify-center items-center gap-12 md:gap-16 flex-wrap">
        {sponsors.map((s) => (
          <span
            key={s.name}
            className="font-condensed font-black text-[20px] tracking-[0.08em] uppercase text-white/18 hover:text-white/50 transition-colors duration-200 cursor-default"
          >
            <div className="cursor-pointer hover:text-sf-orange transition-colors duration-200">
                {s.name}
            </div>
          </span>
        ))}
      </div>
    </div>
  )
}