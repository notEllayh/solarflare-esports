import SlfLogo from '../assets/Logos/RedLogo.png';
//import { footerLinks } from '../data/siteData'

import { Link } from 'react-router-dom'

const footerNav = {
  Teams: [
    { label: 'Free Fire',         href: '/teams/freefire' },
    { label: 'Chess',href: '/teams/chess' },
    { label: 'Efootball', href: '/teams/efootball' },
    { label: 'EA FC 26', href: '/teams/fc' },
  ],
  Company: [
    { label: 'About Us',  href: '/about' },
    { label: 'Careers',   href: '/careers' },
    { label: 'Press',     href: '/contact' },
    { label: 'Partners',  href: '/partners' },
    { label: 'Contact',   href: '/contact' },
  ],
  Community: [
    { label: 'Flame Society', href: '/flame-society' },
    { label: 'Discord',       href: 'https://discord.com' },
    { label: 'Merch Store',   href: '/shop' },
    { label: 'Events',        href: '/news' },
    { label: 'Gallery',       href: '/gallery' },
  ],
  Support: [
    { label: 'FAQ',             href: '/contact' },
    { label: 'Shipping Info',   href: '/contact' },
    { label: 'Returns',         href: '/contact' },
    { label: 'Size Guide',      href: '/shop' },
    { label: 'Get in Touch',    href: '/contact' },
  ],
}

const socialLinks = [
  { label: 'X / Twitter', symbol: '𝕏',  href: 'https://x.com' },
  { label: 'Discord',     symbol: '◈',  href: 'https://discord.com' },
  { label: 'YouTube',     symbol: '▶',  href: 'https://youtube.com' },
  { label: 'Instagram',   symbol: '◻',  href: 'https://instagram.com' },
  { label: 'TikTok',      symbol: '♪',  href: 'https://tiktok.com' },
  { label: 'Twitch',      symbol: '⬡',  href: 'https://twitch.tv' },
]

const legalLinks = [
  { label: 'Privacy Policy',    href: '/privacy' },
  { label: 'Terms of Use',      href: '/terms' },
  { label: 'Cookie Settings',   href: '/cookies' },
  { label: 'Accessibility',     href: '/accessibility' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-sf-darker border-t border-sf-border">

      {/* Flame Society CTA banner */}
      <div
        className="relative overflow-hidden border-b border-sf-border"
        style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.08) 0%, rgba(255,184,0,0.04) 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,106,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-275 mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="text-[40px]">🔥</span>
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-sf-orange mb-1">
                Fan Membership
              </p>
              <h3 className="font-condensed font-black text-[24px] md:text-[28px] uppercase text-sf-text leading-none">
                Join the Flame Society
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/flame-society"
              className="px-7 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
            >
              View Memberships
            </Link>
            <Link
              to="/flame-society"
              className="px-7 py-3 border border-white/15 text-sf-text text-[11px] font-bold tracking-[0.14em] uppercase hover:border-white/40 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-275 mx-auto px-6 md:px-12 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 md:gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <div>
                <img src={SlfLogo} alt="Solar Flare Logo" className="w-8 h-8" />
              </div>
              <span className="font-condensed font-black text-xl tracking-widest uppercase text-sf-text">
                Solar Flare
              </span>
            </Link>

            <p className="text-[13px] text-sf-muted leading-relaxed max-w-52.5">
              Born to compete. Built to win. Solar Flare is where champions are forged.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-[13px] text-sf-muted hover:bg-sf-orange hover:border-sf-orange hover:text-white transition-all duration-200"
                >
                  {s.symbol}
                </a>
              ))}
            </div>

            {/* Partner badge */}
            <div className="flex items-center gap-2.5 pt-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-sf-muted tracking-wide">
                Partnered with <span className="text-sf-text">PayStack</span> & <span className="text-sf-text">Xiaomi</span>
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-sf-muted">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {links.map((link) => {
                  const isExternal = link.href.startsWith('http')
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-sf-muted hover:text-sf-text transition-colors duration-200 flex items-center gap-1 group"
                        >
                          {link.label}
                          <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-[13px] text-sf-muted hover:text-sf-text transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-sf-border" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="text-[11px] text-sf-muted/50 tracking-wide">
              © {year} Solar Flare Digital Limited. All rights reserved.
            </p>
            {/* Region */}
            <div className="flex items-center gap-1.5 text-[11px] text-sf-muted/40">
              <span>NG</span>
              <span>Nigeria</span>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[11px] text-sf-muted/50 hover:text-sf-muted transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}