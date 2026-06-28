import React from 'react'

const ConfirmModal = ({ confirm, onCancel }) => {
  if (!confirm) return null
  return (
    <div onClick={onCancel} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(3,5,9,.66)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '420px', background: '#11151E', border: '1px solid rgba(255,255,255,.09)', borderRadius: '16px', padding: '24px', boxShadow: '0 30px 70px -20px rgba(0,0,0,.8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{ width: '42px', height: '42px', flex: 'none', borderRadius: '11px', background: 'rgba(251,113,133,.13)', border: '1px solid rgba(251,113,133,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FB7185" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" /><path d="M10 11v6M14 11v6" />
            </svg>
          </div>
          <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#EAEEF6' }}>{confirm.title}</div>
        </div>
        <div style={{ fontSize: '13px', color: '#9AA4B6', lineHeight: 1.65, margin: '14px 0 22px' }}>{confirm.msg}</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onCancel} style={{ padding: '10px 16px', borderRadius: '9px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#D5DCE8', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="button" onClick={confirm.onYes} style={{ padding: '10px 18px', borderRadius: '9px', background: 'linear-gradient(135deg,#FB7185,#E11D48)', border: 'none', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 20px -5px rgba(251,113,133,.6)' }}>
            {confirm.label || 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
