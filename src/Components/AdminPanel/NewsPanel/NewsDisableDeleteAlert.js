import React, { useContext, useState } from 'react'
import { deleteNews, disableNews } from '../../../APIS/NewsApi';
import { AppContext } from '../../../ContextAPI/AppContext';
import { deleteNewsImageFiles } from '../../../APIS/FileApi';


const responseMessages = require('../../../Util/responseMessages')

const NewsDisableDeleteAlert = ({visible, close, data}) => {
    
    const [apiState, setApiState] = useState({success:false, error:false, message:undefined})
    
    const {dataDispatchEvent} = useContext(AppContext)
    const handleDelete = async(e, id, image) => {
        e.preventDefault();
        resetApiState()
        try{
            await deleteNews(id)
            await deleteNewsImageFiles(image)
            setApiState({...apiState, success:true,  message: responseMessages.common.deleted(responseMessages.type.news)})
            setTimeout(()=>{
                dataDispatchEvent('GET_NEWS_FOR_ADMIN')
                requestClose()
            },1000)
        }
        catch(error) {
            let takeMessage = error?.message
            const response = error.response
            if(response){
                const {status, data} = response
                const message = data.message
                if(response && status === 400){
                    const message = data[0].message
                    takeMessage = message || responseMessages.error[400] 
                }
                else if(response && status === 404){
                    takeMessage = message || responseMessages.error[404](responseMessages.type.news) 
                }
                else if(response && status === 500){
                    takeMessage = message || responseMessages.error[500] 
                }
            }
            console.log(takeMessage)
            setApiState({...apiState, error:true,  message:takeMessage})
        }
    }
    const handleDisable = async(e, id) => {
        e.preventDefault();
        resetApiState()
        try{
            const response = await disableNews(id, true)
            const {message} = response.data
            setApiState({...apiState, success:true,  message:message || responseMessages.common.disable(responseMessages.type.news)})
            setTimeout(()=>{
                dataDispatchEvent('GET_NEWS_FOR_ADMIN')
                requestClose()
            },1000)
        }
        catch(error) {
            let takeMessage = error?.message
            const response = error.response
            if(response){
                const {status, data} = response
                const message = data.message
                if(response && status === 400){
                    const message = data[0].message
                    takeMessage = message || responseMessages.error[400] 
                }
                else if(response && status === 404){
                    takeMessage = message || responseMessages.error[404](responseMessages.type.news) 
                }
                else if(response && status === 500){
                    takeMessage = message || responseMessages.error[500] 
                }
            }
            console.log(takeMessage)
            setApiState({...apiState, error:true,  message:takeMessage})
        }
    }
    const handleActive = async(e, id) => {
        e.preventDefault();
        resetApiState()
        try{
            const response = await disableNews(id, false)
            const {message} = response.data
            setApiState({...apiState, success:true,  message:message || responseMessages.common.active(responseMessages.type.news)})
            setTimeout(()=>{
                dataDispatchEvent('GET_NEWS_FOR_ADMIN')
                requestClose()
            },1000)
        }
        catch(error) {
            let takeMessage = error?.message
            const response = error.response
            if(response){
                const {status, data} = response
                const message = data.message
                if(response && status === 400){
                    const message = data[0].message
                    takeMessage = message || responseMessages.error[400] 
                }
                else if(response && status === 404){
                    takeMessage = message || responseMessages.error[404](responseMessages.type.news) 
                }
                else if(response && status === 500){
                    takeMessage = message || responseMessages.error[500] 
                }
            }
            console.log(takeMessage)
            setApiState({...apiState, error:true,  message:takeMessage})
        }
    }


    const resetApiState = ()=>{
        setApiState(({success:false, error:false, message:undefined}))
    }

    const requestClose = () => {
        resetApiState()
        close(false)
    }
  if (!visible) return null
  const actionLabel = data.type === 'delete' ? 'Delete' : data.type === 'active' ? 'Enable' : 'Disable'
  return (
        <div onClick={()=>requestClose()} style={{position:'fixed', inset:0, zIndex:120, background:'rgba(3,5,9,.66)', backdropFilter:'blur(3px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
            <div onClick={(e)=>e.stopPropagation()} style={{width:'100%', maxWidth:'420px', background:'#11151E', border:'1px solid rgba(255,255,255,.09)', borderRadius:'16px', padding:'24px', boxShadow:'0 30px 70px -20px rgba(0,0,0,.8)'}}>
                {apiState.success && <p style={{fontSize:'13px', fontWeight:600, color:'#34D399', background:'rgba(52,211,153,.12)', borderRadius:'8px', padding:'10px 12px', marginBottom:'14px'}}>{apiState.message}</p>}
                {apiState.error && <p style={{fontSize:'13px', fontWeight:600, color:'#FB7185', background:'rgba(251,113,133,.12)', borderRadius:'8px', padding:'10px 12px', marginBottom:'14px'}}>{apiState.message}</p>}
                <div style={{fontSize:'15.5px', fontWeight:700, color:'#EAEEF6'}}>{`${actionLabel} this article?`}</div>
                <div style={{fontSize:'13px', color:'#9AA4B6', lineHeight:1.65, margin:'10px 0 22px'}}>{data.data.topic}</div>
                <div style={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                    <button type="button" onClick={()=>requestClose()} style={{padding:'10px 16px', borderRadius:'9px', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', color:'#D5DCE8', fontSize:'13px', fontWeight:600, cursor:'pointer'}}>No</button>
                    {data.type === 'delete' && <button type="button" onClick={(e)=>handleDelete(e, data.data._id, data.data.image)} style={{padding:'10px 18px', borderRadius:'9px', background:'linear-gradient(135deg,#FB7185,#E11D48)', border:'none', color:'#fff', fontSize:'13px', fontWeight:700, cursor:'pointer', boxShadow:'0 0 20px -5px rgba(251,113,133,.6)'}}>Yes, delete</button>}
                    {data.type === 'disable' && <button type="button" onClick={(e)=>handleDisable(e, data.data._id)} style={{padding:'10px 18px', borderRadius:'9px', background:'linear-gradient(135deg,#FBBF24,#D97706)', border:'none', color:'#04141a', fontSize:'13px', fontWeight:700, cursor:'pointer'}}>Yes, disable</button>}
                    {data.type === 'active' && <button type="button" onClick={(e)=>handleActive(e, data.data._id)} style={{padding:'10px 18px', borderRadius:'9px', background:'linear-gradient(135deg,#34D399,#059669)', border:'none', color:'#04141a', fontSize:'13px', fontWeight:700, cursor:'pointer'}}>Yes, enable</button>}
                </div>
            </div>
        </div>
  )
}

export default NewsDisableDeleteAlert