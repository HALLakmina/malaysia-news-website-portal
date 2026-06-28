import React, { useContext, useState } from 'react'
import { AdminContext } from '../../../ContextAPI/AdminContext'
import { getRoleColor, hexa } from '../../../Util/adminStyles'
import { EditIcon, TrashIcon } from '../Shell/icons'

const ROLES = ['Super Admin', 'Editor', 'Author', 'Contributor']
const emptyDraft = { firstName: '', lastName: '', email: '', role: 'Editor' }

const AdminsPage = () => {
  const { admins, adminDispatchEvent } = useContext(AdminContext)
  const [formOpen, setFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [draft, setDraft] = useState(emptyDraft)

  const startAdd = () => { setFormOpen(true); setEditId(null); setDraft(emptyDraft) }
  const startEdit = (a) => { setFormOpen(true); setEditId(a.id); setDraft({ firstName: a.firstName, lastName: a.lastName, email: a.email, role: a.role }) }
  const cancel = () => { setFormOpen(false); setEditId(null); setDraft(emptyDraft) }
  const save = () => {
    if (!draft.firstName.trim() || !draft.email.trim()) return
    adminDispatchEvent('SAVE_ADMIN', { editId, ...draft })
    cancel()
  }

  return (
    <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" onClick={startAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', color: '#04141a', fontWeight: 700, fontSize: '12.5px', border: 'none', borderRadius: '9px', padding: '9px 14px', cursor: 'pointer' }}>+ Add admin</button>
      </div>

      {formOpen && (
        <div style={{ background: '#10141C', border: '1px solid rgba(34,211,238,.22)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6', marginBottom: '14px' }}>{editId ? 'Edit admin' : 'Invite new admin'}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div><label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px', display: 'block' }}>First name</label><input className="mn-ipt" placeholder="First name" value={draft.firstName} onChange={(e) => setDraft((d) => ({ ...d, firstName: e.target.value }))} /></div>
            <div><label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px', display: 'block' }}>Last name</label><input className="mn-ipt" placeholder="Last name" value={draft.lastName} onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div><label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px', display: 'block' }}>Email</label><input className="mn-ipt" placeholder="name@malaysri.news" value={draft.email} onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))} /></div>
            <div><label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px', display: 'block' }}>Role</label>
              <select className="mn-ipt" style={{ cursor: 'pointer' }} value={draft.role} onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value }))}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={cancel} style={{ padding: '9px 16px', borderRadius: '9px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#D5DCE8', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button type="button" onClick={save} style={{ padding: '9px 18px', borderRadius: '9px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', border: 'none', color: '#04141a', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 18px -4px rgba(34,211,238,.5)' }}>Save admin</button>
          </div>
        </div>
      )}

      <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '760px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px,1fr) 130px 90px 120px 110px 84px', padding: '11px 18px', fontSize: '10px', letterSpacing: '.6px', textTransform: 'uppercase', color: '#5C6577', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div>Admin</div><div>Role</div><div style={{ textAlign: 'center' }}>Articles</div><div>Status</div><div>Last active</div><div style={{ textAlign: 'right' }}>Actions</div>
            </div>
            {admins.map((a) => {
              const roleColor = getRoleColor(a.role)
              const initials = (a.firstName[0] || '') + (a.lastName[0] || '')
              return (
                <div key={a.id} className="mn-tr" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px,1fr) 130px 90px 120px 110px 84px', alignItems: 'center', gap: '10px', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px', minWidth: 0 }}>
                    <div style={{ width: '34px', height: '34px', flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', background: `linear-gradient(135deg,${hexa(roleColor, 0.3)},${hexa(roleColor, 0.08)})`, border: `1px solid ${hexa(roleColor, 0.35)}` }}>{initials}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', color: '#D5DCE8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.firstName} {a.lastName}</div>
                      <div style={{ fontSize: '11px', color: '#5C6577', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.email}</div>
                    </div>
                  </div>
                  <div><span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 600, color: roleColor, background: hexa(roleColor, 0.13), borderRadius: '6px', padding: '3px 9px', whiteSpace: 'nowrap' }}>{a.role}</span></div>
                  <div style={{ textAlign: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#D5DCE8' }}>{a.articles}</div>
                  <div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: a.active ? '#34D399' : '#7C8698', background: a.active ? 'rgba(52,211,153,.12)' : 'rgba(255,255,255,.05)', borderRadius: '7px', padding: '3px 9px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.active ? '#34D399' : '#5C6577', flex: 'none' }} />
                      {a.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#7C8698' }}>{a.last}</div>
                  <div style={{ display: 'flex', gap: '9px', justifyContent: 'flex-end' }}>
                    <EditIcon onClick={() => startEdit(a)} style={{ color: '#5C6577', cursor: 'pointer' }} />
                    <TrashIcon
                      onClick={() => adminDispatchEvent('SHOW_CONFIRM', {
                        title: 'Remove admin',
                        msg: `Remove ${a.firstName} ${a.lastName} from the team? They will lose all access immediately.`,
                        label: 'Remove admin',
                        onYes: () => adminDispatchEvent('DELETE_ADMIN', { id: a.id, name: `${a.firstName} ${a.lastName}` }),
                      })}
                      style={{ color: '#5C6577', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminsPage
