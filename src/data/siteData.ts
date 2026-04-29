export interface Division {
  id: string
  game: string
  category: string
  league: string
  playerCount: number
  emoji: string
}

export const divisionIdMap: Record<string, string> = {
  'Free Fire': 'freefire',
  'Chess':     'chess',
  'eFootball': 'efootball',
  'EA FC 25':  'fc',
}

export interface PlayerStat {
  label: string
  value: string
}
export interface PlayerSocial {
  platform: string
  handle: string
  href: string
}

export interface Player {
  id: string
  alias: string
  realName: string
  role: string
  division: string
  country: string
  image: string
  nationality: string
  age: number
  joinedYear: string
  bio: string
  stats: PlayerStat[]
  socials: PlayerSocial[]
  achievements: string[]
  signature: string 
}

// News & content data structures
export interface NewsItem {
  id: string
  tag: string
  date: string
  headline: string
  excerpt: string
  author: string
  authorRole: string
  readTime: string
  division: string
  featured?: boolean
  content: NewsBlock[]
}

export type NewsBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'image'; src: string; caption: string }
  | { type: 'list'; items: string[] } 


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
  { id: 'freefire',  game: 'Free Fire',         category: 'Battle Royale',   league: 'FFWS AFRICA',      playerCount: 6, emoji: '🎯' },
  { id: 'chess',  game: 'Chess',             category: 'Strategy',          league: 'Zone 4.2 West Africa Championship',            playerCount: 1, emoji: '♟️' },
  { id: 'efootball',  game: 'eFootball',              category: 'Sports Sim',   league: 'Club Open', playerCount: 2, emoji: '🔫' },
  { id: 'fc',   game: 'EA FC 26',         category: 'Sports Sim',       league: 'CADE Elite League',     playerCount: 1, emoji: '🏆' },
] 

export const players: Player[] = [
  { id: 'mactech',  alias: 'MACTECH',  realName: 'Oyemwense McKings',   role: 'IGL', division: 'Free Fire', country: '🇳🇬', nationality: 'Nigerian', age: 25, joinedYear: '2026', image: '/players/mactech.jpg', bio: '', stats: [
      { label: 'K/D Ratio',     value: '6.3'  },
      { label: 'Avg Placement', value: '2.2'  },
      { label: 'Headshot %',    value: '81%'  },
      { label: 'Sniper Kills',  value: '78%'  },
      { label: 'Matches Played',value: '201'  },
      { label: 'Tournaments',   value: '11'   },
  ], achievements: [
      'FFWS 2026 Top 4',
      'Most Headshots — FF Pro League 2025',
      'Free Fire Pro League Champion 2025',
      'Best New Player — Regional Open 2025',
  ], socials: [
      { platform: 'X',         handle: '@PhantomSolis', href: 'https://x.com' },
      { platform: 'Instagram', handle: '@phantom.gg',   href: 'https://instagram.com' },
      { platform: 'YouTube',   handle: 'PhantomClips',  href: 'https://youtube.com' },
  ], signature: 'One shot. One less problem.' },

  { id: 'ragnar',   alias: 'RAGNAR',   realName: 'Daniel Ndubueze', role: 'Rusher',  division: 'Free Fire', country: '🇳🇬', nationality: 'Nigerian', age: 24, joinedYear: '2025', image: '/players/ragnar.jpg', bio: '', stats: [], achievements: [], socials: [], signature: '' },

  { id: 'baby',    alias: 'BABY',    realName: 'Adelola Adeola',     role: 'Support',        division: 'Free Fire', country: '🇳🇬', nationality: 'Nigerian', age: 23, joinedYear: '2025', image: '/players/Baby.jpg', bio: '', stats: [], achievements: [], socials: [], signature: '' },

  { id: 'zaza', alias: 'ZAZA', realName: 'Jodan Okechukwu',   role: 'Sniper',         division: 'Free Fire', country: '🇳🇬', nationality: 'Nigerian', age: 22, joinedYear: '2025', image: '/players/zaza.jpg', bio: '', stats: [], achievements: [], socials: [], signature: '' },

  { id: 'ferouzan',    alias: 'FEROUZAN',    realName: 'Awoyinfa Emmanuel',    role: 'Rusher',division: 'Free Fire', country: '🇳🇬', nationality: 'Nigerian', age: 24, joinedYear: '2025', image: '/players/Ferouzan.jpeg', bio: '', stats: [], achievements: [], socials: [], signature: '' },

  { id: 'tennyson',    alias: 'TENNYSON',    realName: 'Olisa Tennyson',    role: 'Candidate Master',division: 'Chess', country: '🇳🇬', nationality: 'Nigerian', age: 23, joinedYear: '2025', image: '/players/tennyson.jpeg', bio: '', stats: [], achievements: [], socials: [], signature: '' },

  { id: 'johncj',    alias: 'MR-EFOOTBALL',    realName: 'Coker John',    role: 'Player',division: 'eFootball', country: '🇳🇬', nationality: 'Nigerian', age: 24, joinedYear: '2025', image: '/players/johncj.jpeg', bio: '', stats: [], achievements: [], socials: [], signature: '' },

  { id: 'bigjay',    alias: 'BIGJAY',    realName: 'Jubreel Ajibola',    role: 'Player',division: 'eFootball', country: '🇳🇬', nationality: 'Nigerian', age: 24, joinedYear: '2025', image: '/players/bigjay.jpeg', bio: '', stats: [], achievements: [], socials: [], signature: '' },

  { id: 'kingnonex',    alias: 'KINGNONEX',    realName: 'Babundo Richard',    role: 'Player',division: 'EA FC26', country: '🇳🇬', nationality: 'Nigerian', age: 24, joinedYear: '2025', image: '/players/kingnonex.png', bio: '', stats: [], achievements: [], socials: [], signature: '' },
] 

