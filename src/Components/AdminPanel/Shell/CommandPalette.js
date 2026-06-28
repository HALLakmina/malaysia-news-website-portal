import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SearchIcon, DashboardIcon, NewsIcon, PlusIcon, CategoriesIcon, SubcategoriesIcon,
  AdminsIcon, LatusIcon, AiIcon, SettingsIcon,
} from './icons'

const ITEMS = [
  { key: '', label: 'Go to Dashboard', hint: 'Page', Icon: DashboardIcon },
  { key: 'all-news', label: 'Go to All News', hint: 'Page', Icon: NewsIcon },
  { key: 'add-news', label: 'Create new article', hint: 'Action', Icon: PlusIcon },
  { key: 'categories', label: 'Go to Categories', hint: 'Page', Icon: CategoriesIcon },
  { key: 'subcategories', label: 'Go to Sub-categories', hint: 'Page', Icon: SubcategoriesIcon },
  { key: 'admins', label: 'Go to Admins', hint: 'Page', Icon: AdminsIcon },
  { key: 'latus', label: 'Go to Latus Assign', hint: 'Page', Icon: LatusIcon },
  { key: 'ai', label: 'Go to AI Automation', hint: 'Page', Icon: AiIcon },
  { key: 'settings', label: 'Go to Settings', hint: 'Page', Icon: SettingsIcon },
]

const CommandPalette = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  if (!open) return null

  const ql = query.toLowerCase()
  const results = ITEMS.filter((it) => !ql || it.label.toLowerCase().includes(ql))

  const run = (key) => {
    onClose()
    navigate(key ? `/admin-panel/${key}` : '/admin-panel')
  }

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 140, background: 'rgba(3,5,9,.6)', backdropFilter: 'blur(3px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '90px 20px 20px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '540px', background: '#11151E', border: '1px solid rgba(255,255,255,.1)', borderRadius: '15px', boxShadow: '0 30px 80px -20px rgba(0,0,0,.85)', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '15px 17px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <SearchIcon style={{ color: '#5C6577' }} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a page or run an action…"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#EAEEF6', fontSize: '14.5px' }}
          />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#5C6577', border: '1px solid rgba(255,255,255,.1)', borderRadius: '5px', padding: '2px 6px' }}>ESC</span>
        </div>
        <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '8px' }}>
          {results.length === 0 && (
            <div style={{ padding: '26px', textAlign: 'center', fontSize: '13px', color: '#5C6577' }}>No matches</div>
          )}
          {results.map((it) => (
            <div
              key={it.key + it.label}
              onClick={() => run(it.key)}
              className="mn-cmd-row"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: '9px', cursor: 'pointer', color: '#9AA4B6' }}
            >
              <span style={{ display: 'flex', width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(255,255,255,.04)', alignItems: 'center', justifyContent: 'center', color: '#22D3EE', flex: 'none' }}>
                <it.Icon />
              </span>
              <span style={{ flex: 1, fontSize: '13.5px', color: '#D5DCE8', fontWeight: 500 }}>{it.label}</span>
              <span style={{ fontSize: '10.5px', color: '#5C6577', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>{it.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
