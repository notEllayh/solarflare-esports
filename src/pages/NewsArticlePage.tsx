import { useParams, Link, Navigate } from 'react-router-dom'
import { news, type NewsBlock } from '../data/siteData'
import SEO from '../components/SEO'
import NewsletterSignup from '../components/NewsletterSignup'

function RenderBlock({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-sf-muted text-[15px] leading-relaxed">
          {block.text}
        </p>
      )

    case 'heading':
      return (
        <h2 className="font-condensed font-black text-[28px] uppercase text-sf-text leading-tight pt-4">
          {block.text}
        </h2>
      )

    case 'quote':
      return (
        <div className="border-l-[3px] border-sf-orange pl-6 py-2 my-2">
          <p
            className="font-condensed font-bold text-[22px] uppercase leading-tight mb-3"
            style={{
              background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            "{block.text}"
          </p>
          <p className="text-[12px] font-semibold tracking-widest uppercase text-sf-muted">
            — {block.attribution}
          </p>
        </div>
      )

    case 'image':
      return (
        <div className="my-2">
          <div className="w-full bg-sf-surface aspect-video flex items-center justify-center overflow-hidden">
            <img
              src={block.src}
              alt={block.caption}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
          {block.caption && (
            <p className="text-[12px] text-sf-muted/60 mt-2 text-center italic">
              {block.caption}
            </p>
          )}
        </div>
      )

    case 'list':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] text-sf-muted">
              <span
                className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
              />
              {item}
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>()
  const article = news.find((n) => n.id === id)

  if (!article) return <Navigate to="/news" replace />

  const related = news.filter((n) => n.id !== article.id).slice(0, 2)

  return (
    <div className="bg-sf-darker min-h-screen">
      <SEO
        url={`/news/${article.id}`}
        title={article.headline}
        description={article.excerpt}
        type="article"
      />

      {/* ── HERO ── */}
      <div className="relative overflow-hidden pt-17 border-b border-sf-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,106,0,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-275 mx-auto px-6 md:px-12 pt-12 pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-sf-muted mb-8">
            <Link to="/" className="hover:text-sf-text transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/news" className="hover:text-sf-text transition-colors">News</Link>
            <span className="text-white/20">/</span>
            <span className="text-sf-text truncate max-w-50">{article.tag}</span>
          </div>

          {/* Tag */}
          <span className="inline-block text-[10px] font-bold tracking-[0.12em] uppercase bg-orange-500/15 text-sf-orange px-3 py-1.5 mb-5">
            {article.tag}
          </span>

          {/* Headline */}
          <h1
            className="font-condensed font-black uppercase leading-none text-sf-text mb-6 max-w-4xl"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            {article.headline}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-sf-muted">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 flex items-center justify-center text-white text-xs font-black shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-sf-text font-semibold text-[12px]">{article.author}</p>
                <p className="text-sf-muted/60 text-[11px]">{article.authorRole}</p>
              </div>
            </div>
            <span className="text-white/20">·</span>
            <span>{article.date}</span>
            <span className="text-white/20">·</span>
            <span>{article.readTime}</span>
            <span className="text-white/20">·</span>
            <span className="text-sf-orange font-semibold">{article.division}</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">

          {/* Article content */}
          <article className="flex flex-col gap-7">
            {/* Excerpt / lede */}
            <p
              className="text-[18px] leading-relaxed font-light border-l-[3px] pl-5"
              style={{
                borderColor: '#FF6A00',
                color: '#c8c8c4',
              }}
            >
              {article.excerpt}
            </p>

            {/* Content blocks */}
            {article.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}

            {/* Share row */}
            <div className="border-t border-sf-border pt-8 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-[12px] font-semibold tracking-widest uppercase text-sf-muted">
                Share this article
              </p>
              <div className="flex gap-2">
                {[
                  { label: 'X', href: `https://x.com/intent/tweet?text=${encodeURIComponent(article.headline)}&url=${encodeURIComponent(`https://solarflare.gg/news/${article.id}`)}` },
                  { label: 'Copy Link', href: '#' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={s.label === 'Copy Link' ? (e) => {
                      e.preventDefault()
                      navigator.clipboard.writeText(`https://solarflare.gg/news/${article.id}`)
                    } : undefined}
                    className="text-[11px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-4 py-2 hover:border-sf-orange hover:text-sf-orange transition-all duration-200"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Author card */}
            <div className="bg-sf-surface p-6">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-4">
                Written by
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 flex items-center justify-center text-white text-sm font-black shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="font-condensed font-bold text-[16px] uppercase text-sf-text leading-tight">
                    {article.author}
                  </p>
                  <p className="text-[11px] text-sf-orange">{article.authorRole}</p>
                </div>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-4">
                  More News
                </p>
                <div className="flex flex-col gap-0.5">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="bg-sf-surface p-5 hover:bg-[#222226] transition-colors duration-200 group block"
                    >
                      <span className="text-[10px] font-bold tracking-widest uppercase text-sf-orange mb-2 block">
                        {item.tag}
                      </span>
                      <h3 className="font-condensed font-bold text-[16px] uppercase text-sf-text leading-tight mb-2 group-hover:text-sf-orange transition-colors duration-200">
                        {item.headline}
                      </h3>
                      <p className="text-[11px] text-sf-muted">{item.date} · {item.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to news */}
            <Link
              to="/news"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-sf-muted text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/30 hover:text-sf-text transition-all duration-200"
            >
              ← All News
            </Link>
          </aside>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />
    </div>
  )
} 