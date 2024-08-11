/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NewsPanel from '../Components/AdminPanel/NewsPanel'
import AdminPanelHome from '../Components/AdminPanel/AdminPanelHome'
import { AppContext } from '../ContextAPI/AppContext'

const AdminPanelPage = () => {
    
  const {adminSignIn} = useContext(AppContext)

    const { pathname } = useLocation()
    const panelName = pathname.split('/',3)[2]
    const navigate = useNavigate()
    
  useEffect(()=>{
      if(adminSignIn === undefined){
        navigate('/')
      }
  },[adminSignIn])

  return (
    <div className='sm:mx-5 mx-1 mt-10'>
        { panelName ? 
          <>
            {panelName === 'news' ?
              <NewsPanel/>:''
            }
          </>
        : 
          <AdminPanelHome/>
        }
    </div>
  )
}

export default AdminPanelPage