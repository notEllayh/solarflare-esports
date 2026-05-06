import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import SEO from '../components/SEO'

interface NewsArticle {
  id:          string
  tag:         string
  date:        string
  headline:    string
  excerpt:     string
  author:      string
  author_role: string
  read_time:   string
  division:    string
  featured:    boolean
  content:     { type: string; text: string }[]
}

// ── Share Button ─────────────────────────────────────────
function ShareButtons({ article }: { article: NewsArticle }) {
  const [copied, setCopied] = useState(false)
  const url     = `${window.location.origin}/news/${article.id}`
  const text    = `${article.headline} — Solar Flare Esports`

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    )
  }

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      '_blank'
    )
  }

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-muted">
        Share this article
      </p>
      <div className="flex flex-wrap gap-2">
        {/* X / Twitter */}
        <button
          onClick={shareTwitter}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0f0f0f] border border-[#2a2a2e] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:border-white hover:bg-[#1a1a1a] transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share on X
        </button>

        {/* WhatsApp */}
        <button
          onClick={shareWhatsApp}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#128C7E]/15 border border-[#128C7E]/40 text-[#25D366] text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#128C7E]/25 hover:border-[#25D366] transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>

        {/* Facebook */}
        <button
          onClick={shareFacebook}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2]/15 border border-[#1877F2]/40 text-[#1877F2] text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#1877F2]/25 hover:border-[#1877F2] transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>

        {/* Copy link */}
        <button
          onClick={copyLink}
          className={`flex items-center gap-2 px-4 py-2.5 border text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200 ${
            copied
              ? 'bg-green-600 border-green-600 text-white'
              : 'bg-sf-surface border-sf-border text-sf-text hover:border-sf-orange hover:text-sf-orange'
          }`}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────
export default function NewsArticlePage() {
  const { id }                  = useParams()
  const navigate                = useNavigate()
  const [article, setArticle]   = useState<NewsArticle | null>(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get<{ data: NewsArticle }>(`/api/news/${id}`)
        setArticle(res.data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchArticle()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-sf-darker flex items-center justify-center">
      <span className="w-8 h-8 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
    </div>
  )

  if (notFound || !article) return (
    <div className="min-h-screen bg-sf-darker flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-condensed font-black text-[48px] uppercase text-sf-text mb-4">
        Article Not Found
      </h1>
      <button
        onClick={() => navigate('/news')}
        className="px-8 py-3 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase"
      >
        Back to News
      </button>
    </div>
  )

  return (
    <div className="bg-sf-darker">
      <SEO
        url={`/news/${article.id}`}
        title={article.headline}
        description={article.excerpt}
      />

      {/* ── Hero ── */}
      <div className="relative pt-17 pb-16 px-6 border-b border-sf-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,106,0,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-200 mx-auto pt-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <button
              onClick={() => navigate('/news')}
              className="text-[11px] font-bold tracking-widest uppercase text-sf-muted hover:text-sf-text transition-colors"
            >
              ← News
            </button>
            {article.tag && (
              <>
                <span className="text-sf-border">·</span>
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-sf-orange">
                  {article.tag}
                </span>
              </>
            )}
            {article.division && (
              <>
                <span className="text-sf-border">·</span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-sf-muted">
                  {article.division}
                </span>
              </>
            )}
          </div>

          {/* Headline */}
          <h1
            className="font-condensed font-black uppercase leading-none text-sf-text mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            {article.headline}
          </h1>

          {/* Excerpt */}
          <p className="text-sf-muted text-[16px] leading-relaxed mb-8 max-w-2xl">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-sf-muted mb-8">
            <div>
              <span className="text-sf-text font-semibold">{article.author}</span>
              {article.author_role && (
                <span className="ml-1.5">· {article.author_role}</span>
              )}
            </div>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.read_time}</span>
          </div>

          {/* Share buttons — top */}
          <ShareButtons article={article} />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-200 mx-auto px-6 py-16">
        {article.content && article.content.length > 0 ? (
          <div className="flex flex-col gap-6">
            {article.content.map((block, i) => {
              if (block.type === 'heading') return (
                <h2
                  key={i}
                  className="font-condensed font-black text-[28px] uppercase text-sf-text leading-tight"
                >
                  {block.text}
                </h2>
              )
              if (block.type === 'quote') return (
                <blockquote key={i} className="border-l-4 border-sf-orange pl-6 py-2">
                  <p className="text-[18px] text-sf-text font-medium italic leading-relaxed">
                    {block.text}
                  </p>
                </blockquote>
              )
              return (
                <p key={i} className="text-[15px] text-sf-muted leading-relaxed">
                  {block.text}
                </p>
              )
            })}
          </div>
        ) : (
            <p className="text-[15px] text-sf-muted leading-relaxed text-center py-8">
              No additional content available.
            </p> 
          )}

        {/* ── Bottom share + back ── */}
        <div className="mt-16 pt-8 border-t border-sf-border flex flex-col gap-6">
          {/* Share buttons — bottom 
          <ShareButtons article={article} /> */} 

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/news')}
              className="px-8 py-3 border border-sf-border text-sf-text text-[12px] font-bold tracking-[0.14em] uppercase hover:border-sf-orange hover:text-sf-orange transition-colors duration-200"
            >
              ← Back to News
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 