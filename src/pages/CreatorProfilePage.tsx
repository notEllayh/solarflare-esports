import { useParams, useNavigate, Link } from 'react-router-dom'
import { creators } from '../data/siteData'
import SEO from '../components/SEO'

const platformColors: Record<string, string> = {
  TikTok:    '#010101',
  YouTube:   '#FF0000',
  Instagram: '#E1306C',
  Kick:      '#53FC18',
}

const platformTextColors: Record<string, string> = {
  TikTok:    '#ffffff',
  YouTube:   '#ffffff',
  Instagram: '#ffffff',
  Kick:      '#000000',
}

export default function CreatorProfilePage() {
  const { id }     = useParams<{ id: string }>()
  const navigate   = useNavigate()
  const creator    = creators.find((c) => c.id === id)

  if (!creator) {
    navigate('/creators')
    return null
  }

  return (
    <div className="bg-sf-darker min-h-screen">
      <SEO
        url={`/creators/${creator.id}`}
        title={`${creator.name} — Solar Flare Creator`}
        description={creator.bio}
        image={creator.photo}
      />

      {/* ── HERO / BANNER ── */}
      <div className="relative pt-17">
        {/* Banner */}
        <div className="relative h-64 md:h-80 bg-[#1a1a1d] overflow-hidden">
          {creator.banner ? (
            <img
              src={creator.banner}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #FFB800 100%)' }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #060607 0%, transparent 60%)' }}
          />
        </div>

        {/* Profile info */}
        <div className="max-w-275 mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 relative z-10 pb-8 border-b border-sf-border">
            {/* Photo */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sf-darker bg-sf-mid shrink-0">
              {creator.photo ? (
                <img src={creator.photo} alt={creator.name} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white font-black text-[48px]"
                  style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
                >
                  {creator.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Name + info */}
            <div className="flex-1">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-sf-orange text-white px-3 py-1 mb-3">
                {creator.niche}
              </span>
              <h1
                className="font-condensed font-black uppercase leading-none text-sf-text mb-1"
                style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
              >
                {creator.name}
              </h1>
              <p className="text-sf-orange font-bold text-[14px] tracking-widest uppercase">
                {creator.handle}
              </p>
            </div>

            {/* Back button */}
            <Link
              to="/creators"
              className="self-start md:self-end px-5 py-2.5 border border-sf-border text-sf-muted text-[11px] font-bold tracking-widest uppercase hover:border-sf-orange hover:text-sf-orange transition-colors"
            >
              ← All Creators
            </Link>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-275 mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-12">

            {/* Bio */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">About</p>
              <h2 className="font-condensed font-black text-[36px] uppercase text-sf-text leading-none mb-6">Bio</h2>
              <p className="text-sf-muted text-[15px] leading-relaxed max-w-2xl">{creator.bio}</p>
            </div>

            {/* Recent content */}
            {creator.content.length > 0 && (
              <div>
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">Latest</p>
                <h2 className="font-condensed font-black text-[36px] uppercase text-sf-text leading-none mb-8">Recent Content</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {creator.content.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-sf-surface group hover:bg-[#222226] transition-colors duration-200 block"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-[#1a1a1d] relative overflow-hidden">
                        {item.thumb && (item.thumb.startsWith('/') || item.thumb.startsWith('http')) ? (
                          <img
                            src={item.thumb}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[48px]">{item.thumb}</span>
                          </div>
                        )}
                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
                          <div className="w-12 h-12 bg-sf-orange flex items-center justify-center">
                            <span className="text-white text-[20px] ml-1">▶</span>
                          </div>
                        </div>
                        {/* Platform badge */}
                        <div
                          className="absolute top-2 left-2 text-[9px] font-black tracking-widest uppercase px-2 py-1"
                          style={{
                            background: platformColors[item.platform] ?? '#FF6A00',
                            color:      platformTextColors[item.platform] ?? '#fff',
                          }}
                        >
                          {item.platform}
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-[13px] font-bold text-sf-text leading-snug group-hover:text-sf-orange transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-sf-muted mt-1">{item.views}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="flex flex-col gap-4">

            {/* Social links */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">Socials</p>
              <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text leading-none mb-5">Follow</h3>

              <div className="flex flex-col gap-2">
                {creator.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-4 bg-sf-surface hover:bg-[#222226] transition-colors duration-200 group border border-sf-border hover:border-sf-orange"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 flex items-center justify-center text-[11px] font-black"
                        style={{
                          background: platformColors[s.platform] ?? '#FF6A00',
                          color:      platformTextColors[s.platform] ?? '#fff',
                        }}
                      >
                        {s.platform.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-sf-text uppercase tracking-widest">{s.platform}</p>
                        <p className="text-[11px] text-sf-muted">{s.handle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-black text-sf-orange">{s.followers}</p>
                      <p className="text-[10px] text-sf-muted">followers</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Join Flame Society */}
            <Link
              to="/flame-society"
              className="flex items-center justify-between px-6 py-4 bg-sf-orange text-white text-[12px] font-bold tracking-widest uppercase hover:bg-orange-500 transition-colors duration-200"
            >
              Join Flame Society
              <span>→</span>
            </Link>

            <Link
              to="/creators"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-sf-border text-sf-muted text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/30 hover:text-sf-text transition-all duration-200"
            >
              ← All Creators
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}