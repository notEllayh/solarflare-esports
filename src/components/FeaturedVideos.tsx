import { Link } from 'react-router-dom'

const VIDEOS = [
  {
    id:       1,
    title:    'Exclusive Q&A with Free Fire Team',
    thumb:    'https://img.youtube.com/vi/J0wWFfqjb64/maxresdefault.jpg',
    duration: '0:33',
    tag:      'Exclusive',
    date:     'May 2026',
    url:      'https://www.youtube.com/shorts/J0wWFfqjb64',
  },
  { id: 2, 
    title: 'KingNonx vs Mitch - Elite League Week 1 Highlights',   
    thumb: 'https://img.youtube.com/vi/icuyAHiBBA8/maxresdefault.jpg', 
    duration: '0:28',  
    tag: 'Highlights',    
    date: 'May 2026', 
    url: 'https://www.youtube.com/shorts/icuyAHiBBA8' },
  { id: 3, 
    title: 'Kida Joins Solar Flare — Official Announcement',     
    thumb: '🎮', 
    duration: '0:32',  
    tag: 'New',          
    date: 'May 2026', 
    url: '#' },
  { id: 4, 
    title: 'Player Spotlight — Tennyson Chess Masterclass', 
    thumb: '♟️', 
    duration: '12:10', 
    tag: 'Members Only', 
    date: 'Apr 2026', 
    url: '#' },
  { id: 5, 
    title: 'Bloopers & Team Moments — January Edition',     
    thumb: '😂', 
    duration: '6:15',  
    tag: 'Fun',          
    date: 'Apr 2026', 
    url: '#' },
]

const isImage = (thumb: string) => thumb.startsWith('http') || thumb.startsWith('/')

export default function FeaturedVideos() {
  return (
    <section className="max-w-275 mx-auto px-6 md:px-12 py-24">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#ff6c00] mb-3">
            Latest Videos
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
          >
            From the<br />Gallery
          </h2>
        </div>
        <Link
          to="/gallery"
          className="hidden md:inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-sf-text text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/40 transition-colors duration-200"
        >
          Full Gallery →
        </Link>
      </div>

      {/* Grid — 1 big + 4 small */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">

        {/* Featured large card */}
        <a
          href={VIDEOS[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-sf-surface overflow-hidden cursor-pointer group row-span-2 block"
        >
          <div className="aspect-video md:h-64 bg-[#1a1a1d] flex items-center justify-center relative overflow-hidden">
            <img
              src={VIDEOS[0].thumb}
              alt={VIDEOS[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
              <div className="w-16 h-16 bg-sf-orange flex items-center justify-center">
                <span className="text-white text-[28px] ml-1">▶</span>
              </div>
            </div>
            {/* Tag */}
            <div className="absolute top-3 left-3 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 bg-sf-orange text-white">
              {VIDEOS[0].tag}
            </div>
            {/* Duration */}
            <div className="absolute bottom-3 right-3 text-[11px] font-bold text-white bg-[#060607] px-2.5 py-1 border border-sf-border">
              {VIDEOS[0].duration}
            </div>
          </div>
          <div className="p-6">
            <p className="text-[11px] font-bold uppercase text-sf-muted mb-2">{VIDEOS[0].date}</p>
            <h3 className="font-condensed font-black text-[22px] uppercase text-sf-text leading-tight group-hover:text-sf-orange transition-colors">
              {VIDEOS[0].title}
            </h3>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
          />
        </a>

        {/* 4 small cards */}
        <div className="grid grid-cols-1 gap-0.5">
          {VIDEOS.slice(1).map((video) => (
            <a 
              key={video.id}
              href={video.url}
              target={video.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-sf-surface p-4 cursor-pointer group hover:bg-[#222226] transition-colors duration-200"
            >
              {/* Thumbnail */}
              <div className="w-24 h-16 bg-[#1a1a1d] flex items-center justify-center text-[28px] relative shrink-0 overflow-hidden">
                {isImage(video.thumb) ? (
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {video.thumb}
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
                  <span className="text-white text-[14px] ml-0.5">▶</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 bg-sf-orange text-white">
                    {video.tag}
                  </span>
                  <span className="text-[10px] text-sf-muted">{video.duration}</span>
                </div>
                <p className="text-[13px] font-bold text-sf-text truncate group-hover:text-sf-orange transition-colors leading-tight">
                  {video.title}
                </p>
                <p className="text-[10px] text-sf-muted mt-0.5">{video.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile — view all */}
      <div className="md:hidden mt-6">
        <Link
          to="/gallery"
          className="block w-full text-center py-3 border border-white/15 text-sf-text text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/40 transition-colors duration-200"
        >
          Full Gallery →
        </Link>
      </div>
    </section>
  )
}