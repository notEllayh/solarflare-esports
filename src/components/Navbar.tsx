import SlfLogo from '../assets/Logos/RedLogo.png';
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data/siteData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => location.pathname === href
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-17 transition-all duration-300 ${
        scrolled
          ? 'bg-sf-darker/95 backdrop-blur-md border-b border-sf-border'
          : 'bg-transparent'
      }`}
    >
      <Link to="/" className="flex items-center gap-2.5 group" onClick={closeMenu}>
        <div>
            <img src={SlfLogo} alt="Solar Flare Logo" className="w-10 h-10 object-contain group-hover:brightness-110 transition-filter duration-200" />
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
        <Link
          to="/shop"
          className="text-[11px] font-bold tracking-[0.14em] uppercase text-white bg-sf-orange px-5 py-2 hover:bg-orange-500 transition-colors duration-200"
        >
          Shop
        </Link>
      </div>

      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-sf-text transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-sf-text transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-sf-text transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {menuOpen && (
        <div className="absolute top-17 left-0 right-0 bg-sf-darker border-b border-sf-border md:hidden">
          <div className="flex flex-col px-8 py-6 gap-5 bg-[#ff8800]">
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
  )
}