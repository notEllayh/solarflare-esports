import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-17">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,106,0,0.08) 0%, transparent 70%)',
        }}
      />
      <span
        className="font-condensed font-black text-[120px] md:text-[180px] leading-none"
        style={{
          background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        404
      </span>
      <h1 className="font-condensed font-black text-[32px] uppercase text-sf-text mt-2 mb-4">
        Page Not Found
      </h1>
      <p className="text-sf-muted text-[15px] max-w-sm leading-relaxed mb-10">
        Looks like this page went out of bounds. Head back to the main stage.
      </p>
      <Link
        to="/"
        className="inline-block px-9 py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.12em] uppercase hover:bg-orange-500 transition-colors duration-200"
      >
        Back to Home
      </Link>
    </div>
  )
}