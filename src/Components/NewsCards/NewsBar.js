import React from 'react'
import { Link } from 'react-router-dom'

const NewsBar = ({news, category}) => {
    const categoryObj = {sri_lankan:'Sri Lankan', malaysian:'Malaysian', gossip:'Gossip', sport:'Sport', world:'World'}
    const resetCategoryName = (categoryName) =>{   
        const isKeyExist = categoryObj.hasOwnProperty(categoryName)
        if(isKeyExist){
            return categoryObj[categoryName]
        }
        return categoryName
    }
    const truncate= (description)=>{
        return  description.length > 170 ? description.substring(0, 150) + "..." : description
    }
  return (
    <>
        {news?.filter((data, index)=>{
            return data.category === category 
        })?.slice(0,1)?.map((data, index)=>(
            <div className='px-3 py-2 color-bg-white' key={index}>
                <Link to={`/news/${data.category}`} className='font-bold text-xl text-blue-400 hover:text-blue-600'>{`View More ${resetCategoryName(data.category)} NEWS >`}</Link>
                <div className="flex items-start content-center md:flex-row flex-col w-full mt-5">
                    <div className="md:w-1/2 w-full">
                        <p className="heading-font-4">
                            {data.heading}
                        </p>
                        <p className="body-font-4">
                            {truncate(data.description)}
                        </p>
                    </div>
                    <div className="max-h-96 h-full md:w-1/2 w-full flex flex-col items-center justify-center">
                        <img src={"/"+data.image.storageName} alt="" className='w-full object-contain overflow-hidden'/>
                    </div>
                </div>
            </div>
        ))}
    <hr className="border border-black"/>
    </>
  )
}

export default NewsBar