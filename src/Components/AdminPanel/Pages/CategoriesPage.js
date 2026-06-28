import React, { useContext, useState } from 'react'
import { AppContext } from '../../../ContextAPI/AppContext'
import { AdminContext } from '../../../ContextAPI/AdminContext'
import { getCategoryMeta } from '../../../Util/categories'
import { slugify } from '../../../Util/slug'
import { EditIcon, TrashIcon, CheckIcon, CloseIcon } from '../Shell/icons'

const CategoriesPage = () => {
  const { adminNews = [] } = useContext(AppContext)
  const { categories, adminDispatchEvent } = useContext(AdminContext)
  const [adding, setAdding] = useState(false)
  const [editValue, setEditValue] = useState(null)
  const [draft, setDraft] = useState({ label: '', value: '' })

  const startAdd = () => { setAdding(true); setEditValue(null); setDraft({ label: '', value: '' }) }
  const startEdit = (c) => { setAdding(false); setEditValue(c.value); setDraft({ label: c.label, value: c.value }) }
  const cancel = () => { setAdding(false); setEditValue(null); setDraft({ label: '', value: '' }) }
  const save = () => {
    if (!draft.label.trim()) return
    adminDispatchEvent('SAVE_CATEGORY', { editValue, label: draft.label, value: draft.value || slugify(draft.label) })
    cancel()
  }
  const onLabel = (e) => {
    const v = e.target.value
    setDraft((d) => ({ label: v, value: editValue ? d.value : slugify(v) }))
  }

  const renderRow = (c) => {
    const meta = getCategoryMeta(c.value)
    const isEditing = editValue === c.value
    const count = adminNews.filter((n) => n.category === c.value).length
    if (isEditing) {
      return (
        <div key={c.value} className="grid gap-2.5" style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1fr) 150px 90px 100px 130px 84px', alignItems: 'center', gap: '10px', padding: '12px 18px', background: 'rgba(34,211,238,.05)', borderBottom: '1px solid rgba(34,211,238,.18)' }}>
          <input className="mn-ipt" value={draft.label} onChange={onLabel} />
          <input className="mn-ipt" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }} value={draft.value} onChange={(e) => setDraft((d) => ({ ...d, value: e.target.value }))} />
          <div style={{ gridColumn: 'span 2', fontSize: '11px', color: '#5C6577', textAlign: 'center' }}>Editing…</div>
          <div style={{ fontSize: '11px', color: '#5C6577' }}>{c.created}</div>
          <div style={{ display: 'flex', gap: '7px', justifyContent: 'flex-end' }}>
            <div onClick={save} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(52,211,153,.15)', cursor: 'pointer' }}><CheckIcon style={{ color: '#34D399' }} /></div>
            <div onClick={cancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,.05)', cursor: 'pointer' }}><CloseIcon style={{ color: '#9AA4B6' }} /></div>
          </div>
        </div>
      )
    }
    return (
      <div key={c.value} className="mn-tr" style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1fr) 150px 90px 100px 130px 84px', alignItems: 'center', gap: '10px', padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '3px', background: meta.color, flex: 'none' }} />
          <span style={{ fontSize: '13px', color: '#D5DCE8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.label}</span>
        </div>
        <div><span style={{ display: 'inline-block', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#9AA4B6', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '6px', padding: '2px 8px' }}>{c.value}</span></div>
        <div style={{ textAlign: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#D5DCE8' }}>{count}</div>
        <div style={{ textAlign: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: '12.5px', color: '#9AA4B6' }}>{c.subs.length}</div>
        <div style={{ fontSize: '11.5px', color: '#7C8698' }}>{c.created}</div>
        <div style={{ display: 'flex', gap: '9px', justifyContent: 'flex-end' }}>
          <EditIcon onClick={() => startEdit(c)} style={{ color: '#5C6577', cursor: 'pointer' }} />
          <TrashIcon
            onClick={() => adminDispatchEvent('SHOW_CONFIRM', {
              title: 'Delete category',
              msg: `Delete "${c.label}"? ${count} articles will be left uncategorised in this preview. This action cannot be undone.`,
              label: 'Delete category',
              onYes: () => adminDispatchEvent('DELETE_CATEGORY', { value: c.value }),
            })}
            style={{ color: '#5C6577', cursor: 'pointer' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" onClick={startAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', color: '#04141a', fontWeight: 700, fontSize: '12.5px', border: 'none', borderRadius: '9px', padding: '9px 14px', cursor: 'pointer' }}>+ Add category</button>
      </div>
      <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '720px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1fr) 150px 90px 100px 130px 84px', padding: '11px 18px', fontSize: '10px', letterSpacing: '.6px', textTransform: 'uppercase', color: '#5C6577', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div>Category</div><div>Slug</div><div style={{ textAlign: 'center' }}>News</div><div style={{ textAlign: 'center' }}>Sub-cats</div><div>Created</div><div style={{ textAlign: 'right' }}>Actions</div>
            </div>
            {adding && (
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1fr) 150px 90px 100px 130px 84px', alignItems: 'center', gap: '10px', padding: '12px 18px', background: 'rgba(34,211,238,.05)', borderBottom: '1px solid rgba(34,211,238,.18)' }}>
                <input className="mn-ipt" placeholder="Category name" value={draft.label} onChange={onLabel} />
                <input className="mn-ipt" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }} placeholder="slug" value={draft.value} onChange={(e) => setDraft((d) => ({ ...d, value: e.target.value }))} />
                <div style={{ gridColumn: 'span 2', fontSize: '11px', color: '#5C6577', textAlign: 'center' }}>New</div>
                <div style={{ fontSize: '11px', color: '#5C6577' }}>—</div>
                <div style={{ display: 'flex', gap: '7px', justifyContent: 'flex-end' }}>
                  <div onClick={save} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(52,211,153,.15)', cursor: 'pointer' }}><CheckIcon style={{ color: '#34D399' }} /></div>
                  <div onClick={cancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,.05)', cursor: 'pointer' }}><CloseIcon style={{ color: '#9AA4B6' }} /></div>
                </div>
              </div>
            )}
            {categories.map(renderRow)}
          </div>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#5C6577' }}>
        Preview feature — categories shown here mirror the live site's 5 categories. Adding or removing a category here is a local preview and doesn't change what's published on the public site yet.
      </p>
    </div>
  )
}

export default CategoriesPage
