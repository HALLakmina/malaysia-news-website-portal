import React from 'react'

const Toast = ({ toast, onUndo, onClose }) => {
  if (!toast) return null
  const dotColor = toast.kind === 'danger' ? '#FB7185' : '#34D399'
  return (
    <div style={{
      position: 'fixed', left: '50%', bottom: '26px', transform: 'translateX(-50%)', zIndex: 130,
      display: 'flex', alignItems: 'center', gap: '13px', background: '#161B26', border: '1px solid rgba(255,255,255,.1)',
      borderRadius: '12px', padding: '12px 14px 12px 16px', boxShadow: '0 20px 50px -15px rgba(0,0,0,.7)', minWidth: '300px',
    }}>
      <span style={{ width: '9px', height: '9px', borderRadius: '50%', flex: 'none', background: dotColor, boxShadow: `0 0 10px ${dotColor}` }} />
      <span style={{ flex: 1, fontSize: '13px', color: '#EAEEF6', fontWeight: 500 }}>{toast.msg}</span>
      {toast.onUndo && (
        <span onClick={onUndo} style={{ fontSize: '12.5px', fontWeight: 700, color: '#22D3EE', cursor: 'pointer' }}>Undo</span>
      )}
      <svg onClick={onClose} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5C6577" strokeWidth="2" strokeLinecap="round" style={{ cursor: 'pointer' }}>
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </div>
  )
}

export default Toast
