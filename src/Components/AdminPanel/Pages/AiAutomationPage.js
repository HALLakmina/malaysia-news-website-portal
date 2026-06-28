import React, { useContext, useRef, useState } from 'react'
import { AdminContext } from '../../../ContextAPI/AdminContext'
import { AI_LOG_SEED } from '../../../Util/adminDummyData'
import { getCategoryMeta } from '../../../Util/categories'
import { chipStyle, dotStyle, getStatusColor } from '../../../Util/adminStyles'

const tabStyle = (active) => ({
  padding: '8px 14px', borderRadius: '9px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
  color: active ? '#04141a' : '#9AA4B6', background: active ? 'linear-gradient(135deg,#22D3EE,#0891B2)' : 'transparent', whiteSpace: 'nowrap',
})

const AiAutomationPage = () => {
  const { aiCred, adminDispatchEvent } = useContext(AdminContext)
  const [tab, setTab] = useState('pipeline')
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [credDraft, setCredDraft] = useState(aiCred)
  const timer = useRef(null)

  const runProcess = () => {
    setProcessing(true)
    setProcessed(false)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { setProcessing(false); setProcessed(true) }, 1400)
  }
  const discard = () => { setProcessed(false); setProcessing(false) }
  const saveDraft = () => {
    setProcessed(false)
    adminDispatchEvent('SHOW_TOAST', { msg: 'Saved to drafts from AI extraction' })
  }
  const saveCred = () => {
    adminDispatchEvent('SAVE_AI_CRED', credDraft)
    adminDispatchEvent('SHOW_TOAST', { msg: 'n8n credentials saved' })
  }
  const connected = !!(credDraft.apiKey && credDraft.baseUrl)

  return (
    <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'flex', gap: '6px', background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '11px', padding: '5px', width: 'fit-content' }}>
        <div onClick={() => setTab('pipeline')} style={tabStyle(tab === 'pipeline')}>Processing pipeline</div>
        <div onClick={() => setTab('creds')} style={tabStyle(tab === 'creds')}>n8n credentials</div>
      </div>

      {tab === 'pipeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4.5" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0 }}>
            <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', padding: '18px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6', marginBottom: '12px' }}>Ingest raw article</div>
              <div onClick={runProcess} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '34px 18px', borderRadius: '12px', border: '1.5px dashed rgba(34,211,238,.3)', background: 'rgba(34,211,238,.04)', cursor: 'pointer' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '13px', background: 'rgba(34,211,238,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M5 18v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" /></svg>
                </div>
                <div style={{ fontSize: '13.5px', color: '#D5DCE8', fontWeight: 600 }}>Drop a document or paste raw text</div>
                <div style={{ fontSize: '11.5px', color: '#5C6577', marginTop: '4px' }}>TXT, DOCX, PDF · routed through your n8n workflow</div>
              </div>
            </div>

            <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>Recent AI-processed articles</div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#5C6577' }}>{AI_LOG_SEED.length} runs</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <div style={{ minWidth: '560px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,1fr) 110px 110px 90px', padding: '10px 18px', fontSize: '10px', letterSpacing: '.6px', textTransform: 'uppercase', color: '#5C6577', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                    <div>Source</div><div>Category</div><div>Status</div><div style={{ textAlign: 'right' }}>Confidence</div>
                  </div>
                  {AI_LOG_SEED.map((r) => {
                    const meta = r.cat === '—' ? null : getCategoryMeta(r.cat)
                    const statusColor = getStatusColor(r.status)
                    const confColor = r.conf >= 90 ? '#34D399' : r.conf >= 80 ? '#FBBF24' : r.conf ? '#FB7185' : '#5C6577'
                    return (
                      <div key={r.title} className="mn-tr" style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,1fr) 110px 110px 90px', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                        <div style={{ minWidth: 0, paddingRight: '12px' }}>
                          <div style={{ fontSize: '12.5px', color: '#D5DCE8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</div>
                          <div style={{ fontSize: '10.5px', color: '#5C6577', marginTop: '2px' }}>{r.time}</div>
                        </div>
                        <div>{meta ? <span style={chipStyle(meta.color)}>{meta.name}</span> : <span style={{ color: '#5C6577', fontSize: '12px' }}>—</span>}</div>
                        <div><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: statusColor, background: 'rgba(255,255,255,.05)', borderRadius: '7px', padding: '3px 9px', textTransform: 'capitalize' }}><span style={dotStyle(statusColor)} />{r.status}</span></div>
                        <div style={{ textAlign: 'right' }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', fontWeight: 600, color: confColor }}>{r.conf ? `${r.conf}%` : '—'}</span></div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', padding: '18px', alignSelf: 'start' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6', marginBottom: '14px' }}>Extraction result</div>
            {!processing && !processed && (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ width: '46px', height: '46px', margin: '0 auto 12px', borderRadius: '12px', background: 'rgba(255,255,255,.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5C6577" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.7 4.8L18.5 9.5l-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7z" /></svg>
                </div>
                <div style={{ fontSize: '12.5px', color: '#7C8698', lineHeight: 1.6 }}>Drop a document to see the AI-extracted title, category and summary here.</div>
              </div>
            )}
            {processing && (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '12.5px', color: '#22D3EE', fontWeight: 600 }}>Processing through n8n…</div>
                <div style={{ fontSize: '11px', color: '#5C6577', marginTop: '5px' }}>Extracting entities &amp; summarising</div>
              </div>
            )}
            {processed && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#5C6577', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '5px' }}>Extracted title</div>
                  <div style={{ fontSize: '14px', color: '#EAEEF6', fontWeight: 600, lineHeight: 1.45 }}>Sri Lankan parliament passes new budget after marathon overnight session</div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#5C6577', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px' }}>Suggested category</div>
                    <span style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 600, color: '#22D3EE', background: 'rgba(34,211,238,.13)', borderRadius: '6px', padding: '4px 10px' }}>Sri Lankan</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#5C6577', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px' }}>Confidence</div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 700, color: '#34D399', background: 'rgba(52,211,153,.12)', borderRadius: '6px', padding: '4px 10px' }}><span style={dotStyle('#34D399')} />96% match</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#5C6577', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px' }}>AI summary</div>
                  <div style={{ fontSize: '12.5px', color: '#9AA4B6', lineHeight: 1.65, background: '#0C0F16', border: '1px solid rgba(255,255,255,.06)', borderRadius: '10px', padding: '12px' }}>
                    Lawmakers approved the new budget after a marathon session, allocating funds to infrastructure and public-sector wages. Implementation timelines are still being debated.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
                  <button type="button" onClick={saveDraft} style={{ flex: 1, minWidth: '120px', padding: '10px', borderRadius: '9px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', border: 'none', color: '#04141a', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}>Save as Draft</button>
                  <button type="button" onClick={runProcess} style={{ padding: '10px 14px', borderRadius: '9px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#D5DCE8', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Re-process</button>
                  <button type="button" onClick={discard} style={{ padding: '10px 14px', borderRadius: '9px', background: 'rgba(251,113,133,.1)', border: '1px solid rgba(251,113,133,.25)', color: '#FB7185', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Discard</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'creds' && (
        <div style={{ maxWidth: '560px', background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>n8n API connection</div>
            {connected && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#34D399', background: 'rgba(52,211,153,.12)', borderRadius: '7px', padding: '3px 9px' }}>
                <span style={dotStyle('#34D399')} />Connected
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px', display: 'block' }}>Connection name</label>
              <input className="mn-ipt" placeholder="n8n API" value={credDraft.name} onChange={(e) => setCredDraft((c) => ({ ...c, name: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px', display: 'block' }}>API key</label>
              <input className="mn-ipt" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }} type="password" placeholder="YOUR_N8N_API_KEY" value={credDraft.apiKey} onChange={(e) => setCredDraft((c) => ({ ...c, apiKey: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '6px', display: 'block' }}>Base URL</label>
              <input className="mn-ipt" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }} placeholder="https://your-n8n-instance.com/api/v1" value={credDraft.baseUrl} onChange={(e) => setCredDraft((c) => ({ ...c, baseUrl: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button type="button" onClick={saveCred} style={{ padding: '10px 18px', borderRadius: '9px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', border: 'none', color: '#04141a', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 18px -4px rgba(34,211,238,.5)' }}>Save credentials</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AiAutomationPage
