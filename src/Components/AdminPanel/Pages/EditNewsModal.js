import React, { useContext, useState } from 'react'
import { uploadNewsImageFiles } from '../../../APIS/FileApi'
import { updateNews } from '../../../APIS/NewsApi'
import { AppContext } from '../../../ContextAPI/AppContext'
import { CATEGORY_LIST } from '../../../Util/categories'
import { CloseIcon } from '../Shell/icons'

const responseMessages = require('../../../Util/responseMessages')

const EditNewsModal = ({ close, data }) => {
  const newsDataObj = { topic: '', description: '', category: '', language: '', image: '', video_link: '' }
  const [updateNewsData, setUpdateNewsData] = useState(data || newsDataObj)
  const [apiState, setApiState] = useState({ success: false, error: false, message: undefined })

  const { dataDispatchEvent } = useContext(AppContext)

  const resetApiState = () => {
    setApiState({ success: false, error: false, message: undefined })
  }

  const uploadImageHandler = async (image) => {
    const respond = await uploadNewsImageFiles(image)
    return respond.data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetApiState()
    try {
      const { topic, description, category, language, image, video_link } = updateNewsData
      let uploadImage
      if (image._id) {
        uploadImage = image
      } else {
        uploadImage = await uploadImageHandler(image)
      }
      const response = await updateNews(data._id, { topic, description, category, language, image: uploadImage._id, video_link })
      const { message } = response.data
      setApiState({ success: true, error: false, message: message || responseMessages.common.updated(responseMessages.type.news) })
      setTimeout(() => {
        dataDispatchEvent('GET_NEWS_FOR_ADMIN')
        close()
      }, 1000)
    }
    catch (error) {
      let takeMessage = error?.message
      const response = error?.response
      if (response) {
        const { status, data: errData } = response
        const message = errData?.message
        if (status === 400) {
          takeMessage = errData[0]?.message || responseMessages.error[400]
        }
        else if (status === 404) {
          takeMessage = message || responseMessages.error[404](responseMessages.type.news)
        }
        else if (status === 500) {
          takeMessage = message || responseMessages.error[500]
        }
        setApiState({ success: false, error: true, message: takeMessage })
      }
    }
  }
  const handleValue = (e) => {
    const { name, value } = e.target
    const isKeyExist = newsDataObj.hasOwnProperty(name)
    if (isKeyExist) setUpdateNewsData({ ...updateNewsData, [name]: value })
  }
  const handleImageValue = (e) => {
    const image = e.target.files[0]
    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      setUpdateNewsData({ ...updateNewsData, image: formData })
    }
  }

  return (
    <div onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(3,5,9,.66)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '640px', maxHeight: '88vh', overflowY: 'auto', background: '#10141C', border: '1px solid rgba(255,255,255,.08)', borderRadius: '16px', padding: '24px', boxShadow: '0 30px 70px -20px rgba(0,0,0,.8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#EAEEF6' }}>Edit article</div>
          <CloseIcon onClick={close} style={{ color: '#5C6577', cursor: 'pointer' }} />
        </div>
        {apiState.success && <p style={{ fontSize: '13px', fontWeight: 600, color: '#34D399', background: 'rgba(52,211,153,.12)', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px' }}>{apiState.message}</p>}
        {apiState.error && <p style={{ fontSize: '13px', fontWeight: 600, color: '#FB7185', background: 'rgba(251,113,133,.12)', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px' }}>{apiState.message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Topic</label>
            <input className="mn-ipt" type="text" name="topic" required value={updateNewsData.topic || ''} onChange={handleValue} />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Description</label>
            <textarea className="mn-ipt" rows="7" required name="description" value={updateNewsData.description || ''} onChange={handleValue} style={{ resize: 'vertical' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Category</label>
              <select className="mn-ipt" style={{ cursor: 'pointer' }} name="category" required value={updateNewsData.category || ''} onChange={handleValue}>
                <option value="">Select category</option>
                {CATEGORY_LIST.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Language</label>
              <select className="mn-ipt" style={{ cursor: 'pointer' }} name="language" required value={updateNewsData.language || ''} onChange={handleValue}>
                <option value="">Select language</option>
                <option value="sinhala">Sinhala</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Featured image</label>
            <input
              className="mn-ipt"
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/apng, image/bmp, image/gif, image/jpg, image/pjpeg, image/svg+xml, image/tiff, image/webp, image/x-icon"
              onChange={handleImageValue}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#7C8698', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.4px', marginBottom: '7px', display: 'block' }}>Video link <span style={{ color: '#444B58', textTransform: 'none', fontWeight: 500 }}>· optional</span></label>
            <input className="mn-ipt" type="text" name="video_link" value={updateNewsData.video_link || ''} onChange={handleValue} />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
            <button type="button" onClick={close} style={{ padding: '10px 16px', borderRadius: '9px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#D5DCE8', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '10px 18px', borderRadius: '9px', background: 'linear-gradient(135deg,#22D3EE,#0891B2)', border: 'none', color: '#04141a', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 18px -4px rgba(34,211,238,.5)' }}>Save changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditNewsModal
