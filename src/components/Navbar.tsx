import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data/siteData'
import Search from './Search'
import { useAuth } from '../context/useAuth'
import logo from '../assets/Logos/RedLogo.png'

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive  = (href: string) => location.pathname === href
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-17 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-sf-darker border-b border-sf-border'
            : 'bg-sf-darker/90 backdrop-blur-md border-b border-white/5'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group z-10" onClick={closeMenu}>
          <img
            src={logo}
            alt="Solar Flare Esports Logo"
            className="w-6 h-6 object-contain group-hover:brightness-110 transition-all duration-200"
          />
          <span className="font-condensed font-black text-xl tracking-widest uppercase text-sf-text">
            Solar Flare
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-sf-text'
                  : 'text-sf-muted hover:text-sf-text'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-sf-muted border border-white/10 px-3 py-1.5 hover:border-white/30 hover:text-sf-text transition-all duration-200"
            aria-label="Search"
          >
            <span className="text-[13px]">🔍</span>
            <span className="text-[11px] font-semibold tracking-[0.08em] hidden lg:block">
              Search
            </span>
            <kbd className="hidden lg:block text-[10px] bg-sf-mid border border-white/10 px-1.5 py-0.5 text-sf-muted/60 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/account"
                className="text-[11px] font-semibold tracking-[0.08em] uppercase text-sf-muted hover:text-sf-text transition-colors duration-200 max-w-30 truncate"
              >
                {user.user_metadata?.name || user.email}
              </Link>
              <button
                onClick={signOut}
                className="text-[11px] font-semibold tracking-[0.12em] uppercase text-sf-muted hover:text-sf-text transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[11px] font-semibold tracking-[0.12em] uppercase text-sf-muted hover:text-sf-text transition-colors duration-200"
            >
              Sign In
            </Link>
          )}

          {/* Shop CTA */}
          <Link
            to="/shop"
            className="text-[11px] font-bold tracking-[0.14em] uppercase text-white bg-sf-orange px-5 py-2 hover:bg-orange-500 transition-colors duration-200"
          >
            Shop
          </Link>
        </div>

        {/* Mobile — search + hamburger */}
        <div className="md:hidden flex items-center gap-4 z-10">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-8 h-8 flex items-center justify-center text-sf-text hover:text-sf-orange transition-colors"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <button
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.25 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-sf-text rounded-full transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-1.7' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-sf-text rounded-full transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-sf-text rounded-full transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-1.7' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-sf-darker transition-all duration-300 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-17 px-8 pb-8 overflow-y-auto">
          {/* Nav links */}
          <div className="flex flex-col gap-1 pt-8 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMenu}
                className={`text-[32px] font-condensed font-black uppercase leading-tight py-2 transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-sf-orange'
                    : 'text-sf-text hover:text-sf-orange'
                }`}
                style={{
                  transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom section */}
          <div className="flex flex-col gap-4 pt-8 border-t border-sf-border">
            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={closeMenu}
                  className="text-[13px] font-semibold tracking-widest uppercase text-sf-muted hover:text-sf-text transition-colors truncate"
                >
                  {user.user_metadata?.name || user.email}
                </Link>
                <button
                  onClick={() => { signOut(); closeMenu() }}
                  className="text-[13px] font-semibold tracking-widest uppercase text-sf-muted hover:text-sf-text transition-colors text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-[13px] font-semibold tracking-widest uppercase text-sf-muted hover:text-sf-text transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/shop"
              onClick={closeMenu}
              className="w-full py-4 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase text-center hover:bg-orange-500 transition-colors duration-200"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>

      {/* Search modal */}
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
} 