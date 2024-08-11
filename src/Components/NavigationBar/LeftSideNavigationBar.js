import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../../ContextAPI/AppContext'

const LeftSideNavigationBar = () => {
    
    const {dataDispatchEvent} = useContext(AppContext)

    const [isSideMenuTrigger, setIsSideMenuTrigger] = useState(false)

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const panelName = pathname.split('/',3)[2]

    useEffect(() => {
        setIsSideMenuTrigger(false)
    },[panelName])

    const handleSideMenu = (state) =>{
        setIsSideMenuTrigger(state)
    }
    const SignOutHandler = () =>{
        dataDispatchEvent('REMOVE_SIGN_IN_ADMIN_IN_COOKIES')
        navigate('/')
    }
    return (
        <header className={`absolute z-10 left-0 top-0 bottom-0 ${isSideMenuTrigger ? "bg-blue-600":''}`}>
            <nav className={` ${isSideMenuTrigger ? "relative w-80" : 'relative w-14 md:w-20' } p-2 `}>
                <div className="relative h-16">
                {isSideMenuTrigger ? 
                    <p className="font-bold m-3 text-base rounded-full border-2 border-red-500 text-red-500 w-8 h-8 flex items-center justify-center absolute right-0 cursor-pointer"onClick={()=>handleSideMenu(false)}>X</p>
                : 
                    <div className="basis-1/12 flex justify-center mt-3">
                        <img src='/assets/icons/menu-icon.svg' alt='' className='h-5 cursor-pointer' onClick={()=>handleSideMenu(true)}/>
                    </div>
                }
                    </div>
                {isSideMenuTrigger ?
                    <>    
                        <div className="flex flex-row items-center justify-center basis-2/12 md:basis-1/12 mb-8">
                            <p>LOGO_</p>
                            <h3>HEADING</h3>
                        </div>
                        <div className="flex flex-col items-start justify-between h-full">
                            <ul>
                                <li className="my-2 px-2 nav-item-hover"><Link to="/admin-panel"><p  className='body-font-5 font-bold w-full'>HOME</p></Link></li>
                                <li className="my-2 px-2 nav-item-hover w-full"><Link to="/admin-panel/news"><p  className='body-font-5 font-bold w-full'>NEWS</p></Link></li>
                                {/* <li className="my-2 px-2 nav-item-hover"><Link to="/admin-panel/admin" className='body-font-5 font-bold'>ADMIN</Link></li> */}
                            </ul>
                            <button type="button" onClick={()=>SignOutHandler()} className='my-2 px-2 nav-item-hover body-font-5 font-bold w-full' >Sign Out</button>    
                        </div>
                    </>
                :''}
            </nav>
        </header>
    )
}

export default LeftSideNavigationBar