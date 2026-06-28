import React from 'react'
import { SearchIcon } from './icons'

const AdminTopbar = ({ pageTitle, pageSub, onToggleDrawer, onToggleCollapse, onOpenCmd, action }) => {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px', padding: '0 22px', height: '62px', flex: 'none',
      borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(9,11,16,.65)', position: 'relative', zIndex: 10,
    }}>
      <button
        type="button"
        onClick={onToggleDrawer}
        className="lg:hidden"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px',
          borderRadius: '9px', background: '#11151E', border: '1px solid rgba(255,255,255,.08)', cursor: 'pointer', color: '#cbd5e1',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
      </button>
      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden lg:flex"
        style={{
          alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '9px',
          background: '#11151E', border: '1px solid rgba(255,255,255,.07)', cursor: 'pointer', color: '#7C8698',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg>
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#EAEEF6', letterSpacing: '-.3px', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pageTitle}</div>
        <div className="hidden sm:block" style={{ fontSize: '11px', color: '#5C6577', marginTop: '2px' }}>{pageSub}</div>
      </div>
      <div
        onClick={onOpenCmd}
        className="hidden sm:flex"
        style={{ alignItems: 'center', gap: '8px', background: '#11151E', border: '1px solid rgba(255,255,255,.07)', borderRadius: '9px', padding: '8px 12px', width: '230px', cursor: 'pointer' }}
      >
        <SearchIcon style={{ color: '#5C6577' }} />
        <span style={{ fontSize: '12.5px', color: '#5C6577', flex: 1 }}>Search or jump to…</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#7C8698', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '5px', padding: '1px 5px' }}>⌘K</span>
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
            background: 'linear-gradient(135deg,#22D3EE,#0891B2)', color: '#04141a', fontWeight: 700, fontSize: '12.5px',
            border: 'none', borderRadius: '9px', padding: '9px 14px', cursor: 'pointer', boxShadow: '0 0 18px -3px rgba(34,211,238,.5)',
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default AdminTopbar
