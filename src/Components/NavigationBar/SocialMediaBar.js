import React, { useContext } from 'react'
import { AppContext } from '../../ContextAPI/AppContext';
import { Link } from 'react-router-dom';

const SocialMediaBar = () => {
    const {dataDispatchEvent} = useContext(AppContext)
    const languageHandler = (e)=>{
        const language = e.target.value;
        dataDispatchEvent('GET_LANGUAGE',language)
    }
  return (
    <div className="w-full flex flex-row p-2 justify-between color-main-bg">
        <div className="flex flex-row w-2/3">
            <Link to={'https://www.facebook.com/profile.php?id=61565461942339&mibextid=ZbWKwL'} target="_blank" className="flex flex-row items-center justify-center mx-2">
                <img src="/assets/icons/facebook-icon.png" alt="" className='h-6 rounded me-2'/>
                <p className="font-bold body-font-6 hidden sm:block">Facebook</p>
            </Link>
            <Link to={'https://youtube.com/channel/UC7eDLooycJbb4gmeT5tt3kw?si=HkbQ4lXxyeWU-6pe'} target="_blank" className="flex flex-row items-center justify-center mx-2">
                <img src="/assets/icons/youtube-icon.png" alt="" className='h-6 rounded me-2'/>
                <p className="font-bold body-font-6 hidden sm:block">YouTube</p>
            </Link>
        </div>
        <div className="flex flex-row items-center justify-end w-1/3">
            <label className="">Language</label>
            <select className="rounded me-2" name="language" onChange={(e)=>languageHandler(e)}>
                <option value='sinhala'>සිං</option>
                <option value='english'>En</option>
            </select>
        </div>
    </div>
  )
}

export default SocialMediaBar