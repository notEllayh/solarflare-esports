import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/siteData'
import { ArrowUpRight } from 'lucide-react'; 

const featured = [
  ...products.filter((p) => p.badge),
  ...products.filter((p) => !p.badge),
].slice(0, 3)

export default function FeaturedMerch() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((i) => (i === 0 ? featured.length - 1 : i - 1))
  const next = () => setCurrent((i) => (i === featured.length - 1 ? 0 : i + 1))

  const product = featured[current]

  return (
    <section className="border-t border-sf-border overflow-hidden">

      {/* ── Section Header ── */}
      <div className="max-w-275 mx-auto px-6 md:px-12 pt-16 pb-0">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff6c00] mb-2">
          Official Store
        </p>
        <h2
          className="font-condensed font-black uppercase leading-none text-sf-text"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
        >
          Rep the Flare
        </h2>
      </div>

      {/* ── Main Showcase ── */}
      <div className="relative max-w-275 mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* ── Left — text ── */}
        <div>
          {/* Featured drop counter */}
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-muted mb-6">
            Featured Drop {current + 1} of {featured.length}
          </p>

          {/* Category */}
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-3">
            {product.category}
          </p>

          {/* Product name */}
          <h3
            className="font-condensed font-black uppercase leading-none text-sf-text mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <p
            className="font-condensed font-black text-[48px] leading-none mb-8"
            style={{
              background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ₦{product.price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>

          {/* Color swatches */}
          <div className="flex gap-2 mb-10">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-6 h-6 border-2 border-sf-border"
                style={{ background: color }}
              />
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ff6c00] text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
          >
            View Product
            <ArrowUpRight className="text-[12px]" />
          </Link>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-10">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-200"
                style={{
                  width:      i === current ? '24px' : '8px',
                  height:     '3px',
                  background: i === current ? '#FF6A00' : '#2a2a2e',
                }}
              />
            ))}
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2 mb-10">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center bg-[#ff6c00] mt-3 cursor-pointer text-white hover:bg-orange-500 transition-colors font-bold text-lg"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center bg-[#ff6c00] mt-3 cursor-pointer text-white hover:bg-orange-500 transition-colors font-bold text-lg"
            >
              →
            </button>
          </div>
        </div>

        {/* ── Right — product image ── */}
        <div className="relative flex items-center justify-center">
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,106,0,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 bg-sf-orange text-white">
              {product.badge}
            </div>
          )}

       {/* Product display box */}
<div
  className="relative flex items-center justify-center bg-sf-surface border border-sf-border w-full overflow-hidden"
  style={{ aspectRatio: '1/1', maxWidth: '500px' }}
>
  {product.emoji.startsWith('/') || product.emoji.startsWith('http') ? (
    <img
      src={product.emoji}
      alt={product.name}
      className="w-full h-full object-contain p-8"
    />
  ) : (
    <span style={{ fontSize: 'clamp(150px, 25vw, 260px)' }}>
      {product.emoji}
    </span>
  )} 

          {/* Official Store label */}
  <div className="absolute bottom-4 right-4 text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted border border-sf-border px-3 py-1.5 bg-sf-surface">
    Flare Your Style
  </div>
          </div>
        </div>
      </div>
    </section>
  )
} 