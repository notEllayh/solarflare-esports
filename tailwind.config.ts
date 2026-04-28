import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sf: {
          orange: '#FF6A00',
          gold: '#FFB800',
          dark: '#0A0A0B',
          darker: '#060607',
          mid: '#141416',
          surface: '#1C1C1F',
          border: 'rgba(255,106,0,0.15)',
          text: '#F5F5F0',
          muted: '#888884',
        },
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      backgroundImage: {
        'flare-gradient': 'linear-gradient(90deg, #FF6A00, #FFB800)',
        'flare-gradient-diag': 'linear-gradient(135deg, #FF6A00, #FFB800)',
      },
    },
  },
  plugins: [],
}

export default config 