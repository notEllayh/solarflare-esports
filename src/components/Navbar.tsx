import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data/siteData'
import Search from './Search'
import { useAuth } from '../context/useAuth'
import logo from '../assets/Logos/RedLogo.png'

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive  = (href: string) => location.pathname === href
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-17 bg-[#060607] border-b border-white/10"
        style={{ WebkitBackdropFilter: 'none' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group z-10" onClick={closeMenu}>
          <img
            src={logo}
            alt="Solar Flare Esports Logo"
            className="w-6 h-6 object-contain group-hover:brightness-110 transition-all duration-200"
          />
          <span className="font-condensed font-black text-xl tracking-widest uppercase text-white">
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
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-white/60 border border-white/15 px-3 py-1.5 hover:border-white/40 hover:text-white transition-all duration-200"
            aria-label="Search"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span className="text-[11px] font-semibold tracking-[0.08em] hidden lg:block">Search</span>
            <kbd className="hidden lg:block text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 text-white/40 font-mono">⌘K</kbd>
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/account"
                className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/60 hover:text-white transition-colors duration-200 max-w-30 truncate"
              >
                {user.user_metadata?.name || user.email}
              </Link>
              <button
                onClick={signOut}
                className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors duration-200"
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
        <div className="md:hidden flex items-center gap-3 z-10">
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-sf-orange transition-colors"
            aria-label="Search"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          {/* Hamburger */}
          <button
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.25 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '3px',
                backgroundColor: 'white',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '3px',
                backgroundColor: 'white',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '3px',
                backgroundColor: 'white',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile full screen menu ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          backgroundColor: '#060607',
          transition: 'opacity 0.3s ease',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        className="md:hidden"
      >
        <div className="flex flex-col h-full pt-17 px-8 pb-10 overflow-y-auto">

          {/* Nav links */}
          <div className="flex flex-col pt-8 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMenu}
                className={`font-condensed font-black uppercase leading-none border-b border-white/5 py-4 transition-colors duration-200 ${
                  isActive(link.href) ? 'text-sf-orange' : 'text-white hover:text-sf-orange'
                }`}
                style={{
                  fontSize: '17px',
                  transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom section */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Auth */}
            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={closeMenu}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {user.user_metadata?.name || user.email}
                </Link>
                <button
                  onClick={() => { signOut(); closeMenu() }}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Sign In
              </Link>
            )}

            {/* Shop button */}
            <Link
              to="/shop"
              onClick={closeMenu}
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                backgroundColor: '#FF6A00',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textAlign: 'center',
                textDecoration: 'none',
              }}
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