import React, { useContext } from 'react'
import { AppContext } from '../../ContextAPI/AppContext'
import { Link } from 'react-router-dom'

const SocialMediaBar = () => {
  const { dataDispatchEvent } = useContext(AppContext)
  const languageHandler = (e) => {
    dataDispatchEvent('GET_LANGUAGE', e.target.value)
  }
  return (
    <div className="bg-meridian-dark text-white">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-14 h-10">
        <div className="flex items-center gap-3">
          <Link
            to="https://www.facebook.com/profile.php?id=61565461942339&mibextid=ZbWKwL"
            target="_blank"
            className="flex items-center gap-2 text-[#C5CBD4] hover:text-white"
          >
            <svg data-dc-tpl="27" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path data-dc-tpl="28" d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14h2.3v7h3z"></path>
            </svg>
            
            {/* <img src="/assets/icons/facebook-icon.png" alt="" className="h-5 rounded" />
            <span className="hidden sm:inline text-[12.5px] font-semibold">Facebook</span> */}
          </Link>
          <Link
            to="https://youtube.com/channel/UC7eDLooycJbb4gmeT5tt3kw?si=HkbQ4lXxyeWU-6pe"
            target="_blank"
            className="flex items-center gap-2 text-[#C5CBD4] hover:text-white"
          >
            <svg data-dc-tpl="30" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path data-dc-tpl="31" d="M18.2 3h3.3l-7.2 8.3L22.8 21h-6.6l-5.2-6.8L5 21H1.7l7.7-8.8L1.2 3h6.8l4.7 6.2L18.2 3zm-1.2 16h1.8L7.1 4.9H5.2L17 19z"></path>
            </svg>
            {/* <img src="/assets/icons/youtube-icon.png" alt="" className="h-5 rounded" />
            <span className="hidden sm:inline text-[12.5px] font-semibold">YouTube</span> */}
          </Link>
          <Link
            to="https://youtube.com/channel/UC7eDLooycJbb4gmeT5tt3kw?si=HkbQ4lXxyeWU-6pe"
            target="_blank"
            className="flex items-center gap-2 text-[#C5CBD4] hover:text-white"
          >
            <svg data-dc-tpl="33" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect data-dc-tpl="34" x="3.5" y="3.5" width="17" height="17" rx="4.5"></rect>
              <circle data-dc-tpl="35" cx="12" cy="12" r="3.6"></circle>
              <circle data-dc-tpl="36" cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"></circle>
            </svg>
          </Link>
          <Link
            to="https://youtube.com/channel/UC7eDLooycJbb4gmeT5tt3kw?si=HkbQ4lXxyeWU-6pe"
            target="_blank"
            className="flex items-center gap-2 text-[#C5CBD4] hover:text-white"
          >
            <svg data-dc-tpl="38" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path data-dc-tpl="39" d="M21.6 8.2c-.2-.9-.8-1.5-1.7-1.7C18.3 6.1 12 6.1 12 6.1s-6.3 0-7.9.4c-.9.2-1.5.8-1.7 1.7C2 9.8 2 12 2 12s0 2.2.4 3.8c.2.9.8 1.5 1.7 1.7 1.6.4 7.9.4 7.9.4s6.3 0 7.9-.4c.9-.2 1.5-.8 1.7-1.7.4-1.6.4-3.8.4-3.8s0-2.2-.4-3.8zM10 15V9l5.2 3L10 15z"></path>
            </svg>
          </Link>
        </div>
        <div className="flex items-center gap-1.5 text-[#C5CBD4]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
          </svg>
          <select
            aria-label="Language"
            onChange={languageHandler}
            className="bg-transparent border-0 text-white text-[12.5px] font-semibold outline-none cursor-pointer"
          >
            <option className="text-black" value="english">En</option>
            <option className="text-black" value="sinhala">සිං</option>
          </select>
        </div>
      </div>
      
    </div>

    
  )
}

export default SocialMediaBar