export const news: NewsItem[] = [
  {
    id: '1',
    tag: 'Tournament Results',
    date: 'April 24, 2026',
    headline: 'Solar Flare Advances to FFWS Africa Grand Finals After Placing Top 4 in Knockout Stage',
    excerpt: 'MACTECH and the squad deliver an immaculate performance against top SSA Africa teams, securing their spot in the most anticipated final of the season.',
    author: 'Pere-ere Anikwu',
    authorRole: 'CEO & Founder, Solar Flare Esports',
    readTime: '4 min read',
    division: 'Free Fire',
    featured: true,
    content: [
    {
        type: 'paragraph',
        text: 'Solar Flare Esports have secured their place in the FFWS 2026 Grand Finals after a dominant 3-1 victory over Storm Squad in the semi-finals. The match, played in front of a live audience of thousands and watched by millions online, was a masterclass in controlled aggression and intelligent zone play.',
      },
      {
        type: 'paragraph',
        text: 'From the very first drop, Solar Flare looked composed. VORTEX called an early rotation that caught Storm Squad completely off guard, setting the tone for a series in which Solar Flare dictated almost every engagement on their own terms.',
      },
      {
        type: 'heading',
        text: 'BLAZE Steals the Show',
      },
        {
        type: 'paragraph',
        text: 'If there was one standout performer across the four games, it was Marco "BLAZE" Rinaldi. His entry fragging throughout the series was relentless — recording a total of 22 kills across all four matches, including a jaw-dropping five-kill clutch in game three that swung momentum decisively in Solar Flare\'s favour.',
      },
        {
        type: 'quote',
        text: 'We prepared for every scenario. We knew Storm Squad would push early — we just made sure we were ready for it every single time.',
        attribution: 'VORTEX, Solar Flare IGL',
      },
         {
        type: 'paragraph',
        text: 'Game four was the most clinical. Solar Flare secured zone by mid-game and methodically dismantled Storm Squad\'s defensive setup, closing out the series with a composed final zone win that sent the crowd into pandemonium.',
      },
         {
        type: 'heading',
        text: 'What\'s Next',
      },
            {
        type: 'paragraph',
        text: 'The Grand Finals take place on May 10th, 2026. Solar Flare will face the winner of the other semi-final bracket. Coach Sergio Montoya has already begun preparation, and the team returns to the bootcamp facility immediately.',
      },
      {
        type: 'list',
        items: [
          'Grand Finals: May 10th, 2026',
          'Opponent: TBD — semi-final bracket B plays May 1st',
          'Broadcast: Live on YouTube and Twitch',
          'Tickets: Available via the official FFWS site',
        ],
      },
       {
        type: 'paragraph',
        text: 'This is the deepest Solar Flare have ever gone in a world series event. For a team founded just two years ago, reaching a world final is an extraordinary achievement — and one the entire organisation is incredibly proud of.',
      },
    ],
  },

  {
    id: '2',
    tag: 'Content Creator',
    date: 'April 18, 2026',
    headline: 'Welcome KIDA to the Solar Flare Family',
    excerpt: 'We\'re thrilled to announce the signing of one of Africa\'s most popular eFootball content creator.',
    author: 'Pere-ere Anikwu',
    authorRole: 'CEO & Founder, Solar Flare Esports',
    readTime: '4 min read',
    division: 'eFootball',
  content: []
  },
  {
    id: '3',
    tag: 'Partnership',
    date: 'April 10, 2026',
    headline: 'Solar Flare Partners with PayStack for 2026 Season',
    excerpt: 'A landmark deal that strengthens our infrastructure and competitive operations in Africa.',
    author: 'Pere-ere Anikwu',
    authorRole: 'CEO & Founder, Solar Flare Esports',
    readTime: '4 min read',
    division: 'Partnerships',
  content: []
  },
]

// Live Match/Results tracker, Partners showcase page
export type MatchStatus = 'live' | 'upcoming' | 'completed'

export interface Match {
  id: string
  division: string
  tournament: string
  stage: string
  date: string
  time: string
  status: MatchStatus
  teamA: {
    name: string
    logo: string
    score?: number
  }
  teamB: {
    name: string
    logo: string
    score?: number
  }
  streamUrl?: string
  ticketUrl?: string
  recap?: string
}

export interface Partner {
  id: string
  name: string
  category: 'Principal' | 'Technology' | 'Lifestyle' | 'Media' | 'Official'
  logo: string
  description: string
  website: string
  since: string
  featured?: boolean
}

export const matches: Match[] = [
  {
    id: 'match-001',
    division: 'Free Fire',
    tournament: 'FFWS 2026',
    stage: 'Grand Finals',
    date: 'May 10, 2026',
    time: '18:00 WAT',
    status: 'upcoming',
    teamA: { name: 'Solar Flare', logo: '/logos/sf.png' },
    teamB: { name: 'TBD', logo: '/logos/tbd.png' },
    streamUrl: 'https://youtube.com',
    ticketUrl: 'https://ffws.gg',
  },
  {
    id: 'match-002',
    division: 'Free Fire',
    tournament: 'FFWS 2026',
    stage: 'Semi Finals',
    date: 'April 24, 2026',
    time: '17:00 WAT',
    status: 'completed',
    teamA: { name: 'Solar Flare', logo: '/logos/sf.png', score: 3 },
    teamB: { name: 'Storm Squad', logo: '/logos/storm.png', score: 1 },
    recap: '/news/ffws-grand-finals-2026',
  },
  {
    id: 'match-003',
    division: 'Free Fire',
    tournament: 'FFWS 2026',
    stage: 'Quarter Finals',
    date: 'April 17, 2026',
    time: '16:00 WAT',
    status: 'completed',
    teamA: { name: 'Solar Flare', logo: '/logos/sf.png', score: 3 },
    teamB: { name: 'Blaze Gaming', logo: '/logos/blaze.png', score: 0 },
    recap: '/news',
  },
  {
    id: 'match-004',
    division: 'Chess',
    tournament: 'FIDE Online Arena',
    stage: 'Open Round 5',
    date: 'April 30, 2026',
    time: '14:00 WAT',
    status: 'upcoming',
    teamA: { name: 'ECHO', logo: '/logos/sf.png' },
    teamB: { name: 'GM Petrosyan A.', logo: '/logos/fide.png' },
    streamUrl: 'https://chess.com',
  },
  {
    id: 'match-005',
    division: 'Chess',
    tournament: 'FIDE Online Arena',
    stage: 'Open Round 4',
    date: 'April 25, 2026',
    time: '14:00 WAT',
    status: 'completed',
    teamA: { name: 'ECHO', logo: '/logos/sf.png', score: 1 },
    teamB: { name: 'GM Petrosyan A.', logo: '/logos/fide.png', score: 0 },
  },
  {
    id: 'match-006',
    division: 'eFootball',
    tournament: 'eFootball League S3',
    stage: 'Week 8',
    date: 'May 2, 2026',
    time: '19:00 WAT',
    status: 'upcoming',
    teamA: { name: 'Solar Flare', logo: '/logos/sf.png' },
    teamB: { name: 'Pixel FC', logo: '/logos/pixel.png' },
    streamUrl: 'https://youtube.com',
  },
  {
    id: 'match-007',
    division: 'eFootball',
    tournament: 'eFootball League S3',
    stage: 'Week 7',
    date: 'April 23, 2026',
    time: '19:00 WAT',
    status: 'completed',
    teamA: { name: 'Solar Flare', logo: '/logos/sf.png', score: 3 },
    teamB: { name: 'Digital Eleven', logo: '/logos/digital.png', score: 1 },
  },
  {
    id: 'match-008',
    division: 'EA FC 25',
    tournament: 'eChampions League',
    stage: 'Semi Finals',
    date: 'May 5, 2026',
    time: '20:00 WAT',
    status: 'upcoming',
    teamA: { name: 'Solar Flare', logo: '/logos/sf.png' },
    teamB: { name: 'Digital XI', logo: '/logos/digital.png' },
    streamUrl: 'https://youtube.com',
  },
  {
    id: 'match-009',
    division: 'EA FC 25',
    tournament: 'eChampions League',
    stage: 'Quarter Finals',
    date: 'April 23, 2026',
    time: '20:00 WAT',
    status: 'completed',
    teamA: { name: 'Solar Flare', logo: '/logos/sf.png', score: 3 },
    teamB: { name: 'Digital XI', logo: '/logos/digital.png', score: 1 },
  },
]

// Partners & sponsors data structures
export const partners: Partner[] = [
  {
    id: 'novatech',
    name: 'NovaTech',
    category: 'Principal',
    logo: '/partners/novatech.png',
    description: 'NovaTech is Solar Flare\'s principal partner and title sponsor for the 2026 season. A fast-growing technology company with operations across Africa and Europe, NovaTech provides our athletes with cutting-edge hardware and infrastructure across all divisions.',
    website: 'https://novatech.com',
    since: '2025',
    featured: true,
  },
  {
    id: 'hyperx',
    name: 'HyperX',
    category: 'Technology',
    logo: '/partners/hyperx.png',
    description: 'HyperX equips every Solar Flare player with the peripherals they need to compete at the highest level — headsets, keyboards, mice, and mousepads built for elite performance.',
    website: 'https://hyperx.com',
    since: '2024',
    featured: true,
  },
  {
    id: 'redbull',
    name: 'Red Bull',
    category: 'Lifestyle',
    logo: '/partners/redbull.png',
    description: 'Red Bull has been fuelling high performance in esports for decades. As Solar Flare\'s official energy drink partner, Red Bull supports our athletes through tournaments, events, and content activations.',
    website: 'https://redbull.com',
    since: '2025',
    featured: true,
  },
  {
    id: 'nvidia',
    name: 'Nvidia',
    category: 'Technology',
    logo: '/partners/nvidia.png',
    description: 'Powered by Nvidia. Our entire gaming infrastructure runs on Nvidia GPUs, ensuring every Solar Flare player competes with the highest frame rates and graphical fidelity available.',
    website: 'https://nvidia.com',
    since: '2025',
  },
  {
    id: 'logitech',
    name: 'Logitech G',
    category: 'Technology',
    logo: '/partners/logitech.png',
    description: 'Logitech G provides Solar Flare with pro-grade gaming peripherals across our Free Fire and eFootball divisions. Precision-engineered for the moments that matter most.',
    website: 'https://logitechg.com',
    since: '2024',
  },
  {
    id: 'monster',
    name: 'Monster Energy',
    category: 'Lifestyle',
    logo: '/partners/monster.png',
    description: 'Monster Energy is the official energy drink of Solar Flare events and live appearances. Fuelling the community and the players in equal measure.',
    website: 'https://monsterenergy.com',
    since: '2026',
  },
]

export const partnerCategories = ['All', 'Principal', 'Technology', 'Lifestyle', 'Media', 'Official']

// Sponsors
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
  { label: 'Matches',  href: '/matches' },
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

// AboutUs Page content

export interface TeamValue {
  icon: string
  title: string
  description: string
}

export interface Milestone {
  year: string
  title: string
  description: string
}

export interface StaffMember {
  id: string
  name: string
  role: string
  department: string
  image: string
  bio: string
}

export const teamValues: TeamValue[] = [
  {
    icon: '🔥',
    title: 'Fire & Passion',
    description: 'We compete with everything we have. Every match, every practice session, every decision is made with the same burning intensity that defines Solar Flare.',
  },
  {
    icon: '🎯',
    title: 'Precision',
    description: 'Passion without discipline is just noise. We train obsessively, analyse relentlessly, and execute with the kind of precision that separates good teams from legendary ones.',
  },
  {
    icon: '🌍',
    title: 'Inclusivity',
    description: 'Solar Flare is for everyone. We build rosters, staff, and community without borders — the best people, regardless of where they come from.',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    description: 'Second place is not the goal. We build systems, environments, and cultures that make winning the natural outcome — not the exception.',
  },
  {
    icon: '🤝',
    title: 'Loyalty',
    description: 'To our players, our fans, our partners, and each other. Solar Flare is a family built on trust and we take that seriously.',
  },
  {
    icon: '⚡',
    title: 'Innovation',
    description: 'Esports moves fast. We stay ahead by embracing new ideas, new technology, and new ways of thinking about performance, content, and community.',
  },
]

export const milestones: Milestone[] = [
  {
    year: '2026 - February 16th',
    title: 'Solar Flare Founded',
    description: 'Solar Flare Esports is established in London with a founding Valorant roster and a vision to become one of the most recognised esports organisations in the world.',
  },
  {
    year: '2026 - March 19th',
    title: 'First Championship Win',
    description: 'Just one month in, our Free Fire squad claims their first title — putting Solar Flare on the map and signalling what was to come.',
  },
  {
    year: '2026 - March 27th',
    title: 'Expansion to 4 Divisions',
    description: 'We expand into Chess, eFootball, and EA FC26, growing the roster to over 10 athletes and bringing in dedicated coaching staff for each division.',
  },
  {
    year: '2026 - April 29th',
    title: 'Launched Solar Flare Content Creator Division',
    description: 'We launch our Content Creator Division, bringing together talented creators to produce engaging content and connect with our community in new and exciting ways.',
  },
  {
    year: '2026 - May 17th',
    title: 'FFWS Africa Grand Finals',
    description: 'Our Free Fire squad reaches the FFWS Africa Grand Finals — the biggest stage in African Free Fire — and the journey is only just beginning.',
  },
]

export const staffMembers: StaffMember[] = [
  {
    id: 'ceo',
    name: 'Pere-ere Anikwu',
    role: 'Chief Executive Officer & Founder',
    department: 'Leadership',
    image: '/staff/pere-ere.jpg',
    bio: 'Pere-ere founded Solar Flare with a singular vision — to build an esports organisation that competes at the highest level while staying true to its community roots. With a background in sports management and tech, she leads the org with clarity and ambition.',
  },
  {
    id: 'coo',
    name: 'Kingsley Anyanwu',
    role: 'Chief Operating Officer & Co-Owner',
    department: 'Leadership',
    image: '/staff/kingsley.jpg',
    bio: 'Kingsley keeps Solar Flare running like a machine. From partner negotiations to day-to-day operations, he ensures every part of the org is firing on all cylinders.',
  },
    {
    id: 'head-team-manager',
    name: 'Ojo Ayomikun',
    role: 'Head Team Manager',
    department: 'Management',
    image: '/staff/alpha.jpeg',
    bio: 'Ayomikun leads all mental and physical performance programmes across our divisions. A sports psychologist with experience in traditional sport, she has helped redefine what peak performance looks like in esports.',
  },
    {
    id: 'creative',
    name: 'Sheriff Ayomide',
    role: 'Creative Director',
    department: 'Creative',
    image: '/staff/ares.jpeg',
    bio: 'Sheriff is the mind behind the Solar Flare visual identity. From jersey design to content campaigns, he ensures everything Solar Flare puts out is distinctive, bold, and unmistakably us.',
  },
  {
    id: 'head-coach',
    name: 'Eniola Reuben',
    role: 'Head Coach — EA FC26',
    department: 'Coaching',
    image: '/staff/eniolaReuben.png',
    bio: 'A former professional player turned elite coach, Eniola has spent a decade studying the game at the highest level. Under his guidance the Solar Flare EA FC26 squad has become one of Nigeria\'s most feared rosters.',
  },
] 

