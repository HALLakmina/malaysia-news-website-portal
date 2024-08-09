import React from 'react'
import { useLocation } from 'react-router-dom'
import NewsPanel from '../Components/AdminPanel/NewsPanel'
import AdminPanelHome from '../Components/AdminPanel/AdminPanelHome'

const AdminPanelPage = () => {
    
    const { pathname } = useLocation()
    const panelName = pathname.split('/',3)[2]
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