export interface Division {
  id: string
  game: string
  category: string
  league: string
  playerCount: number
  emoji: string
}

export interface Player {
  id: string
  alias: string
  realName: string
  role: string
  division: string
  country: string
  image: string
}

export interface NewsItem {
  id: string
  tag: string
  date: string
  headline: string
  excerpt: string
  featured?: boolean
}

export interface Sponsor {
  name: string
}

export const stats = [
  { value: '1',   label: 'Championship Titles' },
  { value: '4',    label: 'Active Divisions' },
  { value: '10',   label: 'Pro Athletes' },
  { value: '1',   label: 'Content Creators' },
  { value: '₦2M+', label: 'Prize Earnings' },
]

export const divisions: Division[] = [
  { id: 'ffree',  game: 'Free Fire',         category: 'FPS · Tactical',   league: 'FFWS AFRICA',      playerCount: 6, emoji: '🎯' },
  { id: 'chess',  game: 'Chess',             category: 'Strategy',          league: 'Zone 4.2 West Africa Championship',            playerCount: 1, emoji: '♟️' },
  { id: 'ef',  game: 'eFootball',              category: 'Sports Sim',   league: 'Club Open', playerCount: 2, emoji: '🔫' },
  { id: 'fc',   game: 'EA FC 26',         category: 'Sports Sim',       league: 'CADE Elite League',     playerCount: 1, emoji: '🏆' },
  { id: 'apex', game: 'TBA',     category: '',    league: '',           playerCount: 0, emoji: '🎮' },
  { id: 'ml',   game: 'TBA',   category: '',    league: '',            playerCount: 0, emoji: '🌐' },
]

export const players: Player[] = [
  { id: 'mactech',  alias: 'MACTECH',  realName: 'Oyemwense McKings',   role: 'IGL',            division: 'Free Fire', country: 'NG', image: '/players/Mactech.jpg' },
  { id: 'ragnar',   alias: 'RAGNAR',   realName: 'Daniel Ndubueze', role: 'Rusher',  division: 'Free Fire', country: 'NG', image: '/players/Ragnar.jpg' },
  { id: 'baby',    alias: 'BABY',    realName: 'Adelola Adeola',     role: 'Support',        division: 'Free Fire', country: 'NG', image: '/players/Baby.jpg' },
  { id: 'zaza', alias: 'ZAZA', realName: 'Jodan Okechukwu',   role: 'Sniper',         division: 'Free Fire', country: 'NG', image: '/players/Zaza.jpg' },
  { id: 'ferouzan',    alias: 'FEROUZAN',    realName: 'Awoyinfa Emmanuel',    role: 'Rusher',division: 'Free Fire', country: 'NG', image: '/players/Ferouzan.jpg' },
]

export const news: NewsItem[] = [
  {
    id: '1',
    tag: 'Tournament Results',
    date: 'April 24, 2026',
    headline: 'Solar Flare Advances to FFWS Africa Grand Finals After Placing Top 4 in Knockout Stage',
    excerpt: 'MACTECH and the squad deliver an immaculate performance against top SSA Africa teams, securing their spot in the most anticipated final of the season.',
    featured: true,
  },
  {
    id: '2',
    tag: 'Content Creator',
    date: 'April 18, 2026',
    headline: 'Welcome KIDA to the Solar Flare Family',
    excerpt: 'We\'re thrilled to announce the signing of one of Africa\'s most popular eFootball content creators.',
  },
  {
    id: '3',
    tag: 'Partnership',
    date: 'April 10, 2026',
    headline: 'Solar Flare Partners with PayStack for 2026 Season',
    excerpt: 'A landmark deal that strengthens our infrastructure and competitive operations in Africa.',
  },
]

export const sponsors: Sponsor[] = [
  { name: 'Mtn' },
  { name: 'Mentos' },
  { name: 'Red Bull' },
  { name: 'Eatables' },
  { name: 'Xiaomi' },
  { name: 'PayStack' },
]

export const navLinks = [
  { label: 'Teams',    href: '/teams' },
  { label: 'Roster',   href: '/roster' },
  { label: 'News',     href: '/news' },
  { label: 'Partners', href: '/partners' },
  { label: 'About',    href: '/about' },
  { label: 'Careers',  href: '/careers' },
]

export interface Product {
  id: string
  name: string
  category: string
  price: number
  badge?: string
  emoji: string
  colors: string[]
}

export interface JobRole {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
}

export const products: Product[] = [
  { id: 'jersey-home',   name: 'SF Home Jersey 2026',       category: 'Jerseys',      price: 89.99,  badge: 'New',      emoji: '👕', colors: ['#FF6A00', '#141416'] },
  { id: 'jersey-away',   name: 'SF Away Jersey 2026',       category: 'Jerseys',      price: 89.99,  badge: 'New',      emoji: '👕', colors: ['#F5F5F0', '#FF6A00'] },
  { id: 'hoodie',        name: 'Solar Flare Pullover Hoodie',category: 'Apparel',      price: 74.99,                     emoji: '🧥', colors: ['#141416', '#888884'] },
  { id: 'cap',           name: 'SF Snapback Cap',            category: 'Accessories',  price: 34.99,                     emoji: '🧢', colors: ['#141416', '#FF6A00'] },
  { id: 'mousepad',      name: 'SF XL Gaming Mousepad',     category: 'Gear',         price: 44.99,  badge: 'Bestseller',emoji: '🖱️', colors: ['#0A0A0B'] },
  { id: 'tracksuit',     name: 'Pro Tracksuit 2026',         category: 'Apparel',      price: 129.99, badge: 'Limited',  emoji: '🥋', colors: ['#FF6A00', '#141416'] },
  { id: 'tee',           name: 'Flare Graphic Tee',          category: 'Apparel',      price: 39.99,                     emoji: '👕', colors: ['#141416', '#1C1C1F'] },
  { id: 'water-bottle',  name: 'SF Insulated Bottle',        category: 'Accessories',  price: 29.99,                     emoji: '🍶', colors: ['#FF6A00'] },
]

