import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-sf-darker pt-17">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,106,0,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(255,184,0,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 70%, rgba(255,106,0,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-sf-orange border border-orange-500/30 px-4 py-1.5 mb-10 text-[11px] font-bold tracking-[0.15em] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sf-orange animate-pulse" />
          Est. 2026 · Competing Worldwide
        </motion.div>

        {/* Heading */}
        <div
          className="font-condensed font-black uppercase leading-none tracking-tight mb-2"
          style={{ fontSize: 'clamp(72px, 12vw, 132px)' }}
        >
          <motion.span
            className="block text-sf-text"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Solar
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Flare
          </motion.span>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-sf-muted text-base font-light max-w-md mt-7 mb-11 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          We don't just compete — we dominate. Solar Flare Esports is built for
          champions who play with purpose, fire, and relentless precision.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex items-center gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,106,0,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/flame-society"
              className="inline-block px-9 py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.12em] uppercase hover:bg-orange-500 transition-colors duration-200"
            >
              Join Flame Society
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/login"
              className="inline-block px-9 py-3.5 text-sf-text text-[12px] font-bold tracking-[0.12em] uppercase border border-white/15 hover:border-white/40 transition-colors duration-200"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #060607, transparent)' }}
      />
    </section>
  )
}