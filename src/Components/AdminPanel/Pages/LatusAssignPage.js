import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../../ContextAPI/AppContext'
import { AdminContext } from '../../../ContextAPI/AdminContext'
import { getCategoryMeta } from '../../../Util/categories'
import { chipStyle } from '../../../Util/adminStyles'
import { SearchIcon, UpIcon, DownIcon, CloseIcon } from '../Shell/icons'

const LatusAssignPage = () => {
  const { adminNews = [] } = useContext(AppContext)
  const { latusAssigned, adminDispatchEvent } = useContext(AdminContext)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState({})

  const published = useMemo(() => adminNews.filter((n) => !n.isDisable), [adminNews])

  const left = useMemo(() => {
    const q = search.toLowerCase()
    return published.filter((n) => !q || n.topic.toLowerCase().includes(q))
  }, [published, search])

  const right = useMemo(() => {
    const byId = {}
    adminNews.forEach((n) => { byId[n._id] = n })
    return latusAssigned.map((id) => byId[id]).filter(Boolean)
  }, [latusAssigned, adminNews])

  const toggleSel = (id) => setSelected((s) => { const n = { ...s }; if (n[id]) delete n[id]; else n[id] = true; return n })
  const selCount = Object.keys(selected).length

  const assign = () => {
    adminDispatchEvent('ASSIGN_LATUS', { ids: Object.keys(selected) })
    setSelected({})
  }

  return (
    <div style={{ padding: '22px 28px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
        <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '15px 16px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '11px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>Published articles</div>
              {selCount > 0 && (
                <button type="button" onClick={assign} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', color: '#04141a', fontWeight: 700, fontSize: '12px', border: 'none', borderRadius: '8px', padding: '7px 12px', cursor: 'pointer' }}>Assign {selCount} →</button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', background: '#0C0F16', border: '1px solid rgba(255,255,255,.09)', borderRadius: '9px', padding: '0 12px' }}>
              <SearchIcon style={{ color: '#5C6577' }} />
              <input className="mn-ipt" style={{ border: 'none', background: 'transparent', padding: '10px 0', boxShadow: 'none' }} placeholder="Search published articles…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div style={{ padding: '14px 16px', maxHeight: '560px', overflowY: 'auto' }}>
            {left.length === 0 && <div style={{ color: '#5C6577', fontSize: '13px', padding: '10px 0' }}>No published articles yet.</div>}
            {left.map((n) => {
              const meta = getCategoryMeta(n.category)
              const assigned = latusAssigned.indexOf(n._id) >= 0
              const checked = !!selected[n._id]
              return (
                <div
                  key={n._id}
                  onClick={assigned ? undefined : () => toggleSel(n._id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '10px',
                    border: `1px solid ${checked ? 'rgba(34,211,238,.3)' : 'rgba(255,255,255,.06)'}`,
                    background: checked ? 'rgba(34,211,238,.05)' : '#0C0F16',
                    cursor: assigned ? 'default' : 'pointer', opacity: assigned ? 0.5 : 1, marginBottom: '8px',
                  }}
                >
                  <div style={{ width: '18px', height: '18px', flex: 'none', borderRadius: '5px', border: `1.5px solid ${checked ? '#22D3EE' : 'rgba(255,255,255,.18)'}`, background: checked ? '#22D3EE' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#04141a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', color: '#D5DCE8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.topic}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                      <span style={chipStyle(meta.color)}>{meta.name}</span>
                    </div>
                  </div>
                  {assigned && <span style={{ fontSize: '10px', fontWeight: 600, color: '#34D399', background: 'rgba(52,211,153,.12)', borderRadius: '6px', padding: '2px 7px', flex: 'none' }}>On rail</span>}
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 16px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19.5l1-5.8-4.2-4.1 5.8-.8z" /></svg>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>Latus rail</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#5C6577' }}>{right.length} featured</span>
          </div>
          <div style={{ padding: '14px 16px', maxHeight: '560px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {right.length === 0 && <div style={{ color: '#5C6577', fontSize: '13px' }}>Select articles on the left and assign them to the rail.</div>}
            {right.map((n, idx) => {
              const meta = getCategoryMeta(n.category)
              return (
                <div key={n._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 14px', borderRadius: '11px', background: '#0C0F16', border: '1px solid rgba(255,255,255,.07)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 'none', color: '#5C6577' }}>
                    <UpIcon onClick={() => adminDispatchEvent('MOVE_LATUS', { id: n._id, dir: -1 })} style={{ cursor: 'pointer' }} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A4150" strokeWidth="2" strokeLinecap="round"><path d="M8 9h8M8 15h8" /></svg>
                    <DownIcon onClick={() => adminDispatchEvent('MOVE_LATUS', { id: n._id, dir: 1 })} style={{ cursor: 'pointer' }} />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', fontWeight: 600, color: '#04141a', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', borderRadius: '6px', padding: '2px 7px', flex: 'none' }}>#{idx + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', color: '#D5DCE8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.topic}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                      <span style={chipStyle(meta.color)}>{meta.name}</span>
                    </div>
                  </div>
                  <CloseIcon
                    onClick={() => adminDispatchEvent('SHOW_CONFIRM', {
                      title: 'Remove from Latus',
                      msg: `Remove "${n.topic.slice(0, 46)}…" from the featured rail?`,
                      label: 'Remove',
                      onYes: () => adminDispatchEvent('REMOVE_LATUS', { id: n._id }),
                    })}
                    style={{ color: '#5C6577', cursor: 'pointer', flex: 'none' }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#5C6577', marginTop: '14px' }}>
        Preview feature — the public site doesn't have a featured rail yet. Assignments here are saved locally to demonstrate the curation workflow.
      </p>
    </div>
  )
}

export default LatusAssignPage
