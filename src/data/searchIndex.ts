import { players, news, divisions, teamDetails, partners, jobRoles } from './siteData'

export interface SearchResult {
  id: string
  title: string
  subtitle: string
  category: string
  href: string
  emoji?: string
}

export const searchIndex: SearchResult[] = [
  // Players
  ...players.map((p) => ({
    id:       `player-${p.id}`,
    title:    p.alias,
    subtitle: `${p.role} · ${p.division}`,
    category: 'Player',
    href:     `/roster/${p.id}`,
    emoji:    '👤',
  })),

  // News
  ...news.map((n) => ({
    id:       `news-${n.id}`,
    title:    n.headline,
    subtitle: `${n.tag} · ${n.date}`,
    category: 'News',
    href:     `/news/${n.id}`,
    emoji:    '📰',
  })),

  // Divisions
  ...divisions.map((d) => ({
    id:       `division-${d.id}`,
    title:    d.game,
    subtitle: `${d.category} Division`,
    category: 'Division',
    href:     `/teams/${d.id}`,
    emoji:    d.emoji,
  })), 

  // Team details
  ...teamDetails.map((t) => ({
    id:       `team-${t.id}`,
    title:    `${t.game} Team`,
    subtitle: `${t.league} · ${t.region}`,
    category: 'Team',
    href:     `/teams/${t.id}`,
    emoji:    t.emoji,
  })),

  // Partners
  ...partners.map((p) => ({
    id:       `partner-${p.id}`,
    title:    p.name,
    subtitle: `${p.category} Partner`,
    category: 'Partner',
    href:     `/partners`,
    emoji:    '🤝',
  })),

  // Jobs
  ...jobRoles.map((j) => ({
    id:       `job-${j.id}`,
    title:    j.title,
    subtitle: `${j.department} · ${j.location}`,
    category: 'Career',
    href:     `/careers`,
    emoji:    '🚀',
  })),

  // Static pages
  { id: 'page-about',        title: 'About Us',       subtitle: 'Our story, mission and values',         category: 'Page', href: '/about',        emoji: '⭐' },
  { id: 'page-shop',         title: 'Merch Store',    subtitle: 'Official Solar Flare merchandise',       category: 'Page', href: '/shop',          emoji: '👕' },
  { id: 'page-flame',        title: 'Flame Society',  subtitle: 'Fan membership — perks and access',     category: 'Page', href: '/flame-society', emoji: '🔥' },
  { id: 'page-gallery',      title: 'Gallery',        subtitle: 'Photos, highlights and media',          category: 'Page', href: '/gallery',       emoji: '📷' },
  { id: 'page-matches',      title: 'Match Tracker',  subtitle: 'Live scores, fixtures and results',     category: 'Page', href: '/matches',       emoji: '🏆' },
  { id: 'page-contact',      title: 'Contact',        subtitle: 'Get in touch with Solar Flare',         category: 'Page', href: '/contact',       emoji: '💬' },
  { id: 'page-careers',      title: 'Careers',        subtitle: 'Open roles at Solar Flare Esports',     category: 'Page', href: '/careers',       emoji: '🚀' },
  { id: 'page-partners',     title: 'Partners',       subtitle: 'Our sponsors and brand partners',       category: 'Page', href: '/partners',      emoji: '🤝' },
] 