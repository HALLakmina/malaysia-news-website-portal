import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createNews, disableNews } from '../../../APIS/NewsApi'
import { uploadNewsImageFiles } from '../../../APIS/FileApi'
import { AppContext } from '../../../ContextAPI/AppContext'
import { CATEGORY_LIST } from '../../../Util/categories'

const responseMessages = require('../../../Util/responseMessages')

const seg = (active) => ({
  flex: 1, textAlign: 'center', padding: '8px', fontSize: '12.5px', fontWeight: 600, borderRadius: '7px',
  cursor: 'pointer', transition: 'all .15s', color: active ? '#04141a' : '#9AA4B6',
  background: active ? 'linear-gradient(135deg,#22D3EE,#0891B2)' : 'transparent',
  boxShadow: active ? '0 0 14px -4px rgba(34,211,238,.6)' : 'none',
})

const AddNewsPage = () => {
  const newsDataObj = { topic: '', description: '', category: '', language: '', image: '', video_link: '' }
  const [newNewsData, setNewNewsData] = useState(newsDataObj)
  const [status, setStatus] = useState('published')
  const [apiState, setApiState] = useState({ success: false, error: false, message: undefined })
  const { dataDispatchEvent } = useContext(AppContext)
  const navigate = useNavigate()

  const resetApiState = () => setApiState({ success: false, error: false, message: undefined })

  const uploadImageHandler = async (image) => {
    const respond = await uploadNewsImageFiles(image)
    return respond.data
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    resetApiState()
    try {
      const { image, ...uploadData } = newNewsData
      const uploadImage = await uploadImageHandler(image)
      const response = await createNews({ ...uploadData, image: uploadImage._id })
      const created = response.data
      if (status === 'draft' && created?._id) {
        await disableNews(created._id, true)
      }
      setApiState({ success: true, error: false, message: responseMessages.common.add(responseMessages.type.news) })
      setTimeout(() => {
        dataDispatchEvent('GET_NEWS_FOR_ADMIN')
        navigate('/admin-panel/all-news')
      }, 900)
    }
    catch (error) {
      let takeMessage = error?.message
      const response = error?.response
      if (response) {
        const { status: st, data } = response
        const message = data?.message
        if (st === 400) takeMessage = data[0]?.message || responseMessages.error[400]
        else if (st === 404) takeMessage = message || responseMessages.error[404](responseMessages.type.news)
        else if (st === 500) takeMessage = message || responseMessages.error[500]
        setApiState({ success: false, error: true, message: takeMessage })
      }
    }
  }
  const inputValueHandler = (e) => {
    const { name, value } = e.target
    if (newsDataObj.hasOwnProperty(name)) setNewNewsData({ ...newNewsData, [name]: value })
  }
  const inputImageHandler = (e) => {
    const image = e.target.files[0]
    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      setNewNewsData({ ...newNewsData, image: formData })
    }
  }

  return (
    <div style={{ padding: '22px 28px' }}>
      {apiState.success && <p style={{ fontSize: '13px', fontWeight: 600, color: '#34D399', background: 'rgba(52,211,153,.12)', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px' }}>{apiState.message}</p>}
      {apiState.error && <p style={{ fontSize: '13px', fontWeight: 600, color: '#FB7185', background: 'rgba(251,113,133,.12)', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px' }}>{apiState.message}</p>}
      <form onSubmit={submitHandler} className="grid grid-cols-1 gap-4.5" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
        <div className="lg:grid lg:grid-cols-[1fr_330px] lg:gap-[18px]" style={{ display: 'grid', gap: '18px', gridTemplateColumns: '1fr' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
            <input
              className="mn-ipt"
              placeholder="Article headline…"
              name="topic"
              required
              value={newNewsData.topic}
              onChange={inputValueHandler}
              style={{ fontSize: '21px', fontWeight: 700, padding: '16px 18px' }}
            />
            <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', padding: '16px 18px' }}>
              <textarea
                className="mn-ipt"
                rows="11"
                required
                name="description"
                placeholder="Write your article…"
                value={newNewsData.description}
                onChange={inputValueHandler}
                style={{ border: 'none', padding: 0, fontSize: '14px', lineHeight: 1.7, color: '#C9D2E0', minHeight: '260px', resize: 'vertical' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>
                Video link <span style={{ color: '#444B58', textTransform: 'none', fontWeight: 500 }}>· optional</span>
              </label>
              <input className="mn-ipt" placeholder="https://youtube.com/watch?v=…" name="video_link" value={newNewsData.video_link} onChange={inputValueHandler} />
            </div>
          </div>

          <div style={{ background: '#10141C', border: '1px solid rgba(255,255,255,.06)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#EAEEF6' }}>Publish settings</div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Category</label>
              <select className="mn-ipt" style={{ cursor: 'pointer' }} name="category" required value={newNewsData.category} onChange={inputValueHandler}>
                <option value="">Select category</option>
                {CATEGORY_LIST.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Language</label>
              <select className="mn-ipt" style={{ cursor: 'pointer' }} name="language" required value={newNewsData.language} onChange={inputValueHandler}>
                <option value="">Select language</option>
                <option value="sinhala">Sinhala</option>
                <option value="english">English</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Status</label>
              <div style={{ display: 'flex', gap: '4px', background: '#0C0F16', border: '1px solid rgba(255,255,255,.09)', borderRadius: '9px', padding: '4px' }}>
                <div onClick={() => setStatus('draft')} style={seg(status === 'draft')}>Draft</div>
                <div onClick={() => setStatus('published')} style={seg(status === 'published')}>Published</div>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Featured image</label>
              <label style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                padding: '22px 16px', borderRadius: '11px', cursor: 'pointer',
                border: `1.5px dashed ${newNewsData.image ? 'rgba(34,211,238,.35)' : 'rgba(255,255,255,.14)'}`,
                background: newNewsData.image ? 'rgba(34,211,238,.04)' : 'rgba(255,255,255,.015)',
              }}>
                <input type="file" name="image" required={!newNewsData.image} accept="image/*" onChange={inputImageHandler} style={{ display: 'none' }} />
                {!newNewsData.image ? (
                  <>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5C6577" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15l-5-5L5 21" /><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
                    <div style={{ fontSize: '12.5px', color: '#9AA4B6', fontWeight: 600, marginTop: '8px' }}>Drop image or click to upload</div>
                    <div style={{ fontSize: '10.5px', color: '#5C6577', marginTop: '3px' }}>PNG, JPG up to 8MB · 16:9 recommended</div>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                    <div style={{ width: '64px', height: '42px', flex: 'none', borderRadius: '8px', background: 'linear-gradient(135deg,#22D3EE44,#0891B222)', border: '1px solid rgba(34,211,238,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.7"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M21 15l-5-5L5 21" /></svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <div style={{ fontSize: '12.5px', color: '#D5DCE8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Image selected</div>
                      <div style={{ fontSize: '10.5px', color: '#34D399', marginTop: '2px' }}>Ready to upload</div>
                    </div>
                  </div>
                )}
              </label>
            </div>
            <button type="submit" style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: 'linear-gradient(135deg,#22D3EE,#0891B2)', color: '#04141a', fontWeight: 700, fontSize: '14px',
              border: 'none', borderRadius: '10px', padding: '13px', cursor: 'pointer', boxShadow: '0 0 24px -4px rgba(34,211,238,.55)', marginTop: '2px',
            }}>
              {status === 'published' ? 'Publish article' : 'Save draft'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddNewsPage
