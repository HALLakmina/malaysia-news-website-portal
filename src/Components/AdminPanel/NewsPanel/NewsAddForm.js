import React, { useContext, useState } from 'react'
import { createNews } from '../../../APIS/NewsApi'
import { uploadNewsImageFiles } from '../../../APIS/FileApi'
import { AppContext } from '../../../ContextAPI/AppContext'

const responseMessages = require('../../../Util/responseMessages')

const NewsAddForm = ({close}) => {
    const newsDataObj = {topic:'', description:'', category:'', language:'', image:'', video_link:''}
    const [newNewsData, setNewNewsData] = useState(newsDataObj)
    const [apiState, setApiState] = useState({success:false, error:false, message:undefined})

    const {dataDispatchEvent} = useContext(AppContext)

    const goBackTOManage = ()=>{
        resetApiState()
        document.querySelector("#news-form").reset()
        resetNewsValues()
        close(false)
    }
    const resetApiState = ()=>{
        setApiState(({success:false, error:false, message:undefined}))
    }
    const resetNewsValues = ()=>{
        setNewNewsData(newsDataObj)
    }
    const submitHandler = async (e) =>{
        e.preventDefault()
        resetApiState()
        try{
            const { image, ...uploadData} = newNewsData
            const uploadImage = await uploadImageHandler(image)
            const response = await createNews({...uploadData, image:uploadImage._id})
            const {message} = response.data
            setApiState({...apiState, success:true,  message:message || responseMessages.common.add(responseMessages.type.news)})
            setTimeout(()=>{
                dataDispatchEvent('GET_NEWS_FOR_ADMIN')
                goBackTOManage()
            },1000)
        }
        catch(error){
            let takeMessage = error?.message
            const response = error?.response
            if(response){
                const {status, data} = response
                const message = data?.message
                if(response && status === 400){
                    const message = data[0]?.message
                    takeMessage = message || responseMessages.error[400]
                }
                else if(response && status === 404){
                    takeMessage = message || responseMessages.error[404](responseMessages.type.news)
                }
                else if(response && status === 500){
                    takeMessage = message || responseMessages.error[500]
                }
                console.log(takeMessage)
                setApiState({...apiState, error:true,  message:takeMessage})
            }
        }
    }
    const uploadImageHandler = async (image)=>{
        const respond = await uploadNewsImageFiles(image)
        return respond.data
    }
    const inputValueHandler = (e) =>{
        e.preventDefault()
        const { name, value} = e.target
        const isKeyExist = newsDataObj.hasOwnProperty(name)       
        if(isKeyExist){
            const obj = {}
            obj[name] = value
            setNewNewsData({...newNewsData, ...obj})
        }
    }
    const inputImageHandler = async (e)=>{
        e.preventDefault()
        let image= e.target.files[0]
        if(image){
            const formData = new FormData();
            formData.append("file",image);
            setNewNewsData({...newNewsData, image:formData})
        }
    }
    return (
    <div className="w-full flex flex-col items-center justify-center p-5">
        <h1 className="text-center my-8 text-3xl sm:text-4xl font-bold">ADD NEW NEWS</h1>
        <button type="button" onClick={()=>goBackTOManage()}className="self-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{"< GO BACK"}</button>
        {apiState.success && <p className="text-md max-w-xs font-bold text-center bg-green-400 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
        {apiState.error && <p className="text-md max-w-xs font-bold text-center bg-red-300 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
        <form onSubmit={(e)=>submitHandler(e)} id="news-form" className="flex flex-col justify-start w-full">
            <div className="w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">TOPIC</span></label>
                <input 
                    type="text" 
                    name="topic" 
                    required
                    onChange={(e)=>inputValueHandler(e)}
                    value={newNewsData.topic || ""}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/> 
            </div>
            <div className="w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">DESCRIPTION</span></label>
                <textarea 
                    type="text" 
                    rows="9"
                    required 
                    name="description" 
                    value={newNewsData.description || ""}
                    onChange={(e)=>inputValueHandler(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/> 
            </div>
            <div className="flex items-center flex-wrap justify-between">
            <select  
                name="category" 
                required 
                value={newNewsData.category || ''}
                onChange={(e)=>inputValueHandler(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"
            >
                <option value=''>--Select NEWS Category--</option>
                <option value="sri_lankan">Sri Lankan</option>
                <option value="malaysian">Malaysian</option>
                <option value="gossip">Gossip</option>
                <option value="sport">Sport</option>
                <option value="world">World</option>
            </select>
            <select 
                name="language"
                required
                value={newNewsData.language || ''}
                onChange={(e)=>inputValueHandler(e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"
            >
                <option value=''>--Select Language--</option>
                <option value="sinhala">Sinhala</option>
                <option value="english" className="">English</option>
            </select>
            <div className="sm:max-w-xs w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">Upload Image</span></label>
                <input 
                    type="file" 
                    name="image" 
                    required = {newNewsData.image === '' ? true : false}
                    accept="image/png, image/jpeg, image/apng, image/bmp, image/gif, image/jpg, image/pjpeg, image/png, image/svg+xml, image/tiff, image/webp, image/x-icon"
                    onChange={(e)=>inputImageHandler(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:max-w-xs"/>
            </div>
            </div>
            <div className="w-full flex flex-col my-5">
                <label className="block"><span className="block sm:text-sm text-md font-bold text-slate-700">NEWS Video Link</span></label>
                <input 
                    type="text" 
                    name="video_link" 
                    value={newNewsData.video_link || ""}
                    onChange={(e)=>inputValueHandler(e)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </div>
            <div className="flex items-center justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full sm:max-w-xs">Add New NEWS</button>
            </div>
        </form>
    </div>
  )
}

export default NewsAddForm