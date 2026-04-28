import { useState } from 'react'
import { products, shopCategories, type Product } from '../data/siteData'
import PageHero from '../components/PageHero'

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative bg-sf-surface group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 bg-sf-orange text-white">
          {product.badge}
        </div>
      )}

      {/* Image area */}
      <div className="relative aspect-square bg-sf-mid flex items-center justify-center overflow-hidden">
        <span
          className={`text-[72px] transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
        >
          {product.emoji}
        </span>

        {/* Color swatches */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {product.colors.map((color) => (
            <div
              key={color}
              className="w-4 h-4 border border-white/20"
              style={{ background: color }}
            />
          ))}
        </div>

        {/* Quick add overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-sf-orange text-white text-[11px] font-bold tracking-[0.12em] uppercase text-center py-3 transition-all duration-300 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          Quick Add
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-sf-muted mb-1">
          {product.category}
        </p>
        <h3 className="font-condensed font-bold text-[18px] uppercase leading-tight text-sf-text mb-2">
          {product.name}
        </h3>
        <p
          className="font-condensed font-black text-[20px]"
          style={{
            background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          £{product.price.toFixed(2)}
        </p>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
      />
    </div>
  )
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <>
      <PageHero
        eyebrow="Official Store"
        title="Merch & Gear"
        subtitle="Rep the flare. Official Solar Flare jerseys, apparel, and gaming gear."
      />

      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-16">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-12">
          {shopCategories.map((cat) => (
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

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px]">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-sf-muted">
            <p className="font-condensed font-black text-[32px] uppercase">No items found</p>
            <p className="text-[14px] mt-2">Try a different category.</p>
          </div>
        )}
      </section>

      {/* Promo banner */}
      <div
        className="mx-6 md:mx-12 mb-16 max-w-[1100px] md:mx-auto p-10 md:p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #FFB800 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/70 mb-2">
              Limited Drop
            </p>
            <h3 className="font-condensed font-black text-[36px] md:text-[48px] uppercase text-white leading-none">
              Pro Kit 2026<br />Now Available
            </h3>
          </div>
          <button className="flex-shrink-0 bg-sf-darker text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 py-4 hover:bg-sf-mid transition-colors duration-200">
            Shop the Drop
          </button>
        </div>
      </div>
    </>
  )
}