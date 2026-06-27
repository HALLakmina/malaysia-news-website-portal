import React, { useContext, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CATEGORY_LIST } from '../../Util/categories'
import { AppContext } from '../../ContextAPI/AppContext'
import SearchOverlay from '../Search/SearchOverlay'
import { sortByRecency } from '../../Util/formatDate'

const NAV_LINKS = [
  { key: 'home', name: 'Home', to: '/' },
  ...CATEGORY_LIST.map((c) => ({ key: c.key, name: c.name, to: `/news/${c.key}` })),
]

const SearchIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

const NavigationBar = () => {
  const { pathname } = useLocation()
  const { userNews = [] } = useContext(AppContext)
  const [searchOpen, setSearchOpen] = useState(false)
  const sortedNews = useMemo(() => sortByRecency(userNews), [userNews])
  const isActive = (link) => (link.to === '/' ? pathname === '/' : pathname.startsWith(link.to))

  return (
    <header className="bg-white border-b border-meridian-border relative z-20">
      <div className="hidden sm:flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-14">
        <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <img src="/assets/icons/malay-sri-logo.png" alt="Malay Sri" className="h-8 mr-4 flex-none" />
          <nav className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className={`inline-block px-3.5 py-4 font-display font-bold text-[14.5px] tracking-tight border-b-[3px] -mb-px whitespace-nowrap ${
                  isActive(link)
                    ? 'text-meridian-navy border-meridian-navy'
                    : 'text-meridian-body border-transparent hover:text-meridian-navy'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <button
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          className="flex-none flex items-center gap-2 bg-meridian-chip border border-meridian-border rounded-full px-3.5 py-2 text-meridian-muted text-[13px] hover:border-meridian-faint hover:text-meridian-ink"
          type="button"
        >
          <SearchIcon />
          <span>Search</span>
        </button>
      </div>

      <div className="flex sm:hidden items-center gap-2 pl-3">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 pr-1 flex-1" style={{ scrollbarWidth: 'none' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className={`flex-none whitespace-nowrap rounded-full px-3.5 py-2 font-display font-bold text-[13px] border ${
                isActive(link)
                  ? 'bg-meridian-navy text-white border-meridian-navy'
                  : 'bg-meridian-chip text-meridian-body border-meridian-border'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          className="flex-none grid place-items-center w-11 h-11 border-l border-meridian-border text-meridian-ink"
          type="button"
        >
          <SearchIcon size={18} />
        </button>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} articles={sortedNews} />
    </header>
  )
}

export default NavigationBar
