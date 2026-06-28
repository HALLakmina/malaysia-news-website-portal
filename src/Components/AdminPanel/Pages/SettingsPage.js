import React, { useContext } from 'react'
import { AdminContext } from '../../../ContextAPI/AdminContext'
import { getStatusColor } from '../../../Util/adminStyles'

const SettingsPage = () => {
  const { autoPublish, activityLog, adminDispatchEvent } = useContext(AdminContext)

  return (
    <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4.5" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
        <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', padding: '20px', alignSelf: 'start' }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6', marginBottom: '16px' }}>Workspace</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#D5DCE8', fontWeight: 600, marginBottom: '4px' }}>Auto-publish AI drafts</div>
              <div style={{ fontSize: '12px', color: '#7C8698', lineHeight: 1.6 }}>When enabled, articles extracted by the AI pipeline with high confidence skip the Draft stage and publish immediately.</div>
            </div>
            <div
              onClick={() => adminDispatchEvent('TOGGLE_AUTO_PUBLISH')}
              style={{ flex: 'none', width: '42px', height: '24px', borderRadius: '12px', position: 'relative', cursor: 'pointer', background: autoPublish ? 'linear-gradient(135deg,#22D3EE,#0891B2)' : 'rgba(255,255,255,.1)', transition: 'background .15s' }}
            >
              <div style={{ position: 'absolute', top: '3px', left: autoPublish ? '21px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left .15s' }} />
            </div>
          </div>
        </div>

        <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '15px 18px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>Activity log</div>
          </div>
          <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
            {activityLog.map((e, i) => {
              const color = getStatusColor(e.kind)
              return (
                <div key={i} className="mn-tr" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flex: 'none', marginTop: '5px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', color: '#D5DCE8' }}>
                      <span style={{ fontWeight: 600 }}>{e.who}</span> {e.act} {e.obj}
                    </div>
                    <div style={{ fontSize: '11px', color: '#5C6577', marginTop: '3px' }}>{e.time}</div>
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

export default SettingsPage
