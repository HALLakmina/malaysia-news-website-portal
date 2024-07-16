import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <headers>
        <nav className="flex flex-row items-center justify-center my-3 mx-1">
            <div className="flex flex-row basis-1/5">
                <p>--LOGO--</p>
                <h3>HEADING</h3>
            </div>
            <ul className="flex flex-row basis-3/5 ">
                <li className="px-2 mx-2 color-bg-white rounded-full"><Link to="/" className='body-font-5 font-bold'>HOME</Link></li>
                <li className="px-2 mx-2 color-bg-white rounded-full"><Link to="/" className='body-font-5 font-bold'>NEWS</Link></li>
                <li className="px-2 mx-2 color-bg-white rounded-full"><Link to="/" className='body-font-5 font-bold'>SPORT</Link></li>
                <li className="px-2 mx-2 color-bg-white rounded-full"><Link to="/" className='body-font-5 font-bold'>GOSSIP</Link></li>
                <li className="px-2 mx-2 color-bg-white rounded-full"><Link to="/" className='body-font-5 font-bold'>WORLD NEWS</Link></li>
                <li className="px-2 mx-2 color-bg-white rounded-full"><Link to="/" className='body-font-5 font-bold'>ABOUT US</Link></li>
                <li className="px-2 mx-2 color-bg-white rounded-full"><Link to="/" className='body-font-5 font-bold'>CONTACT US</Link></li>
            </ul>
            <form className="flex flex-row basis-1/5">
                <input type="text" placeholder="SEARCH" className='px-2 py-1 body-font-5 rounded-lg'/>
                <button>SEARCH</button>
            </form>
        </nav>
    </headers>
  )
}

export default NavigationBar