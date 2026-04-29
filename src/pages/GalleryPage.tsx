import SEO from '../components/SEO'
import { useState } from 'react'
import { mediaItems, mediaCategories, type MediaItem } from '../data/siteData'
import PageHero from '../components/PageHero'
//import { div, section } from 'framer-motion/m'

const typeIcons: Record<string, string> = {
  photo:     '📷',
  video:     '▶',
  highlight: '⚡',
}

const typeLabels: Record<string, string> = {
  photo:     'Photo',
  video:     'Video',
  highlight: 'Highlight',
}

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: MediaItem
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-sf-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative w-full bg-sf-mid" style={{ aspectRatio: '16/9' }}>
          {!imgError ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <span className="text-[64px]">{typeIcons[item.type]}</span>
              <p className="text-sf-muted text-[13px] text-center px-8">{item.title}</p>
            </div>
          )}

          {/* Type badge */}
          <div
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase text-white"
            style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
          >
            <span>{typeIcons[item.type]}</span>
            {typeLabels[item.type]}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/60 text-white flex items-center justify-center text-xl hover:bg-sf-orange transition-colors duration-200"
          >
            ×
          </button>

          {/* Prev / Next */}
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 text-white flex items-center justify-center hover:bg-sf-orange transition-colors duration-200"
          >
            ←
          </button>
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 text-white flex items-center justify-center hover:bg-sf-orange transition-colors duration-200"
          >
            →
          </button>
        </div>

        {/* Caption */}
        <div className="px-6 py-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-condensed font-bold text-[20px] uppercase text-sf-text leading-tight mb-1">
              {item.title}
            </h3>
            <div className="flex items-center gap-3 text-[12px] text-sf-muted">
              <span>{item.division}</span>
              <span className="text-white/20">·</span>
              <span>{item.date}</span>
              <span className="text-white/20">·</span>
              <span className="text-sf-orange font-semibold">{item.tag}</span>
            </div>
          </div>
          <button className="shrink-0 text-[11px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-4 py-2 hover:border-sf-orange hover:text-sf-orange transition-all duration-200">
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Media card ────────────────────────────────────────────
function MediaCard({
  item,
  featured,
  onClick,
}: {
  item: MediaItem
  featured?: boolean
  onClick: () => void
}) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-sf-surface cursor-pointer group ${
        featured ? 'col-span-2 row-span-2' : ''
      }`}
      style={{ aspectRatio: featured ? '16/9' : '4/3' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      {!imgError ? (
        <img
          src={item.thumbnail}
          alt={item.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      ) : (
        <div className="w-full h-full bg-sf-mid flex flex-col items-center justify-center gap-3">
          <span className="text-[48px] opacity-20">{typeIcons[item.type]}</span>
          <p className="text-sf-muted text-[11px] text-center px-4 leading-relaxed">
            {item.title}
          </p>
        </div>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          opacity: hovered ? 1 : 0.7,
        }}
      />

      {/* Type badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-sf-darker/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-sf-orange">
        <span>{typeIcons[item.type]}</span>
        {typeLabels[item.type]}
      </div>

      {/* Division tag */}
      <div className="absolute top-3 right-3 bg-sf-darker/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-sf-muted">
        {item.division}
      </div>

      {/* Play button for videos/highlights */}
      {(item.type === 'video' || item.type === 'highlight') && (
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div
            className="w-14 h-14 flex items-center justify-center text-white text-xl"
            style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
          >
            ▶
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className={`font-condensed font-bold uppercase leading-tight text-sf-text mb-1 ${
            featured ? 'text-[22px]' : 'text-[16px]'
          }`}
        >
          {item.title}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-sf-muted">
          <span className="text-sf-orange font-semibold">{item.tag}</span>
          <span className="text-white/20">·</span>
          <span>{item.date}</span>
        </div>
      </div>

      {/* Bottom accent on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-200"
        style={{
          background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = mediaItems.filter((item) => {
    if (activeCategory === 'All')        return true
    if (activeCategory === 'Photos')     return item.type === 'photo'
    if (activeCategory === 'Videos')     return item.type === 'video'
    if (activeCategory === 'Highlights') return item.type === 'highlight'
    return item.division === activeCategory
  })

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevItem = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  const nextItem = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))

  // keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  prevItem()
    if (e.key === 'ArrowRight') nextItem()
    if (e.key === 'Escape')     closeLightbox()
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1} className="outline-none">
      <SEO
      url="/gallery"
      title="Gallery"
      description="Photos, highlights and behind-the-scenes media from Solar Flare Esports tournaments and events."
/>

      <PageHero
        eyebrow="Media"
        title="Gallery"
        subtitle="Photos, highlights, and behind-the-scenes moments from across the Solar Flare universe."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-0.5 mb-12">
          {[
            { value: mediaItems.filter((m) => m.type === 'photo').length.toString(),     label: 'Photos' },
            { value: mediaItems.filter((m) => m.type === 'video').length.toString(),     label: 'Videos' },
            { value: mediaItems.filter((m) => m.type === 'highlight').length.toString(), label: 'Highlights' },
          ].map((s) => (
            <div key={s.label} className="bg-sf-surface px-6 py-5 flex flex-col gap-1">
              <span
                className="font-condensed font-black text-[40px] leading-none"
                style={{
                  background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.value}
              </span>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-12">
          {mediaCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-bold tracking-[0.12em] uppercase px-5 py-2.5 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sf-orange border-sf-orange text-white'
                  : 'bg-transparent border-white/15 text-sf-muted hover:border-white/40 hover:text-sf-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured items — top row */}
        {activeCategory === 'All' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-0.5">
            {mediaItems.filter((m) => m.featured).map((item, i) => (
              <div
                key={item.id}
                className={i === 0 ? 'md:col-span-2' : ''}
              >
                <div style={{ aspectRatio: i === 0 ? '16/9' : '4/3', height: '100%' }}>
                  <MediaCard
                    item={item}
                    onClick={() => openLightbox(mediaItems.indexOf(item))}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
          {(activeCategory === 'All'
            ? filtered.filter((m) => !m.featured)
            : filtered
          ).map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onClick={() => openLightbox(
                activeCategory === 'All'
                  ? mediaItems.indexOf(item)
                  : filtered.indexOf(item)
              )}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-condensed font-black text-[32px] uppercase text-sf-muted">
              No media found
            </p>
            <p className="text-[14px] text-sf-muted/50 mt-2">
              Try a different category.
            </p>
          </div>
        )}

        {/* Upload CTA */}
        <div className="mt-16 border border-sf-border p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
              Community Content
            </p>
            <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text leading-tight">
              Share Your Solar Flare Moments
            </h3>
            <p className="text-[13px] text-sf-muted mt-2 max-w-md leading-relaxed">
              Tag us on social with <span className="text-sf-orange font-semibold">#slfburnbright</span> and your content could be featured in the official gallery.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200">
              Post on X
            </a>
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-sf-text text-[11px] font-bold tracking-[0.14em] uppercase hover:border-white/50 transition-colors duration-200">
              Post on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={activeCategory === 'All' ? mediaItems[lightboxIndex] : filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  )
}