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
  return (
        <div className= {`${visible ?  "flex" : "hidden"} absolute  left-0 right-0 top-0 bottom-0  flex-col items-center justify-center`} style={{backgroundColor:"rgba(0, 0 ,0, 0.4)"}}>
            {apiState.success && <p className="text-md max-w-xs font-bold text-center bg-green-400 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
            {apiState.error && <p className="text-md max-w-xs font-bold text-center bg-red-300 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
            <div className="bg-white rounded-lg p-5">
                <div className="flex w-full items-end justify-end mb-5">
                    <button type="button" onClick={()=>requestClose()} className=" font-bold ring-2 cursor-pointer ring-red-500 text-red-500 m-0 p-1 rounded-full w-8 h-8 flex items-center justify-center">X</button>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-center">{`Are you wont to ${data.type} this NEWS?`}</p>
                <p className="text-1xl sm:text-2xl text-center">{data.data.topic}</p>
                <div className="w-full flex flex-row justify-evenly mt-8">
                    {
                        data.type === 'delete' ?<button type="button" onClick={(e)=>handleDelete(e, data.data._id, data.data.image)}className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-36">Yes</button>:''
                    }
                    {
                        data.type === 'disable' ? <button type="button" onClick={(e)=>handleDisable(e, data.data._id)}className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-36">Yes</button> :''
                    }
                    {
                        data.type === 'active' ? <button type="button" onClick={(e)=>handleActive(e, data.data._id)}className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 w-36">Yes</button> :''
                    }
                    <button type="button" onClick={()=>requestClose()} className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900 w-36">No</button>
                </div>
            </div>

        </div>
  )
}

export default NewsDisableDeleteAlert