import { useState, useEffect } from 'react'
import SlfLogo from '../assets/Logos/RedLogo.png';

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 20)

    // Phase transitions
    const holdTimer = setTimeout(() => setPhase('hold'), 400)
    const exitTimer = setTimeout(() => setPhase('exit'), 1800)
    const doneTimer = setTimeout(() => onComplete(), 2300)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-sf-darker overflow-hidden"
      style={{
        opacity:    phase === 'exit' ? 0 : 1,
        transform:  phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
        transition: phase === 'exit' ? 'opacity 0.5s ease, transform 0.5s ease' : 'none',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,106,0,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 30% 30% at 20% 80%, rgba(255,184,0,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid overlay */}
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

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity:    phase === 'enter' ? 0 : 1,
          transform:  phase === 'enter' ? 'translateY(16px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Logo mark */}
        <div>
            <img src={SlfLogo} alt="Solar Flare Logo" className="w-16 h-16 mb-6" />
        </div>

        {/* Wordmark */}
        <h1
          className="font-condensed font-black uppercase tracking-widest text-sf-text mb-2"
          style={{ fontSize: 'clamp(32px, 6vw, 56px)' }}
        >
          Solar Flare
        </h1>
        <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-sf-muted mb-12">
          Esports
        </p>

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-white/5 overflow-hidden">
          <div
            className="h-full transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
            }}
          />
        </div>

        {/* Loading text */}
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-sf-muted/40 mt-4">
          {progress < 100 ? 'Loading...' : 'Ready'}
        </p>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 pointer-events-none"
        style={{ borderColor: 'rgba(255,106,0,0.3)' }}
      />
      <div
        className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 pointer-events-none"
        style={{ borderColor: 'rgba(255,106,0,0.3)' }}
      />
      <div
        className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 pointer-events-none"
        style={{ borderColor: 'rgba(255,106,0,0.3)' }}
      />
      <div
        className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 pointer-events-none"
        style={{ borderColor: 'rgba(255,106,0,0.3)' }}
      />

      {/* Bottom tagline */}
      <p
        className="absolute bottom-10 text-[11px] font-semibold tracking-[0.15em] uppercase pointer-events-none"
        style={{
          color: 'rgba(136,136,132,0.3)',
          opacity: phase === 'hold' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        Born to compete. Built to win.
      </p>
    </div>
  )
} 