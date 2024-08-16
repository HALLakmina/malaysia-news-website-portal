/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { signInAdmin } from '../../../APIS/AdminApi'
import { AppContext } from '../../../ContextAPI/AppContext'
import { useNavigate } from 'react-router-dom'
const responseMessages = require('../../../Util/responseMessages')
const AdminSignIn = () => {

    const {dataDispatchEvent, adminSignIn} = useContext(AppContext)

    const [adminData, setAdminData] = useState({email:'',password:''})
    const [apiState, setApiState] = useState({success:false, error:false, message:undefined})

    const navigate = useNavigate()
    useEffect(()=>{
        if(adminSignIn){
            console.log(adminSignIn)
            navigate('/admin-panel')
        }
    },[adminSignIn])
    const signInHandler = async (e)=>{
        e.preventDefault()
        resetApiState()
        try{
            const respond = await signInAdmin(adminData)
            dataDispatchEvent('SET_SIGN_IN_ADMIN_TO_COOKIES', respond.data)
            setApiState({...apiState, success:true,  message:responseMessages.admin.found})
            setTimeout(()=>{
                resetApiState()
                navigate('/admin-panel')
            },500)

        }
        catch(error){
            let message = error?.message;
            const response = error.response;    
            if(response && (response.status === 400) ){
                const data = response.data                
                message = responseMessages.admin.notFound || data.message;          
                if(Array.isArray(data) && data.length){                
                    message = data.reduce((pre, cur) => `${pre} | ${cur.message}`, '')                                                          
                }                
            }else if(response && (response.status === 404) ){                
                message = responseMessages.admin.notFound;          
            }else if(response && response.status === 500){                                   
                message = responseMessages.error[500] || response.data;          
            }
            console.log(message);
            setApiState({...apiState, error:true,  message:message})
        }
    }
    const resetApiState = ()=>{
        setApiState(({success:false, error:false, message:undefined}))
    }
    const dataHandler = (e)=>{
        e.preventDefault();
        const {name, value} = e.target
        if(name === 'email'){setAdminData({...adminData, email:value})}
        if(name === 'password'){setAdminData({...adminData, password:value})}
    }
    return (
        <div className="flex flex-col items-center">
            {apiState.success && <p className="text-md max-w-xs font-bold text-center bg-green-400 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
            {apiState.error && <p className="text-md max-w-xs font-bold text-center bg-red-300 color-white mb-5 p-3 rounded-lg">{apiState.message}</p>}
            <form className="p-5 max-w-xs w-full bg-white rounded-xl" onSubmit={(e)=>signInHandler(e)}>
                <p className='text-center my-8 text-xl font-bold'>WELCOME BACK AMIN!</p>
                <div className="flex flex-col my-5">
                    <label className='font-bold'>E Mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        onChange={(e) =>dataHandler(e)}
                        value={adminData.email||''}
                        placeholder="joinkiles@gami.com"
                        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500'    
                    />

                </div>
                <div className="flex flex-col my-5">
                    <label className='font-bold'>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        onChange={(e) =>dataHandler(e)}
                        value={adminData.password||''}
                        placeholder="***************"
                        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500'    
                    />
                </div>
                <div className="flex flex-cole items-center justify-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-5 self-center">Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default AdminSignIn