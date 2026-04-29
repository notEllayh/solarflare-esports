import { type LegalSection } from '../data/siteData'

interface LegalPageProps {
  eyebrow: string
  title: string
  subtitle: string
  lastUpdated: string
  sections: LegalSection[]
}

export default function LegalPage({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <div className="bg-sf-darker min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden pt-17 border-b border-sf-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,106,0,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-275 mx-auto px-6 md:px-12 pt-14 pb-14">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
            {eyebrow}
          </p>
          <h1
            className="font-condensed font-black uppercase leading-none text-sf-text mb-4"
            style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}
          >
            {title}
          </h1>
          <p className="text-sf-muted text-[15px] max-w-xl leading-relaxed mb-5">
            {subtitle}
          </p>
          <p className="text-[12px] text-sf-muted/50 tracking-wide">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16">

          {/* Sidebar — table of contents */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-sf-muted mb-4">
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((section, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="text-[12px] text-sf-muted hover:text-sf-text transition-colors duration-200 py-1.5 border-l-2 border-transparent hover:border-sf-orange pl-3"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {sections.map((section, i) => (
              <div key={i} id={`section-${i}`} className="scroll-mt-24">
                <div
                  className="w-8 h-0.5 mb-4"
                  style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
                />
                <h2 className="font-condensed font-black text-[26px] uppercase text-sf-text mb-5 leading-tight">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.content.map((para, j) => (
                    <p key={j} className="text-sf-muted text-[14px] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom contact strip */}
            <div className="border-t border-sf-border pt-10 mt-4">
              <p className="text-[13px] text-sf-muted leading-relaxed">
                Questions about this page? Contact us at{' '}
                
                  <a
                    href="mailto:legal@solarflare.gg"
                    className="text-sf-orange hover:underline"
                  >
                    legal@solarflare.gg
                  </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}