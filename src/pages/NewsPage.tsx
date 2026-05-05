import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'

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

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('All')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get<{ data: NewsArticle[] }>('/api/news')
        setArticles(res.data ?? [])
      } catch {
        console.error('Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const divisions = ['All', ...Array.from(new Set(articles.map((a) => a.division).filter(Boolean)))]
  const filtered  = filter === 'All' ? articles : articles.filter((a) => a.division === filter)
  const featured  = filtered.find((a) => a.featured)
  const rest      = filtered.filter((a) => !a.featured)

  return (
    <div className="bg-sf-darker">
      <SEO
        url="/news"
        title="News"
        description="Latest news, match reports and updates from Solar Flare Esports."
      />

      <PageHero
        eyebrow="Latest Updates"
        title="News"
        subtitle="Match reports, roster news and everything Solar Flare."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {divisions.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-4 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 ${
                filter === d
                  ? 'bg-sf-orange text-white'
                  : 'bg-sf-surface text-sf-muted hover:text-sf-text'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-sf-muted">
            <span className="w-6 h-6 border-2 border-sf-muted/30 border-t-sf-orange rounded-full animate-spin block" />
            Loading news...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-sf-muted">
            <p className="text-[18px] mb-2">No articles yet</p>
            <p className="text-[14px]">Check back soon for updates.</p>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <Link
                to={`/news/${featured.id}`}
                className="block bg-sf-surface mb-4 group hover:bg-[#222226] transition-colors duration-200"
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black tracking-[0.15em] uppercase bg-sf-orange text-white px-3 py-1">
                      Featured
                    </span>
                    {featured.tag && (
                      <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-sf-orange">
                        {featured.tag}
                      </span>
                    )}
                  </div>
                  <h2 className="font-condensed font-black text-[32px] md:text-[42px] uppercase leading-none text-sf-text mb-4 group-hover:text-sf-orange transition-colors duration-200">
                    {featured.headline}
                  </h2>
                  <p className="text-sf-muted text-[14px] leading-relaxed mb-6 max-w-2xl">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-sf-muted">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.read_time}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {rest.map((article) => (
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
          </>
        )}
      </section>
    </div>
  )
} 