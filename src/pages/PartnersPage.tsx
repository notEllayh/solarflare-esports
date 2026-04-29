//import SlfLogo from '../assets/Logos/RedLogo.png';
import { useState } from 'react'
import { partners, partnerCategories, type Partner } from '../data/siteData'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'

const categoryColors: Record<string, string> = {
  Principal:  'bg-orange-500/15 text-sf-orange border border-orange-500/20',
  Technology: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  Lifestyle:  'bg-green-500/15 text-green-400 border border-green-500/20',
  Media:      'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  Official:   'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
}

function PartnerLogo({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false)
  return (
    <div className="w-full h-full flex items-center justify-center">
      {!error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="  max-h-30 object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        />
      ) : (
        <span className="font-condensed font-black text-[22px] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300">
          {name}
        </span>
      )}
    </div>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-sf-surface group hover:bg-[#222226] transition-colors duration-200">
      {/* Logo area */}
      <div
        className="w-full border-b border-sf-border flex items-center justify-center cursor-pointer"
        style={{ height: '140px' }}
        onClick={() => setExpanded((p) => !p)}
      >
        <PartnerLogo src={partner.logo} name={partner.name} />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-condensed font-black text-[22px] uppercase text-sf-text leading-tight">
            {partner.name}
          </h3>
          <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 shrink-0 ${categoryColors[partner.category] ?? 'bg-white/5 text-sf-muted'}`}>
            {partner.category}
          </span>
        </div>

        <p className="text-[13px] text-sf-muted leading-relaxed mb-4">
          {expanded ? partner.description : `${partner.description.slice(0, 100)}...`}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-sf-muted/50">
            Partner since {partner.since}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setExpanded((p) => !p)}
              className="text-[11px] font-bold tracking-[0.08em] uppercase text-sf-muted hover:text-sf-text transition-colors duration-200"
            >
              {expanded ? 'Less ↑' : 'More ↓'}
            </button>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold tracking-[0.08em] uppercase text-sf-orange hover:underline"
            >
              Visit ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
      />
    </div>
  )
}

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? partners
    : partners.filter((p) => p.category === activeCategory)

  const featured = partners.filter((p) => p.featured)

  return (
    <>
      <SEO
        url="/partners"
        title="Partners"
        description="The brands and organisations that power Solar Flare Esports — our official sponsors and partners."
      />

      <PageHero
        eyebrow="Our Partners"
        title="Powered By"
        subtitle="The brands that believe in Solar Flare — and invest in what we're building."
      />

      {/* Featured partners strip */}
      <div className="border-b border-sf-border bg-sf-surface">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-12">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-sf-muted mb-8 text-center">
            Principal & Featured Partners
          </p>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            {featured.map((p) => (
              
                <a
                  key={p.id}
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={p.name}
              >
                <PartnerLogo src={p.logo} name={p.name} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* All partners */}
      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
              All Partners
            </p>
            <h2 className="font-condensed font-black text-[40px] uppercase text-sf-text leading-none">
              {filtered.length} Partner{filtered.length !== 1 ? 's' : ''}
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {partnerCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-bold tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-sf-orange border-sf-orange text-white'
                    : 'border-white/15 text-sf-muted hover:border-white/40 hover:text-sf-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5">
          {filtered.map((p) => (
            <PartnerCard key={p.id} partner={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-condensed font-black text-[32px] uppercase text-sf-muted">
              No partners in this category
            </p>
          </div>
        )}

        {/* Partnership CTA */}
        <div className="mt-16 border border-sf-border p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
              Work With Us
            </p>
            <h3 className="font-condensed font-black text-[32px] uppercase text-sf-text leading-tight">
              Become a Partner
            </h3>
            <p className="text-[13px] text-sf-muted mt-2 max-w-md leading-relaxed">
              We work with brands that share our ambition. If you believe in what Solar Flare is building, we'd love to talk.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-9 py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </>
  )
}