import SlfLogo from '../assets/Logos/RedLogo.png';
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data/siteData'
import Search from './Search'

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Open search with Cmd+K / Ctrl+K
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

  const isActive  = (href: string) => location.pathname === href
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-17 transition-all duration-300 ${
          scrolled
            ? 'bg-sf-darker/95 backdrop-blur-md border-b border-sf-border'
            : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 group" onClick={closeMenu}>
          <div>
            <img src={SlfLogo} alt="Solar Flare Logo" className="w-6 h-6" />
          </div>
          <span className="font-condensed font-black text-xl tracking-widest uppercase text-sf-text">
            Solar Flare
          </span>
        </Link>

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

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-sf-muted border border-white/10 px-3 py-1.5 hover:border-white/30 hover:text-sf-text transition-all duration-200 group"
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

          <Link
            to="/shop"
            className="text-[11px] font-bold tracking-[0.14em] uppercase text-white bg-sf-orange px-5 py-2 hover:bg-orange-500 transition-colors duration-200"
          >
            Shop
          </Link>
        </div>

        {/* Mobile — search + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-sf-muted hover:text-sf-text transition-colors"
            aria-label="Search"
          >
            🔍
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-sf-text transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-sf-text transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-sf-text transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-17 left-0 right-0 bg-sf-darker border-b border-sf-border md:hidden">
            <div className="flex flex-col px-8 py-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={closeMenu}
                  className={`text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors ${
                    isActive(link.href) ? 'text-sf-text' : 'text-sf-muted hover:text-sf-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/shop"
                onClick={closeMenu}
                className="text-[11px] font-bold tracking-[0.14em] uppercase text-white bg-sf-orange px-5 py-2.5 text-center"
              >
                Shop
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search modal */}
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
} 