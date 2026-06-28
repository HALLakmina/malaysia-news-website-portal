import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  DashboardIcon, NewsIcon, DotIcon, CategoriesIcon, SubcategoriesIcon,
  AdminsIcon, LatusIcon, AiIcon, SettingsIcon,
} from './icons'

const ACCENT = '#22D3EE'

const NAV_ITEMS = [
  { key: '', label: 'Dashboard', Icon: DashboardIcon },
  { key: 'all-news', label: 'News', Icon: NewsIcon, badge: true },
  { key: 'all-news', label: 'All News', Icon: DotIcon, sub: true },
  { key: 'add-news', label: 'Add News', Icon: DotIcon, sub: true },
  { key: 'categories', label: 'Categories', Icon: CategoriesIcon },
  { key: 'subcategories', label: 'Sub-categories', Icon: SubcategoriesIcon },
  { key: 'admins', label: 'Admins', Icon: AdminsIcon },
  { key: 'latus', label: 'Latus Assign', Icon: LatusIcon },
  { key: 'ai', label: 'AI Automation', Icon: AiIcon },
]

const Row = ({ item, active, collapsed, newsCount, onNavigate }) => {
  const sub = !!item.sub
  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '11px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    padding: collapsed ? '10px 0' : (sub ? '7px 14px 7px 42px' : '8px 14px'),
    margin: '1px 12px',
    borderRadius: '9px',
    fontSize: sub ? '12.5px' : '13px',
    fontWeight: active ? 600 : 500,
    cursor: 'pointer',
    position: 'relative',
    borderLeft: active ? `2px solid ${ACCENT}` : '2px solid transparent',
    background: active ? 'rgba(34,211,238,0.10)' : 'transparent',
    whiteSpace: 'nowrap',
    color: active ? '#EAF0F8' : (sub ? '#7B8494' : '#9AA3B3'),
    transition: 'background .15s,color .15s',
  }
  const iconSize = sub ? 8 : 18
  return (
    <div style={style} title={item.label} onClick={() => onNavigate(item.key)}>
      <span style={{ display: 'flex', flex: 'none', color: active ? ACCENT : 'inherit' }}>
        <item.Icon width={iconSize} height={iconSize} />
      </span>
      <span style={{ display: collapsed ? 'none' : 'inline', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {item.label}
      </span>
      {item.badge && !collapsed && (
        <span style={{
          display: 'inline-block', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px',
          fontWeight: 600, color: '#7C8698', background: 'rgba(148,163,184,.12)', borderRadius: '6px',
          padding: '2px 6px', flex: 'none',
        }}>{newsCount}</span>
      )}
    </div>
  )
}

const AdminSidebar = ({ collapsed, mobileOpen, onCloseDrawer, newsCount }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const activeKey = pathname.split('/', 3)[2] || ''

  const goTo = (key) => {
    navigate(key ? `/admin-panel/${key}` : '/admin-panel')
    onCloseDrawer()
  }

  return (
    <>
      {mobileOpen && (
        <div onClick={onCloseDrawer} className="fixed inset-0 z-[55] lg:hidden" style={{ background: 'rgba(3,5,9,.55)' }} />
      )}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-[60] flex flex-col h-full transition-transform duration-200 lg:transition-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          width: `${collapsed ? 76 : 248}px`,
          background: 'linear-gradient(180deg,#0C0F16,#0A0C12)',
          borderRight: '1px solid rgba(255,255,255,.06)',
          transition: 'width .2s',
          overflow: 'hidden',
          boxShadow: mobileOpen ? '0 0 60px rgba(0,0,0,.6)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '20px 18px 18px', height: '64px', flex: 'none' }}>
          <div style={{
            width: '30px', height: '30px', flex: 'none', borderRadius: '9px',
            background: 'linear-gradient(140deg,#22D3EE,#0891B2)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: '0 0 18px rgba(34,211,238,.45)',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#04141a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19V6l8 7 8-7v13" />
            </svg>
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '-.2px', color: '#EAF0F8', lineHeight: 1 }}>Malay Sri</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, fontSize: '9px', letterSpacing: '2.5px', color: '#5C6577', marginTop: '3px' }}>NEWS · ADMIN</div>
            </div>
          )}
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,.06)', margin: '0 12px 8px', flex: 'none' }} />

        <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {!collapsed && (
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9.5px', letterSpacing: '2px', color: '#444B58', padding: '6px 26px 6px', fontWeight: 500 }}>
              MANAGE
            </div>
          )}
          {NAV_ITEMS.map((item, i) => (
            <Row
              key={item.label + i}
              item={item}
              collapsed={collapsed}
              newsCount={newsCount}
              active={item.key === activeKey}
              onNavigate={goTo}
            />
          ))}
        </nav>

        <div style={{ flex: 'none', padding: '8px 0 14px', borderTop: '1px solid rgba(255,255,255,.06)', marginTop: '4px' }}>
          <Row
            item={{ key: 'settings', label: 'Settings', Icon: SettingsIcon }}
            collapsed={collapsed}
            active={activeKey === 'settings'}
            onNavigate={goTo}
          />
          {!collapsed && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 14px 0', padding: '10px',
              borderRadius: '10px', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)',
            }}>
              <div style={{
                width: '30px', height: '30px', flex: 'none', borderRadius: '50%',
                background: 'linear-gradient(135deg,#334155,#1e293b)', border: '1px solid rgba(255,255,255,.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', color: '#cbd5e1',
              }}>AD</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#D5DCE8', lineHeight: 1, whiteSpace: 'nowrap' }}>Admin</div>
                <div style={{ fontSize: '10.5px', color: '#5C6577', marginTop: '3px', whiteSpace: 'nowrap' }}>Signed in</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
