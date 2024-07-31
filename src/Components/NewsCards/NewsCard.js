import React from 'react'
import { Link } from 'react-router-dom'

const NewsCard = ({ type, data}) => {
  return (
      <div className="rounded-lg p-3 color-bg-white flex flex-col relative my-2 mx-2 ">
          <p className="absolute top-0 right-0 body-font-5">Latest</p>
          <div className='w-100 h-40 sm:h-52'>
              <img src="" alt="" className="size-full rounded-lg"/>
          </div>
          <p className="heading-font-5">UNESCO Director-General in SL</p>
          <p className="body-font-5 color-text-on-ash-gray">July 16, 2024</p>
          <p className="body-font-5">
              Audrey Azoulay, the Director-General of the United Nations Educational, 
              Scientific and Cultural Organization (UNESCO), participated in the celebration 
              of the 75th anniversary of Sri Lanka’s UNESCO membership at the Nelum Pokuna 
              Theatre today Pix by Waruna Wanniarachchi
          </p>
          <div className='flex flex-row items-center justify-center my-5' style={{width:'100%'}}>
              <Link to={`/news/${type}/${data}`}className="body-font-5 font-bold" aria-label="Read More Button" type="button">READ MORE</Link>
          </div>
        </div>
  )
}

export default NewsCard