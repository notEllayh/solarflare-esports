import { Link } from 'react-router-dom'
import { news, type NewsItem } from '../data/siteData'

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      to={`/news/${item.id}`}
      className={`relative bg-sf-mid cursor-pointer hover:bg-[#1a1a1e] transition-colors duration-200 group block ${
        item.featured ? 'p-10' : 'p-8'
      }`}
    >
      <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-orange-500/15 text-sf-orange px-2.5 py-1 mb-4">
        {item.tag}
      </span>
      <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-sf-muted mb-3">
        {item.date}
      </p>
      <h3
        className={`font-condensed font-bold uppercase leading-[1.05] mb-3 text-sf-text ${
          item.featured ? 'text-[28px] md:text-[30px]' : 'text-[22px]'
        }`}
      >
        {item.headline}
      </h3>
      <p className="text-[13px] text-sf-muted leading-relaxed pr-10 mb-4">
        {item.excerpt}
      </p>
      <div className="flex items-center gap-3 text-[11px] text-sf-muted/60">
        <span>{item.author}</span>
        <span className="text-white/20">·</span>
        <span>{item.readTime}</span>
      </div>
      <div className="absolute bottom-6 right-6 w-9 h-9 border border-white/10 flex items-center justify-center text-sf-muted text-base transition-all duration-200 group-hover:bg-sf-orange group-hover:border-sf-orange group-hover:text-white">
        →
      </div>
    </Link>
  )
}

export default function News() {
  const featured = news.find((n) => n.featured)!
  const rest = news.filter((n) => !n.featured)

  return (
    <div id="news" className="bg-sf-surface border-y border-sf-border">
      <div className="max-w-275 mx-auto px-6 md:px-12 py-24">
        <div
          className="w-12 h-0.5 mb-6"
          style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
        />
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
          Latest News
        </p>
        <h2
          className="font-condensed font-black uppercase leading-[0.95]"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
        >
          Stay in the<br />Fire
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-0.5 mt-14">
          <NewsCard item={featured} />
          <div className="grid grid-cols-1 gap-0.5">
            {rest.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 