// Team/Division Pages
export interface TeamResult {
  opponent: string
  score: string
  outcome: 'W' | 'L' | 'D'
  tournament: string
  date: string
}

export interface TeamAchievement {
  year: string
  title: string
  placement: string
}

export interface TeamCoach {
  name: string
  role: string
  image: string
}

export interface TeamDetail {
  id: string
  game: string
  category: string
  league: string
  region: string
  emoji: string
  description: string
  founded: string
  roster: string[]
  coaches: TeamCoach[]
  achievements: TeamAchievement[]
  recentResults: TeamResult[]
  socials: { platform: string; handle: string; href: string }[]
}

// Teams Detail Page
export const teamDetails: TeamDetail[] = [
  {
    id: 'freefire',
    game: 'Free Fire',
    category: 'Battle Royale',
    league: 'Free Fire World Series Africa',
    region: 'Africa',
    emoji: '🔥',
    description: 'Our Free Fire division competes in the Free Fire World Series Africa — the biggest battle royale competition in the world by viewership. Four players, one drop zone, and an unrelenting drive to be the last squad standing.',
    founded: '2026',
    roster: ['mactech', 'ragnar', 'zaza', 'ferouzan', 'baby'],
    coaches: [
      { name: 'Sensei', role: 'Head Coach',      image: '/staff/sergio.jpg' },
      { name: 'PxO',   role: 'Strategy Analyst', image: '/staff/kwame.jpg' },
    ],
    achievements: [
      { year: '2026', title: 'FFWS Africa Phase 1', placement: '1st Place 🏆' },
      { year: '2026', title: 'Terror Cup', placement: 'Quarter Final' },
      { year: '2026', title: 'SSA Pro League', placement: '5th Place' },
      { year: '2026', title: 'NGLA Championship',       placement: '1st Place 🏆' },
    ],
    recentResults: [
      { opponent: 'V-ENT', score: '2ND', outcome: 'L', tournament: 'Terror Cup',          date: 'Apr 12, 2026' },
      { opponent: 'NEW JOGOU', score: '1ST', outcome: 'W', tournament: 'Terror Cup',          date: 'Apr 11, 2026' },
    ],
    socials: [
      { platform: 'X',        handle: '@SolarFlareEsp', href: 'https://x.com' },
      { platform: 'YouTube',  handle: '@SolarFlareEsports', href: 'https://youtube.com' },
    ],
  },
  {
    id: 'chess',
    game: 'Chess',
    category: 'Strategy',
    league: 'Zone 4.2 West Africa',
    region: 'West Africa',
    emoji: '♟️',
    description: 'The oldest game. The newest battleground. Solar Flare Chess competes on the Zone 4.2 West Africa Championship, a major tournament in the region. Patience, calculation, and absolute precision — Chess is esports at its purest.',
    founded: '2026',
    roster: ['tennyson'],
    coaches: [
      { name: 'TBA', role: 'Performance Coach', image: '/staff/yemi.jpg' },
      { name: 'TBA',     role: 'Opening Analyst',   image: '/staff/viktor.jpg' },
    ],
    achievements: [
      { year: '2026', title: 'Zone 4.2 West Africa Championship',    placement: '1st Place 🏆' },
      { year: '2026', title: 'Chess.com Rapid League',    placement: 'Finalist' },
      { year: '2026', title: 'FIDE Online Arena Q4',      placement: '3rd Place' },
      { year: '2026', title: 'International Open Series', placement: 'Semi Final' },
    ],
    recentResults: [
      { opponent: 'AFM Conte, Saidou.', score: '1-0', outcome: 'W', tournament: 'Zone 4.2 West Africa',  date: 'Apr 25, 2026' },
      { opponent: 'CM Frempong-Smart Daniel.',    score: '½-½', outcome: 'D', tournament: 'Zone 4.2 West Africa',  date: 'Apr 26, 2026' },
      { opponent: 'Ballebako, Kokou.',      score: '1-0', outcome: 'W', tournament: 'Zone 4.2 West Africa',    date: 'Apr 27, 2026' },
    ],
    socials: [
      { platform: 'X',          handle: '@SolarFlareEsp',    href: 'https://x.com' },
    ],
  },
  {
    id: 'efootball',
    game: 'eFootball',
    category: 'Sports Sim',
    league: 'eFootball League',
    region: 'Global',
    emoji: '⚽',
    description: 'Solar Flare eFootball competes in Konami\'s eFootball League — the premier competitive platform for the eFootball series. Technical, tactical, and relentlessly competitive, our players bring the beautiful game to life on the virtual pitch.',
    founded: '2026',
    roster: ['bigjay', 'johncj'],
    coaches: [
      { name: 'TBA', role: 'Head Coach',    image: '/staff/emeka.jpg' },
      { name: 'TBA', role: 'Tactical Analyst', image: '/staff/lena.jpg' },
    ],
    achievements: [
      { year: '2026', title: 'EFNL League S2',  placement: '3rd Place' },
      { year: '2026', title: 'eFootball Championship Open',  placement: 'Group Stage' },
      { year: '2026', title: 'Inter Milan Club Championship',  placement: 'Round 3' },
    ],
    recentResults: [
      { opponent: 'Gemiel',  score: '2-1', outcome: 'W', tournament: 'EFNL League S2', date: 'Apr 10, 2026' },
      { opponent: 'Kida',        score: '2-3', outcome: 'W', tournament: 'EFNL League S2', date: 'Apr 6, 2026' },
      { opponent: 'Black Boysho',  score: '2-2', outcome: 'D', tournament: 'EFNL League S2', date: 'Apr 4, 2026'  },
      { opponent: 'Omokagbon',    score: '0-2', outcome: 'L', tournament: 'EFNL League S2', date: 'Apr 2, 2026'  },
      { opponent: 'Onowu',   score: '2-1', outcome: 'W', tournament: 'EFNL League S2',  date: 'Mar 30, 2026' },
    ],
    socials: [
      { platform: 'X',       handle: '@SolarFlareEsp', href: 'https://x.com' },
      { platform: 'YouTube', handle: '@SolarFlareEsports', href: 'https://youtube.com' },
    ],
  },
  {
    id: 'fc',
    game: 'EA FC 26',
    category: 'Sports Sim',
    league: 'Cade Elite League',
    region: 'Nigeria',
    emoji: '🏆',
    description: 'Solar Flare\'s EA FC division competes in the Cade Elite League — the top tier of competitive football gaming in Nigeria. Technically elite and tactically sharp, our players make the virtual beautiful game look effortless.',
    founded: '2025',
    roster: [],
    coaches: [
      { name: 'Onabanjo Eniola',  role: 'Head Coach',       image: '/staff/emeka.jpg' },
      { name: 'TBA', role: 'Tactical Coach',  image: '/staff/finn.jpg' },
    ],
    achievements: [
      { year: '2026', title: 'Cade Elite League',      placement: 'TBA' },
      { year: '2026', title: 'Cade Pro League',      placement: '1st Place 🏆' },
    ],
    recentResults: [
      { opponent: 'Mitch',    score: '5-3', outcome: 'W', tournament: 'Cade Elite League', date: 'Apr 23, 2026' },
      { opponent: 'Yemi',  score: '1-2', outcome: 'W', tournament: 'Cade Pro League', date: 'Mar 8, 2026' },
      { opponent: 'Son of God',     score: '3-0', outcome: 'W', tournament: 'Cade Pro League', date: 'Mar 7, 2026'  },
      { opponent: 'Blaise 99',   score: '3-0', outcome: 'W', tournament: 'Cade Pro League', date: 'Feb 28, 2026'  },
      { opponent: 'Mr Oga',    score: '7-4', outcome: 'W', tournament: 'Cade Pro League', date: 'Feb 28, 2026' },
    ],
    socials: [
      { platform: 'X',       handle: '@SFFC25',    href: 'https://x.com' },
      { platform: 'YouTube', handle: 'SF EA FC',   href: 'https://youtube.com' },
    ],
  },
]

