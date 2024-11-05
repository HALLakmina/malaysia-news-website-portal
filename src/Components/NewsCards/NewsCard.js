import React from 'react'
import { Link } from 'react-router-dom'

const NewsCard = ({ category, data}) => {
    const truncate=(description)=>{
        return  description.length > 170 ? description.substring(0, 150) + "..." : description
    }
  return (
      <div className="rounded-lg p-3 color-bg-white flex flex-col relative my-2 mx-2 ">
          <p className="absolute top-0 right-0 body-font-5">Latest</p>
          <div className='w-100 h-40 sm:h-52'>
          <Link to={`/news/${category}/${data._id}`}> <img src={`/${data.image.storageName}`} alt="" className="size-full rounded-lg object-contain overflow-hidden"/></Link>
          </div>
          <p className="heading-font-5">{data.topic}</p>
          <p className="body-font-5 color-text-on-ash-gray">July 16, 2024</p>
          <p className="body-font-5">
              {truncate(data.description)}
          </p>
          <div className='flex flex-row items-center justify-center my-5' style={{width:'100%'}}>
              <Link to={`/news/${category}/${data._id}`}className="body-font-5 font-bold" aria-label="Read More Button" type="button">READ MORE</Link>
          </div>
        </div>
  )
}

export default NewsCard