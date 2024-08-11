import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
    const [isNewsHover, setIsNewsHover] = useState(false)
    const [isSideMenuTrigger, setIsSideMenuTrigger] = useState(false)

    const handleSideMenu = (state) =>{
        setIsSideMenuTrigger(state)
    }
  return (
    <header className="w-full px-3">
        <div className="flex flex-row items-center basis-10/12 w-full">
            <nav className="flex flex-col sm:flex-row items-center justify-center my-3 px-1 w-full">
                
                <div className="flex flex-row basis-2/12 md:basis-1/12 ">
                    <p>LOGO_</p>
                    <h3>HEADING</h3>
                </div>
                <ul className={` ${isSideMenuTrigger ? '':'hidden'}  md:flex justify-center basis-8/12 flex-col md:flex-row absolute z-10 md:relative right-0 top-0 bottom-0 w-60 bg-white md:bg-transparent`}>
                    <p className="font-bold m-3  text-base rounded-full border-2 border-red-500 text-red-500 w-8 h-8 flex items-center justify-center md:hidden cursor-pointer"onClick={()=>handleSideMenu(false)}>X</p>
                    <li className="mx-2 color-bg-white rounded-full flex items-center md:justify-center my-4 md:my-0"><Link to="/" className='nav-item-hover px-2 rounded-full body-font-5 font-bold'>HOME</Link></li>
                    <li className=" mx-2 color-bg-white rounded-full relative " onMouseEnter={()=>setIsNewsHover(true)} onMouseLeave={()=>setIsNewsHover(false)}>
                        <p  className='nav-item-hover px-2 rounded-full body-font-5 font-bold flex items-center md:justify-center my-4 md:my-0'>NEWS <img src='/assets/icons/dropdown-icon.svg' alt='' className='ms-2 h-2'/></p>
                            <div className='absolute top-6 left-0 right-0 h-3'></div>
                            <ul className= {`p-2 mx-2 mt-3 w-64 color-bg-white rounded md:absolute z-20 ${isNewsHover ? "block":'hidden'}`}>
                                <li className="my-2 px-2 nav-item-hover"><Link to="/news/sriLanka" className='body-font-5 font-bold'>SRI LANKAN NEWS</Link></li>
                                <li className="my-2 px-2 nav-item-hover"><Link to="/news/malaysian" className='body-font-5 font-bold'>MALAYSIAN NEWS</Link></li>
                                <li className="my-2 px-2 nav-item-hover"><Link to="/news/gossip" className='body-font-5 font-bold'>GOSSIP</Link></li>
                                <li className="my-2 px-2 nav-item-hover"><Link to="/news/sport" className='body-font-5 font-bold'>SPORT News</Link></li>
                                <li className="my-2 px-2 nav-item-hover"><Link to="/news/world" className='body-font-5 font-bold'>WORLD NEWS</Link></li>
                            </ul>
                        </li>
                    <li className="nav-item-hover px-2 mx-2 color-bg-white rounded-full flex items-center md:justify-center my-4 md:my-0"><Link to="/about-us" className='body-font-5 font-bold'>ABOUT US</Link></li>
                    <li className="nav-item-hover px-2 mx-2 color-bg-white rounded-full flex items-center md:justify-center my-4 md:my-0"><Link to="/contact-us" className='body-font-5 font-bold'>CONTACT US</Link></li>
                </ul>
                <form className="flex flex-row basis-9/12 md:basis-4/12 justify-end w-full px-5 md:px-0">
                    <input type="text" placeholder="SEARCH" className='px-2 py-1 body-font-5 rounded-l-lg w-full'/>
                    <button id='search' aria-label="Search Button" type="button"><img src="/assets/icons/search-icon.svg" alt="" className='w-8 bg-white h-full p-1 rounded-r-lg cursor-pointer'/></button>
                </form>
            </nav>
            <div className="basis-1/12 flex justify-end md:hidden mx-2">
                <img src='/assets/icons/menu-icon.svg' alt='' className='h-5' onClick={()=>handleSideMenu(true)}/>
            </div>
        </div>
    </header>
  )
}

export default NavigationBar