// Gallary Page
export type MediaType = 'photo' | 'video' | 'highlight'

export interface MediaItem {
  id: string
  type: MediaType
  title: string
  division: string
  date: string
  thumbnail: string
  tag: string
  featured?: boolean
}

export const mediaCategories = ['All', 'Photos', 'Videos', 'Highlights', 'Free Fire', 'Chess', 'eFootball', 'EA FC 25']

export const mediaItems: MediaItem[] = [
  {
    id: 'm1',
    type: 'photo',
    title: 'VORTEX lifts the FF Pro League trophy',
    division: 'Free Fire',
    date: 'Apr 24, 2026',
    thumbnail: '/media/ffws-trophy.jpg',
    tag: 'Tournament',
    featured: true,
  },
  {
    id: 'm2',
    type: 'highlight',
    title: 'BLAZE — 5-kill clutch vs Storm Squad',
    division: 'Free Fire',
    date: 'Apr 20, 2026',
    thumbnail: '/media/blaze-clutch.jpg',
    tag: 'Highlight',
    featured: true,
  },
  {
    id: 'm3',
    type: 'video',
    title: 'Behind the Scenes — FFWS 2026 bootcamp',
    division: 'Free Fire',
    date: 'Apr 17, 2026',
    thumbnail: '/media/bootcamp-bts.jpg',
    tag: 'BTS',
  },
  {
    id: 'm4',
    type: 'photo',
    title: 'ECHO wins FIDE Online Arena Open',
    division: 'Chess',
    date: 'Apr 14, 2026',
    thumbnail: '/media/echo-chess-win.jpg',
    tag: 'Tournament',
  },
  {
    id: 'm5',
    type: 'highlight',
    title: 'PHANTOM — back-to-back headshots in grand final',
    division: 'Free Fire',
    date: 'Apr 10, 2026',
    thumbnail: '/media/phantom-hs.jpg',
    tag: 'Highlight',
  },
  {
    id: 'm6',
    type: 'photo',
    title: 'Solar Flare team photo — Spring 2026',
    division: 'Free Fire',
    date: 'Apr 8, 2026',
    thumbnail: '/media/team-photo.jpg',
    tag: 'Team',
  },
  {
    id: 'm7',
    type: 'video',
    title: 'Player Focus — NOVA\'s support philosophy',
    division: 'Free Fire',
    date: 'Apr 5, 2026',
    thumbnail: '/media/nova-focus.jpg',
    tag: 'Feature',
  },
  {
    id: 'm8',
    type: 'photo',
    title: 'eFootball squad at league day',
    division: 'eFootball',
    date: 'Apr 3, 2026',
    thumbnail: '/media/efootball-league.jpg',
    tag: 'Match Day',
  },
  {
    id: 'm9',
    type: 'highlight',
    title: 'EA FC 25 — hat-trick in eChampions quarter final',
    division: 'EA FC 25',
    date: 'Mar 30, 2026',
    thumbnail: '/media/fc-hattrick.jpg',
    tag: 'Highlight',
  },
  {
    id: 'm10',
    type: 'video',
    title: 'Solar Flare — 2025 Season Recap',
    division: 'Free Fire',
    date: 'Mar 25, 2026',
    thumbnail: '/media/season-recap.jpg',
    tag: 'Recap',
    featured: true,
  },
  {
    id: 'm11',
    type: 'photo',
    title: 'ECHO deep in thought — FIDE Open',
    division: 'Chess',
    date: 'Mar 20, 2026',
    thumbnail: '/media/echo-thinking.jpg',
    tag: 'Tournament',
  },
  {
    id: 'm12',
    type: 'photo',
    title: 'Jersey reveal — Solar Flare 2026 kit',
    division: 'Free Fire',
    date: 'Feb 16, 2026',
    thumbnail: '/src/assets/SlfMainJersey.png',
    tag: 'Brand',
  },
] 

