import { Link } from 'react-router-dom'
import { creators } from '../data/siteData'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'

export default function CreatorsPage() {
  return (
    <div className="bg-sf-darker">
      <SEO
        url="/creators"
        title="Solar Flare Creators"
        description="Meet the Solar Flare creator network — content creators, streamers and influencers representing the brand."
      />

      <PageHero
        eyebrow="Creator Network"
        title="Solar Flare Creators"
        subtitle="The faces and voices behind Solar Flare — creating content, building community and representing the brand."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">

        {/* Creator cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {creators.map((creator) => (
            <Link
              key={creator.id}
              to={`/creators/${creator.id}`}
              className="bg-sf-surface group hover:bg-[#222226] transition-colors duration-200 block"
            >
              {/* Banner */}
              <div className="relative h-32 bg-[#1a1a1d] overflow-hidden">
                {creator.banner ? (
                  <img
                    src={creator.banner}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
                  />
                )}
                {/* Gradient fade */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, #1C1C1F 0%, transparent 60%)' }}
                />
              </div>

              {/* Photo */}
              <div className="px-6 -mt-10 relative z-10">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-sf-surface bg-sf-mid">
                  {creator.photo ? (
                    <img
                      src={creator.photo}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-black text-[28px]"
                      style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
                    >
                      {creator.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="px-6 pt-3 pb-6">
                <h3 className="font-condensed font-black text-[22px] uppercase text-sf-text leading-tight group-hover:text-sf-orange transition-colors">
                  {creator.name}
                </h3>
                <p className="text-[12px] text-sf-orange font-bold tracking-widest uppercase mb-2">
                  {creator.handle}
                </p>
                <p className="text-[12px] text-sf-muted mb-4 line-clamp-2">
                  {creator.bio}
                </p>

                {/* Niche tag */}
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-sf-mid text-sf-muted px-3 py-1 mb-4">
                  {creator.niche}
                </span>

                {/* Platform icons */}
                <div className="flex gap-2 flex-wrap">
                  {creator.socials.map((s) => (
                    <span
                      key={s.platform}
                      className="text-[10px] font-bold tracking-widest uppercase border border-sf-border text-sf-muted px-2.5 py-1"
                    >
                      {s.platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
              />
            </Link>
          ))}
        </div>

        {/* Join CTA */}
        <div
          className="mt-16 p-10 md:p-14 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a0800, #0a0a0b)', border: '2px solid #FF6A00' }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
                Join the Network
              </p>
              <h3 className="font-condensed font-black text-[32px] md:text-[40px] uppercase text-white leading-none mb-3">
                Become a Solar Flare Creator
              </h3>
              <p className="text-[14px] text-[#aaaaaa] max-w-md">
                Are you a content creator passionate about esports? We're looking for talented individuals to join our creator network.
              </p>
            </div>
            <Link
              to="/careers"
              className="shrink-0 px-8 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors"
            >
              Apply Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 