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

      {/* Hero */}
      <div className="relative pt-17 pb-16 px-6 border-b border-sf-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,106,0,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-200 mx-auto pt-12">
          <div className="flex items-center gap-3 mb-5">
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

          <h1
            className="font-condensed font-black uppercase leading-none text-sf-text mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            {article.headline}
          </h1>

          <p className="text-sf-muted text-[16px] leading-relaxed mb-8 max-w-2xl">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-[12px] text-sf-muted">
            <div>
              <span className="text-sf-text font-semibold">{article.author}</span>
              {article.author_role && (
                <span className="ml-1.5 text-sf-muted">· {article.author_role}</span>
              )}
            </div>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.read_time}</span>
          </div>
        </div>
      </div>

      {/* Content */}
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
                <blockquote
                  key={i}
                  className="border-l-4 border-sf-orange pl-6 py-2"
                >
                  <p className="text-[18px] text-sf-text font-medium italic leading-relaxed">
                    {block.text}
                  </p>
                </blockquote>
              )
              return (
                <p
                  key={i}
                  className="text-[15px] text-sf-muted leading-relaxed"
                >
                  {block.text}
                </p>
              )
            })}
          </div>
        ) : (
          <p className="text-[15px] text-sf-muted leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Back button */}
        <div className="mt-16 pt-8 border-t border-sf-border">
          <button
            onClick={() => navigate('/news')}
            className="px-8 py-3 border border-white/20 text-sf-text text-[12px] font-bold tracking-[0.14em] uppercase hover:border-sf-orange hover:text-sf-orange transition-colors duration-200"
          >
            ← Back to News
          </button>
        </div>
      </div>
    </div>
  )
} 