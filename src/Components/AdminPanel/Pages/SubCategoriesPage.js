import React, { useContext, useState } from 'react'
import { AdminContext } from '../../../ContextAPI/AdminContext'
import { getCategoryMeta } from '../../../Util/categories'
import { slugify } from '../../../Util/slug'
import { EditIcon, TrashIcon, CheckIcon, CloseIcon } from '../Shell/icons'

const SubCategoriesPage = () => {
  const { categories, adminDispatchEvent } = useContext(AdminContext)
  const [adding, setAdding] = useState(false)
  const [editKey, setEditKey] = useState(null)
  const [draft, setDraft] = useState({ label: '', value: '', parent: categories[0]?.value || '' })

  const rows = []
  categories.forEach((c) => c.subs.forEach((s) => rows.push({ parent: c.value, parentLabel: c.label, label: s[0], value: s[1] })))

  const startAdd = () => { setAdding(true); setEditKey(null); setDraft({ label: '', value: '', parent: categories[0]?.value || '' }) }
  const startEdit = (r) => { setAdding(false); setEditKey(r.parent + '::' + r.value); setDraft({ label: r.label, value: r.value, parent: r.parent }) }
  const cancel = () => { setAdding(false); setEditKey(null); setDraft({ label: '', value: '', parent: categories[0]?.value || '' }) }
  const save = () => {
    if (!draft.label.trim()) return
    const editing = editKey ? { parent: editKey.split('::')[0], value: editKey.split('::')[1] } : null
    adminDispatchEvent('SAVE_SUBCATEGORY', { editing, parent: draft.parent, label: draft.label, value: draft.value || slugify(draft.label) })
    cancel()
  }
  const onLabel = (e) => {
    const v = e.target.value
    setDraft((d) => ({ ...d, label: v, value: editKey ? d.value : slugify(v) }))
  }

  const draftRow = (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(170px,1fr) 160px 150px 84px', alignItems: 'center', gap: '10px', padding: '12px 18px', background: 'rgba(34,211,238,.05)', borderBottom: '1px solid rgba(34,211,238,.18)' }}>
      <input className="mn-ipt" placeholder="Sub-category name" value={draft.label} onChange={onLabel} />
      <input className="mn-ipt" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }} placeholder="slug" value={draft.value} onChange={(e) => setDraft((d) => ({ ...d, value: e.target.value }))} />
      <select className="mn-ipt" style={{ cursor: 'pointer' }} value={draft.parent} onChange={(e) => setDraft((d) => ({ ...d, parent: e.target.value }))}>
        {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <div style={{ display: 'flex', gap: '7px', justifyContent: 'flex-end' }}>
        <div onClick={save} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(52,211,153,.15)', cursor: 'pointer' }}><CheckIcon style={{ color: '#34D399' }} /></div>
        <div onClick={cancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,.05)', cursor: 'pointer' }}><CloseIcon style={{ color: '#9AA4B6' }} /></div>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" onClick={startAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', color: '#04141a', fontWeight: 700, fontSize: '12.5px', border: 'none', borderRadius: '9px', padding: '9px 14px', cursor: 'pointer' }}>+ Add sub-category</button>
      </div>
      <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '680px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(170px,1fr) 160px 150px 84px', padding: '11px 18px', fontSize: '10px', letterSpacing: '.6px', textTransform: 'uppercase', color: '#5C6577', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div>Sub-category</div><div>Slug</div><div>Parent category</div><div style={{ textAlign: 'right' }}>Actions</div>
            </div>
            {adding && draftRow}
            {rows.map((r) => {
              const key = r.parent + '::' + r.value
              const meta = getCategoryMeta(r.parent)
              if (editKey === key) return <div key={key}>{draftRow}</div>
              return (
                <div key={key} className="mn-tr" style={{ display: 'grid', gridTemplateColumns: 'minmax(170px,1fr) 160px 150px 84px', alignItems: 'center', gap: '10px', padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <div style={{ fontSize: '13px', color: '#D5DCE8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '12px' }}>{r.label}</div>
                  <div><span style={{ display: 'inline-block', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#9AA4B6', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '6px', padding: '2px 8px' }}>{r.value}</span></div>
                  <div><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: meta.color, background: 'rgba(255,255,255,.05)', borderRadius: '6px', padding: '3px 9px' }}><span style={{ width: '7px', height: '7px', borderRadius: '2px', background: meta.color, flex: 'none' }} />{r.parentLabel}</span></div>
                  <div style={{ display: 'flex', gap: '9px', justifyContent: 'flex-end' }}>
                    <EditIcon onClick={() => startEdit(r)} style={{ color: '#5C6577', cursor: 'pointer' }} />
                    <TrashIcon
                      onClick={() => adminDispatchEvent('SHOW_CONFIRM', {
                        title: 'Delete sub-category',
                        msg: `Delete "${r.label}" from ${r.parentLabel}? Articles under it keep the parent category.`,
                        label: 'Delete',
                        onYes: () => adminDispatchEvent('DELETE_SUBCATEGORY', { parent: r.parent, value: r.value }),
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

export default SubCategoriesPage
