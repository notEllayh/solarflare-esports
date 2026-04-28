interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle: string
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <div className="relative pt-17 pb-16 overflow-hidden bg-sf-darker border-b border-sf-border">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(255,106,0,0.09) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 max-w-275 mx-auto px-6 md:px-12 pt-14">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
          {eyebrow}
        </p>
        <h1
          className="font-condensed font-black uppercase leading-[0.95] text-sf-text mb-4"
          style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}
        >
          {title}
        </h1>
        <p className="text-sf-muted text-[15px] max-w-md leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  )
} 