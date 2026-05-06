import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

interface NewsArticle {
  id:        string
  tag:       string
  date:      string
  headline:  string
  excerpt:   string
  author:    string
  read_time: string
  division:  string
  featured:  boolean
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get<{ data: NewsArticle[] }>('/api/news')
        setArticles((res.data ?? []).slice(0, 3))
      } catch {
        console.error('Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) return (
    <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
      <div className="flex items-center gap-3 text-sf-muted">
        <span className="w-5 h-5 border-2 border-sf-muted/30 border-t-sf-orange rounded-full animate-spin block" />
        Loading news...
      </div>
    </section>
  )

  if (articles.length === 0) return null

  return (
    <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">
            Latest Updates
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none text-sf-text"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
          >
            News
          </h2>
        </div>
        <Link
          to="/news"
          className="text-[11px] font-bold tracking-[0.14em] uppercase text-sf-muted hover:text-sf-text transition-colors duration-200 hidden md:block"
        >
          All News →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/news/${article.id}`}
            className="block bg-sf-surface p-6 group hover:bg-[#222226] transition-colors duration-200"
          >
            {article.tag && (
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-sf-orange block mb-3">
                {article.tag}
              </span>
            )}
            <h3 className="font-condensed font-black text-[22px] uppercase leading-tight text-sf-text mb-3 group-hover:text-sf-orange transition-colors duration-200">
              {article.headline}
            </h3>
            <p className="text-sf-muted text-[13px] leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-sf-muted">
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.read_time}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <Link
          to="/news"
          className="text-[11px] font-bold tracking-[0.14em] uppercase text-sf-muted hover:text-sf-text transition-colors"
        >
          All News →
        </Link>
      </div>
    </section>
  )
} 