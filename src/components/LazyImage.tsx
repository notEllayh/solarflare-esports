// src/components/LazyImage.tsx
import { useState, useRef, useEffect } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
  style?: React.CSSProperties
}

export default function LazyImage({
  src,
  alt,
  className = '',
  fallback,
  style,
}: LazyImageProps) {
  const [loaded,   setLoaded]   = useState(false)
  const [error,    setError]    = useState(false)
  const [visible,  setVisible]  = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer — only load when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={style}>
      {/* Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-sf-mid animate-pulse" />
      )}

      {/* Image */}
      {visible && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Fallback */}
      {error && (
        <div className="absolute inset-0 bg-sf-mid flex items-center justify-center">
          {fallback ? (
            <span className="font-condensed font-black text-[48px] text-white/10 select-none">
              {fallback}
            </span>
          ) : (
            <span className="text-sf-muted text-[11px] uppercase tracking-widest">
              No image
            </span>
          )}
        </div>
      )}
    </div>
  )
} 