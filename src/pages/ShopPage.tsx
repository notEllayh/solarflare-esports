import { useState } from 'react'
import SEO from '../components/SEO'
import PageHero from '../components/PageHero'
import { products, shopCategories, type Product } from '../data/siteData'

interface CartItem {
  product: Product
  size:    string
  qty:     number
}

const SIZES: Record<string, string[]> = {
  Jerseys:     ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Apparel:     ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Gear:        ['One Size'],
  Accessories: ['One Size'],
}

const WHATSAPP_NUMBER = '2348000000000'

// ── Cart Drawer ──────────────────────────────────────────
function CartDrawer({
  cart,
  onClose,
  onUpdateQty,
  onRemove,
}: {
  cart:        CartItem[]
  onClose:     () => void
  onUpdateQty: (productId: string, size: string, qty: number) => void
  onRemove:    (productId: string, size: string) => void
}) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)

  const handleCheckout = async () => {
  if (cart.length === 0) return
  const lines = cart
    .map((item) => `• ${item.product.name} (${item.size}) x${item.qty} — £${(item.product.price * item.qty).toFixed(2)}`)
    .join('\n')
  const message = `Hi! I'd like to order from Solar Flare Esports:\n\n${lines}\n\nTotal: £${total.toFixed(2)}`
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')

  // Award merch points — get token from localStorage
  try {
    const stored = Object.entries(localStorage).find(([k]) => k.includes('auth-token'))
    if (stored) {
      const token = JSON.parse(stored[1]).access_token
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/points/award`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ action: 'bought_merch' }),
        })
      }
    }
  } catch { /* ignore */ }
}

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop — solid dark */}
      <div
        className="flex-1 bg-sf-darker cursor-pointer"
        style={{ opacity: 0.85 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-full max-w-md bg-[#0e0e10] flex flex-col h-full border-l-2 border-sf-orange">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[#2a2a2e] bg-[#0e0e10]">
          <h2 className="font-condensed font-black text-[24px] uppercase text-white">
            Cart {cart.length > 0 && <span className="text-sf-orange">({cart.length})</span>}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-white bg-[#2a2a2e] hover:bg-sf-orange transition-colors font-bold"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-[#0e0e10]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <span className="text-[48px]">🛒</span>
              <p className="font-condensed font-black text-[20px] uppercase text-white">
                Your cart is empty
              </p>
              <p className="text-[#aaaaaa] text-[13px]">
                Add some items to get started.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-orange-500 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 bg-[#1a1a1d] p-4 border border-[#2a2a2e]"
                >
                  <div className="w-16 h-16 bg-[#242428] flex items-center justify-center text-[28px] shrink-0 border border-[#2a2a2e]">
                    {item.product.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-condensed font-bold text-[15px] uppercase text-white leading-tight truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-[#aaaaaa] mt-0.5">Size: {item.size}</p>
                    <p
                      className="font-condensed font-black text-[16px] mt-1"
                      style={{
                        background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      £{(item.product.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemove(item.product.id, item.size)}
                      className="text-[11px] text-[#aaaaaa] hover:text-red-400 transition-colors font-semibold"
                    >
                      Remove
                    </button>
                    <div className="flex items-center border border-[#2a2a2e] bg-[#242428]">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.size, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-sf-orange transition-colors text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-[13px] text-white font-bold border-x border-[#2a2a2e]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.size, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:text-sf-orange transition-colors text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t-2 border-[#2a2a2e] bg-[#0e0e10]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] font-bold tracking-widest uppercase text-[#aaaaaa]">Subtotal</span>
              <span className="font-condensed font-black text-[24px] text-white">£{total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#aaaaaa] mb-4">
              Shipping calculated at checkout via WhatsApp
            </p>
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
            >
              <span>💬</span>
              Order via WhatsApp
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 mt-2 bg-[#1a1a1d] border border-[#2a2a2e] text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-[#242428] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Product Modal ────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onAddToCart,
}: {
  product:    Product
  onClose:    () => void
  onAddToCart:(product: Product, size: string, qty: number) => void
}) {
  const sizes = SIZES[product.category] ?? ['One Size']
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [qty,          setQty]          = useState(1)
  const [added,        setAdded]        = useState(false)

  const handleAdd = () => {
    onAddToCart(product, selectedSize, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Solid backdrop */}
      <div
        className="absolute inset-0 bg-sf-darker cursor-pointer"
        style={{ opacity: 0.92 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0e0e10] border-2 border-[#2a2a2e] overflow-y-auto max-h-[90vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-white bg-[#2a2a2e] hover:bg-sf-orange transition-colors font-bold"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-[#1a1a1d] flex items-center justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-[#2a2a2e]">
            <span className="text-[100px]">{product.emoji}</span>

            <div className="absolute bottom-4 left-4 flex gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="w-5 h-5 border-2 border-[#3a3a3e]"
                  style={{ background: color }}
                />
              ))}
            </div>

            {product.badge && (
              <div className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-sf-orange text-white">
                {product.badge}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col gap-5 bg-[#0e0e10]">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-sf-orange mb-1">
                {product.category}
              </p>
              <h2 className="font-condensed font-black text-[28px] uppercase leading-tight text-white">
                {product.name}
              </h2>
              <p
                className="font-condensed font-black text-[32px] mt-2"
                style={{
                  background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                £{product.price.toFixed(2)}
              </p>
            </div>

            {/* Size selector */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#aaaaaa] mb-3">
                Size — <span className="text-white">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-[12px] font-bold tracking-[0.08em] uppercase border-2 transition-all duration-150 ${
                      selectedSize === size
                        ? 'bg-sf-orange border-sf-orange text-white'
                        : 'border-[#2a2a2e] text-white bg-[#1a1a1d] hover:border-sf-orange'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#aaaaaa] mb-3">
                Quantity
              </p>
              <div className="flex items-center border-2 border-[#2a2a2e] w-fit bg-[#1a1a1d]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-sf-orange transition-colors text-xl font-bold"
                >
                  −
                </button>
                <span className="w-12 text-center text-[15px] text-white font-bold border-x-2 border-[#2a2a2e]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-sf-orange transition-colors text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`w-full py-4 text-[12px] font-bold tracking-[0.14em] uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-sf-orange text-white hover:bg-orange-500'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {/* Info strips */}
            <div className="flex flex-col gap-2 pt-2 border-t-2 border-[#2a2a2e]">
              {[
                { icon: '🚚', text: 'Free shipping on orders over ₦100,000' },
                { icon: '↩️', text: '14-day returns on unworn items' },
                { icon: '🔒', text: 'Secure checkout via WhatsApp' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-[11px] text-[#aaaaaa]">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Product Card ─────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
  onOpenModal,
}: {
  product:    Product
  onAddToCart:(product: Product, size: string, qty: number) => void
  onOpenModal:(product: Product) => void
}) {
  const [hovered, setHovered] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    const sizes = SIZES[product.category] ?? ['One Size']
    onAddToCart(product, sizes[0], 1)
  }

  return (
    <div
      className="relative bg-[#1a1a1d] group cursor-pointer border border-[#2a2a2e] hover:border-sf-orange transition-colors duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenModal(product)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-sf-orange text-white">
          {product.badge}
        </div>
      )}

      {/* Image area */}
      <div className="relative aspect-square bg-[#242428] flex items-center justify-center overflow-hidden border-b border-[#2a2a2e]">
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
              className="w-4 h-4 border border-[#3a3a3e]"
              style={{ background: color }}
            />
          ))}
        </div>

        {/* Quick add */}
        <button
          onClick={handleQuickAdd}
          className={`absolute inset-x-0 bottom-0 bg-sf-orange text-white text-[11px] font-bold tracking-[0.12em] uppercase text-center py-3 transition-all duration-300 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          + Quick Add
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-sf-orange mb-1">
          {product.category}
        </p>
        <h3 className="font-condensed font-bold text-[18px] uppercase leading-tight text-white mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
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
          <span className="text-[11px] text-[#aaaaaa] group-hover:text-sf-orange transition-colors font-semibold">
            View →
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart,           setCart]           = useState<CartItem[]>([])
  const [cartOpen,       setCartOpen]       = useState(false)
  const [modalProduct,   setModalProduct]   = useState<Product | null>(null)
  const [addedMsg,       setAddedMsg]       = useState('')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0)

  const addToCart = (product: Product, size: string, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, qty: i.qty + qty }
            : i
        )
      }
      return [...prev, { product, size, qty }]
    })
    setAddedMsg(`${product.name} added!`)
    setTimeout(() => setAddedMsg(''), 2500)
  }

  const updateQty = (productId: string, size: string, qty: number) => {
    if (qty < 1) { removeFromCart(productId, size); return }
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, qty } : i
      )
    )
  }

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)))
  }

  return (
    <>
      <SEO
        url="/shop"
        title="Merch Store"
        description="Official Solar Flare Esports merchandise — jerseys, apparel, gaming gear and accessories."
      />

      <PageHero
        eyebrow="Official Store"
        title="Merch & Gear"
        subtitle="Rep the flare. Official Solar Flare jerseys, apparel, and gaming gear."
      />

      {/* Sticky filter + cart bar */}
      <div className="sticky top-17 z-40 bg-[#0e0e10] border-b-2 border-[#2a2a2e] px-6 md:px-12 py-3 flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {shopCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-bold tracking-widest uppercase px-4 py-2 transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sf-orange text-white'
                  : 'text-white bg-[#1a1a1d] hover:bg-[#242428]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cart button */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 bg-[#1a1a1d] border-2 border-[#2a2a2e] hover:border-sf-orange transition-colors duration-200"
        >
          <span className="text-[16px]">🛒</span>
          <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-white hidden sm:block">
            Cart
          </span>
          {cartCount > 0 && (
            <span className="w-5 h-5 bg-sf-orange text-white text-[10px] font-black flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
          {cartCount > 0 && (
            <span className="text-[12px] font-bold text-sf-orange hidden md:block">
              £{cartTotal.toFixed(2)}
            </span>
          )}
        </button>
      </div>

      {/* Toast */}
      {addedMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 text-[13px] font-bold tracking-[0.08em] uppercase shadow-xl border border-green-500">
          ✓ {addedMsg}
        </div>
      )}

      <section className="max-w-275 mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onOpenModal={setModalProduct}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-condensed font-black text-[32px] uppercase text-white">No items found</p>
            <p className="text-[14px] mt-2 text-[#aaaaaa]">Try a different category.</p>
          </div>
        )}
      </section>

      {/* Promo banner */}
      <div
        className="mx-6 md:mx-auto mb-16 max-w-275 p-10 md:p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #FFB800 100%)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-white mb-2">
              Limited Drop
            </p>
            <h3 className="font-condensed font-black text-[36px] md:text-[48px] uppercase text-white leading-none">
              Pro Kit 2026<br />Now Available
            </h3>
          </div>
          <button
            onClick={() => setActiveCategory('Jerseys')}
            className="shrink-0 bg-[#060607] text-white text-[12px] font-bold tracking-[0.14em] uppercase px-8 py-4 hover:bg-[#1a1a1d] transition-colors duration-200"
          >
            Shop the Drop
          </button>
        </div>
      </div>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
        />
      )}

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={(product, size, qty) => {
            addToCart(product, size, qty)
            setModalProduct(null)
          }}
        />
      )}
    </>
  )
} 