//

// Privacy Policy, Terms of Use, Cookie settings, cookie consent banner and Accessibility pages
export interface LegalSection {
  title: string
  content: string[]
}

export const privacySections: LegalSection[] = [
  {
    title: 'Who We Are',
    content: [
      'Solar Flare Esports Ltd is a company registered in England and Wales. Our registered address is London, United Kingdom. When we refer to "Solar Flare", "we", "us" or "our" in this policy, we mean Solar Flare Esports Ltd.',
      'This Privacy Policy explains how we collect, use, store and share your personal data when you use our website at solarflare.gg, purchase from our store, or engage with our services including the Flame Society membership programme.',
    ],
  },
  {
    title: 'What Data We Collect',
    content: [
      'Account & contact data: When you contact us, sign up for Flame Society, or make a purchase, we collect your name, email address, postal address, and payment information.',
      'Usage data: We automatically collect information about how you interact with our website, including pages visited, time spent, referring URLs, browser type, and device information.',
      'Communications data: If you contact us via our contact form or email, we retain records of that correspondence.',
      'Cookie data: We use cookies and similar tracking technologies as described in our Cookie Policy.',
    ],
  },
  {
    title: 'How We Use Your Data',
    content: [
      'To fulfil orders and deliver products or services you have purchased.',
      'To manage your Flame Society membership and deliver member benefits.',
      'To respond to your enquiries and provide customer support.',
      'To send you marketing communications where you have given us consent to do so.',
      'To improve our website, services, and user experience through analytics.',
      'To comply with our legal obligations.',
    ],
  },
  {
    title: 'Legal Basis for Processing',
    content: [
      'Contract: Processing necessary to fulfil a contract with you, such as processing your order or managing your membership.',
      'Legitimate interests: Processing necessary for our legitimate business interests, such as improving our services and preventing fraud.',
      'Consent: Where you have given us clear consent, such as for marketing emails or non-essential cookies.',
      'Legal obligation: Where we are required to process your data to comply with the law.',
    ],
  },
  {
    title: 'Data Sharing',
    content: [
      'We do not sell your personal data to third parties. We may share your data with trusted service providers who help us operate our business, including payment processors, email service providers, and analytics platforms.',
      'All third-party providers are contractually required to handle your data securely and only for the purposes we specify.',
      'We may disclose your data where required by law or to protect the rights, property, or safety of Solar Flare, our users, or others.',
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.',
      'Account data is retained for the duration of your membership plus 2 years.',
      'Transaction records are retained for 7 years in accordance with financial regulations.',
      'You may request deletion of your data at any time by contacting us at privacy@solarflare.gg.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Under UK GDPR and the Data Protection Act 2018, you have the right to: access your personal data, correct inaccurate data, request erasure of your data, restrict or object to processing, and data portability.',
      'You also have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk.',
      'To exercise any of these rights, contact us at privacy@solarflare.gg. We will respond within 30 days.',
    ],
  },
  {
    title: 'Security',
    content: [
      'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.',
      'Payment data is processed through PCI-DSS compliant payment processors. We never store full card details on our servers.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about this Privacy Policy or how we handle your data, please contact our Data Protection team at privacy@solarflare.gg or write to us at Solar Flare Esports Ltd, London, United Kingdom.',
    ],
  },
]

