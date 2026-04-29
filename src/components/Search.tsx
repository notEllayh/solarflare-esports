import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { searchIndex, type SearchResult } from '../data/searchIndex'

const fuse = new Fuse(searchIndex, {
  keys:               ['title', 'subtitle', 'category'],
  threshold:          0.35,
  includeScore:       true,
  minMatchCharLength: 2,
})

const categoryColors: Record<string, string> = {
  Player:   'bg-orange-500/15 text-sf-orange',
  News:     'bg-blue-500/15 text-blue-400',
  Division: 'bg-green-500/15 text-green-400',
  Team:     'bg-green-500/15 text-green-400',
  Partner:  'bg-yellow-500/15 text-yellow-400',
  Career:   'bg-purple-500/15 text-purple-400',
  Page:     'bg-white/5 text-sf-muted',
}

interface SearchProps {
  open: boolean
  onClose: () => void
}

export default function Search({ open, onClose }: SearchProps) {
  const [query, setQuery]        = useState('')
  const [results, setResults]    = useState<SearchResult[]>([])
  const [activeIndex, setActive] = useState(0)
  const inputRef                 = useRef<HTMLInputElement>(null)
  const navigate                 = useNavigate()

  // Focus input when opened
useEffect(() => {
  if (!open) return
  const timer = setTimeout(() => {
    inputRef.current?.focus()
  }, 50)
  return () => clearTimeout(timer)
}, [open])

// Reset state when closed
useEffect(() => {
  if (!open) {
    setQuery('')
    setResults([])
    setActive(0)
  }
}, [open])

// Search on query change
useEffect(() => {
  const trimmed = query.trim()
  if (trimmed.length < 2) {
    setResults([])
    setActive(0)
    return
  }
  const raw = fuse.search(trimmed).slice(0, 8)
  const mapped = raw.map((r) => r.item)
  setResults(mapped)
  setActive(0)
  // setResults and setActive are stable React dispatch functions — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [query]) 

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        navigate(results[activeIndex].href)
        onClose()
      }
    },
    [results, activeIndex, navigate, onClose]
  )

  const handleSelect = (result: SearchResult) => {
    navigate(result.href)
    onClose()
  }

  // Default suggestions when no query
  const suggestions: SearchResult[] = searchIndex.filter((s) =>
    [
      'page-matches',
      'page-shop',
      'page-flame',
      'page-gallery',
      'player-vortex',
      'news-ffws-grand-finals-2026',
    ].includes(s.id)
  )

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 z-70 w-full max-w-2xl px-4">
        <div className="bg-sf-surface border border-sf-border shadow-2xl overflow-hidden">

          {/* Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-sf-border">
            <span className="text-sf-muted text-[18px] shrink-0">🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search players, news, teams, pages..."
              className="flex-1 bg-transparent text-sf-text text-[15px] outline-none placeholder:text-sf-muted/40"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-sf-muted hover:text-sf-text transition-colors text-[18px] shrink-0"
              >
                ×
              </button>
            )}
            <button
              onClick={onClose}
              className="text-[11px] font-bold tracking-widest uppercase text-sf-muted border border-white/10 px-3 py-1.5 hover:border-white/30 hover:text-sf-text transition-all duration-200 shrink-0"
            >
              Esc
            </button>
          </div>

          {/* Results */}
          <div className="max-h-105 overflow-y-auto">
            {query.length < 2 ? (
              /* Suggestions */
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-3 px-2">
                  Quick Links
                </p>
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(s)}
                    className="w-full flex items-center gap-4 px-3 py-3 hover:bg-sf-mid transition-colors duration-150 text-left group"
                  >
                    <span className="text-[20px] w-8 text-center shrink-0">
                      {s.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-condensed font-bold text-[16px] uppercase text-sf-text leading-tight">
                        {s.title}
                      </p>
                      <p className="text-[12px] text-sf-muted truncate">{s.subtitle}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 shrink-0 ${
                        categoryColors[s.category] ?? ''
                      }`}
                    >
                      {s.category}
                    </span>
                  </button>
                ))}
              </div>
            ) : results.length > 0 ? (
              /* Search results */
              <div className="p-2">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-2 px-3 pt-2">
                  {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={`w-full flex items-center gap-4 px-3 py-3.5 transition-colors duration-100 text-left ${
                      index === activeIndex ? 'bg-sf-mid' : 'hover:bg-sf-mid'
                    }`}
                  >
                    <span className="text-[20px] w-8 text-center shrink-0">
                      {result.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-condensed font-bold text-[16px] uppercase text-sf-text leading-tight truncate">
                        {result.title}
                      </p>
                      <p className="text-[12px] text-sf-muted truncate">{result.subtitle}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 shrink-0 ${
                        categoryColors[result.category] ?? ''
                      }`}
                    >
                      {result.category}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              /* No results */
              <div className="px-6 py-12 text-center">
                <p className="font-condensed font-black text-[24px] uppercase text-sf-muted mb-2">
                  No results
                </p>
                <p className="text-[13px] text-sf-muted/50">
                  Try searching for a player, team, or page.
                </p>
              </div>
            )}
          </div>

          {/* Footer hints */}
          <div className="flex items-center gap-5 px-5 py-3 border-t border-sf-border">
            {[
              { key: '↑↓',  label: 'Navigate' },
              { key: '↵',   label: 'Select' },
              { key: 'Esc', label: 'Close' },
            ].map((hint) => (
              <div key={hint.key} className="flex items-center gap-1.5">
                <kbd className="text-[10px] font-bold bg-sf-mid border border-white/10 px-1.5 py-0.5 text-sf-muted">
                  {hint.key}
                </kbd>
                <span className="text-[11px] text-sf-muted/50">{hint.label}</span>
              </div>
            ))}
            <span className="ml-auto text-[11px] text-sf-muted/30">
              Powered by Solar Flare Search
            </span>
          </div>
        </div>
      </div>
    </>
  )
} 