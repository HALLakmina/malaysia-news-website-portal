import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_LIST, getCategoryMeta } from '../../Util/categories'
import { formatNewsDate } from '../../Util/formatDate'

const CLOSE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

const SearchIcon = ({ size = 22, color = '#14377D' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" className="flex-none">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

const chipClass = (active) =>
  `inline-flex flex-none items-center px-3.5 py-2 rounded-full font-display font-bold text-[13px] whitespace-nowrap border ${
    active ? 'text-white' : 'bg-meridian-chip text-meridian-body border-meridian-border'
  }`

const SearchOverlay = ({ open, onClose, articles = [] }) => {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    } else {
      setQuery('')
      setActiveCategory('All')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const filtered = useMemo(() => {
    const ql = query.trim().toLowerCase()
    return articles.filter((a) => {
      if (activeCategory !== 'All' && a.category !== activeCategory) return false
      if (ql) {
        const haystack = `${a.topic || ''} ${a.description || ''}`.toLowerCase()
        if (!haystack.includes(ql)) return false
      }
      return true
    })
  }, [articles, query, activeCategory])

  if (!open) return null

  const isDefault = query.trim() === '' && activeCategory === 'All'
  const display = isDefault ? filtered.slice(0, 8) : filtered
  const resultLabel = isDefault ? 'Latest stories' : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`
  const hasResults = display.length > 0

  return (
    <div
      className="fixed inset-0 z-[55] bg-black/55 backdrop-blur-sm flex justify-center items-start px-3 pt-16 sm:pt-[72px] pb-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-[640px] lg:w-[760px] max-w-full max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-meridian-border">
          <div className="flex-1 flex items-center gap-3 min-w-0">
            <SearchIcon />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or topic…"
              className="flex-1 min-w-0 border-0 outline-none bg-transparent font-display font-bold text-xl sm:text-2xl tracking-tight text-meridian-ink placeholder:text-meridian-faint placeholder:font-bold"
            />
          </div>
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="flex-none grid place-items-center w-9 h-9 rounded-full bg-meridian-chip border border-meridian-border text-meridian-ink hover:bg-[#ECEFF3]"
          >
            {CLOSE_ICON}
          </button>
        </div>

        <div className="px-4 sm:px-5 py-4 border-b border-meridian-border">
          <div className="font-display font-extrabold text-[11px] tracking-[.12em] uppercase text-meridian-faint mb-2">
            Categories
          </div>
          <div className="scrollx flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={chipClass(activeCategory === 'All')}
              style={activeCategory === 'All' ? { background: '#14377D', borderColor: '#14377D' } : undefined}
            >
              All
            </button>
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={chipClass(activeCategory === cat.key)}
                style={activeCategory === cat.key ? { background: cat.color, borderColor: cat.color } : undefined}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-5 py-3 sm:py-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between gap-3 pb-2">
            <span className="font-display font-extrabold text-[13px] tracking-[.06em] uppercase text-meridian-ink">
              {resultLabel}
            </span>
            {(query || activeCategory !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All')
                }}
                className="text-meridian-navy font-semibold text-[13px] hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {hasResults ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[22px]">
              {display.map((item) => {
                const meta = getCategoryMeta(item.category)
                return (
                  <Link
                    key={item._id}
                    to={`/news/${item.category}/${item._id}`}
                    onClick={onClose}
                    className="flex gap-3.5 items-center py-3 border-t border-[#EEF0F3] first:border-t-0"
                  >
                    {item.image?.storageName ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${item.image.storageName}`}
                        alt=""
                        className="flex-none w-[88px] h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="flex-none w-[88px] h-16 bg-meridian-chip rounded-md" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div
                        className="font-display font-bold text-[11px] tracking-[.1em] uppercase mb-0.5"
                        style={{ color: meta.color }}
                      >
                        {meta.name}
                      </div>
                      <div className="font-display font-bold text-[15px] leading-tight tracking-tight text-meridian-ink">
                        {item.topic}
                      </div>
                      <div className="text-meridian-faint text-xs mt-1.5 font-medium">
                        {formatNewsDate(item.createdAt)}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 px-5">
              <div className="w-[54px] h-[54px] rounded-full bg-[#F1F3F6] grid place-items-center mx-auto mb-3.5">
                <SearchIcon size={24} color="#9AA2AC" />
              </div>
              <div className="font-display font-bold text-lg text-meridian-ink">No stories found</div>
              <div className="text-meridian-muted text-sm mt-1.5">Try a different title or category.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