export const shopCategories = ['All', 'Jerseys', 'Apparel', 'Gear', 'Accessories']

export const jobRoles: JobRole[] = [
  {
    id: 'performance-coach',
    title: 'Performance Coach',
    department: 'Athletic',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    description: 'Work directly with our pro rosters to develop mental performance programs, recovery routines, and peak competition readiness strategies.',
  },
  {
    id: 'content-producer',
    title: 'Content Producer',
    department: 'Media',
    location: 'Remote',
    type: 'Full-time',
    description: 'Produce high-quality video content across YouTube, TikTok, and social — from match highlights to behind-the-scenes player documentaries.',
  },
  {
    id: 'partnership-manager',
    title: 'Partnership Manager',
    department: 'Commercial',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    description: 'Identify, close, and manage brand partnerships that align with Solar Flare\'s identity and help fuel our competitive ambitions.',
  },
  {
    id: 'data-analyst',
    title: 'Esports Data Analyst',
    department: 'Performance',
    location: 'Remote',
    type: 'Full-time',
    description: 'Analyse in-game data across our divisions to produce actionable insights that give our teams a competitive edge.',
  },
  {
    id: 'social-manager',
    title: 'Social Media Manager',
    department: 'Media',
    location: 'Remote',
    type: 'Full-time',
    description: 'Own Solar Flare\'s voice across all social platforms — building community, driving engagement, and growing our global fanbase.',
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    department: 'Creative',
    location: 'Remote',
    type: 'Contract',
    description: 'Create stunning visual assets for campaigns, merchandise drops, match-day graphics, and brand activations.',
  },
]

export const departments = ['All', 'Athletic', 'Media', 'Commercial', 'Performance', 'Creative']

export interface ContactDepartment {
  id: string
  icon: string
  title: string
  description: string
  email: string
}

export interface MembershipTier {
  id: string
  name: string
  price: number
  period: string
  badge: string
  description: string
  perks: string[]
  featured?: boolean
}

export interface FanPerk {
  icon: string
  title: string
  description: string
}

export const contactDepartments: ContactDepartment[] = [
  {
    id: 'general',
    icon: '💬',
    title: 'General Enquiries',
    description: 'Questions about Solar Flare, our teams, or anything else.',
    email: 'hello@solarflare.gg',
  },
  {
    id: 'partnerships',
    icon: '🤝',
    title: 'Partnerships & Sponsorships',
    description: 'Interested in partnering with Solar Flare? Let\'s talk.',
    email: 'partners@solarflare.gg',
  },
  {
    id: 'press',
    icon: '📰',
    title: 'Press & Media',
    description: 'Media requests, interviews, and press accreditation.',
    email: 'press@solarflare.gg',
  },
  {
    id: 'careers',
    icon: '🚀',
    title: 'Careers',
    description: 'Want to join the org? We\'d love to hear from you.',
    email: 'careers@solarflare.gg',
  },
]

export const membershipTiers: MembershipTier[] = [
  {
    id: 'spark',
    name: 'Spark',
    price: 4999,
    period: 'month',
    badge: '🔥',
    description: 'Get your foot in the door and start your Solar Flare journey.',
    perks: [
      'Exclusive Flame Society Discord role',
      'Monthly digital wallpaper pack',
      'Early access to merch drops',
      'Member-only newsletter',
    ],
  },
  {
    id: 'flare',
    name: 'Flare',
    price: 12999,
    period: 'month',
    badge: '⚡',
    description: 'The full fan experience — built for the dedicated supporter.',
    perks: [
      'Everything in Spark',
      'Monthly signed digital card from a player',
      'Priority ticketing for live events',
      'Behind-the-scenes content access',
      'Quarterly merch discount (15% off)',
      'Live Q&A sessions with players',
    ],
    featured: true,
  },
  {
    id: 'solar',
    name: 'Solar',
    price: 29999,
    period: 'month',
    badge: '☀️',
    description: 'For the superfan who wants the ultimate Solar Flare experience.',
    perks: [
      'Everything in Flare',
      'Annual physical welcome kit (jersey + extras)',
      'Name in credits on content videos',
      'Annual 1-on-1 video call with a player',
      'VIP access at Solar Flare live events',
      'Exclusive Solar-tier Discord lounge',
      '25% discount on all merch, all year',
    ],
  },
]

export const fanPerks: FanPerk[] = [
  { icon: '🎮', title: 'Exclusive Content',    description: 'Behind-the-scenes footage, training sessions, and player vlogs only Flame Society members ever see.' },
  { icon: '🏆', title: 'Event Priority',        description: 'Get first access to tickets for Solar Flare live events, LAN appearances, and fan meetups.' },
  { icon: '👕', title: 'Member Merch Drops',    description: 'Flame Society-exclusive colourways and limited items that never reach the public store.' },
  { icon: '💬', title: 'Player Access',         description: 'Monthly AMAs, live chat sessions, and for higher tiers — direct video calls with the roster.' },
  { icon: '🌐', title: 'Global Community',      description: 'Join thousands of Solar Flare fans in the most active esports community on Discord.' },
  { icon: '⚡', title: 'Early Access',           description: 'Be first — merch drops, announcements, roster reveals. Flame Society always finds out first.' },
]

export const footerLinks = {
  Teams:        ['Free Fire', 'Chess', 'eFootball', 'EA FC 26', 'Coming Soon...'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact'],
  Community:    ['Flame Society', 'Discord', 'Shop', 'Events', 'Tryouts'],
} 