export const termsSections: LegalSection[] = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using the Solar Flare Esports website at solarflare.gg, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.',
      'We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.',
    ],
  },
  {
    title: 'Use of the Website',
    content: [
      'You may use our website for lawful purposes only. You must not use our website in any way that breaches any applicable local, national, or international law or regulation.',
      'You must not attempt to gain unauthorised access to any part of our website, the server on which our website is stored, or any server, computer, or database connected to our website.',
      'You must not transmit any unsolicited or unauthorised advertising or promotional material or any other form of spam.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Solar Flare Esports Ltd and is protected by applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.',
      'The Solar Flare name, logo, and brand identity are registered trademarks of Solar Flare Esports Ltd.',
    ],
  },
  {
    title: 'Purchases and Payments',
    content: [
      'All prices on our store are displayed in the currency shown and are inclusive of applicable taxes unless otherwise stated.',
      'We reserve the right to refuse or cancel any order at our discretion, including where we suspect fraudulent activity.',
      'Payment is due at the time of purchase. We accept major credit and debit cards through our secure payment processor.',
    ],
  },
  {
    title: 'Flame Society Membership',
    content: [
      'Flame Society memberships are billed on a recurring basis (monthly or annually) depending on your selected plan.',
      'You may cancel your membership at any time. Cancellation will take effect at the end of your current billing period.',
      'We reserve the right to modify membership benefits with reasonable notice. Material changes will be communicated via email.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'To the fullest extent permitted by law, Solar Flare Esports Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.',
      'Our total liability to you for any claim arising from these terms shall not exceed the amount you paid to us in the 12 months preceding the claim.',
    ],
  },
  {
    title: 'Governing Law',
    content: [
      'These Terms of Use are governed by and construed in accordance with the laws of England and Wales.',
      'Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'If you have any questions about these Terms of Use, please contact us at legal@solarflare.gg.',
    ],
  },
]

export const cookieSections: LegalSection[] = [
  {
    title: 'What Are Cookies',
    content: [
      'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.',
    ],
  },
  {
    title: 'Cookies We Use',
    content: [
      'Essential cookies: These are necessary for the website to function and cannot be disabled. They include session cookies that keep you logged in and security cookies that protect against fraud.',
      'Analytics cookies: We use these to understand how visitors interact with our website. Data collected is aggregated and anonymous. We use tools such as Google Analytics for this purpose.',
      'Marketing cookies: These are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. They may be set by us or by third-party advertising partners.',
      'Preference cookies: These remember your settings and preferences to improve your experience, such as your language preference or region.',
    ],
  },
  {
    title: 'Managing Cookies',
    content: [
      'You can control and manage cookies in several ways. You can configure your browser to refuse all or some cookies, or to alert you when a cookie is being set.',
      'You can also manage your cookie preferences at any time using our Cookie Settings panel accessible from the footer of our website.',
      'Please note that disabling certain cookies may affect the functionality of our website.',
    ],
  },
  {
    title: 'Third-Party Cookies',
    content: [
      'Some cookies on our website are set by third parties, including Google Analytics, social media platforms, and advertising networks.',
      'These third parties have their own privacy policies and cookie practices, which we encourage you to review.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'If you have questions about our use of cookies, please contact us at privacy@solarflare.gg.',
    ],
  },
]

export const accessibilitySections: LegalSection[] = [
  {
    title: 'Our Commitment',
    content: [
      'Solar Flare Esports is committed to ensuring our website is accessible to everyone, including people with disabilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.',
      'We believe that esports is for everyone and our digital presence should reflect that. We continually work to improve the accessibility of our website.',
    ],
  },
  {
    title: 'Measures We Take',
    content: [
      'Semantic HTML: We use proper heading structures and semantic HTML elements to ensure screen readers can navigate our content effectively.',
      'Keyboard navigation: All interactive elements on our website are accessible via keyboard without requiring a mouse.',
      'Colour contrast: We maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text to support users with visual impairments.',
      'Alt text: All meaningful images include descriptive alternative text.',
      'Focus indicators: Visible focus indicators are provided for all interactive elements.',
    ],
  },
  {
    title: 'Known Limitations',
    content: [
      'While we strive for full accessibility, some areas of our website may not yet fully meet WCAG 2.1 AA standards. We are actively working to address these.',
      'Some third-party content and embedded media may not fully conform to accessibility standards. We are working with our partners to improve this.',
    ],
  },
  {
    title: 'Assistive Technology',
    content: [
      'Our website is designed to be compatible with common assistive technologies including screen readers such as NVDA, JAWS, and VoiceOver, as well as voice control software.',
    ],
  },
  {
    title: 'Feedback & Contact',
    content: [
      'We welcome your feedback on the accessibility of our website. If you encounter any barriers or have suggestions for improvement, please contact us at accessibility@solarflare.gg.',
      'We aim to respond to accessibility feedback within 5 business days.',
    ],
  },
]

// Footer Links
export const footerLinks = {
  Teams:        ['Free Fire', 'Chess', 'eFootball', 'EA FC 26', 'Coming Soon...'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact'],
  Community:    ['Flame Society', 'Discord', 'Shop', 'Events', 'Gallery'],
   Support:      ['FAQ', 'Shipping Info', 'Returns', 'Size Guide', 'Get in Touch'],
} 