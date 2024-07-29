import React from 'react'

const NewsBar = ({heading, description, image, category}) => {
  return (
    <>
        <div className='px-3 py-2 color-bg-white'>
            <p>{`${category} >`}</p>
            <div className="flex items-center content-center  md:flex-row flex-col w-full">
                <div className="md:w-1/2 w-full">
                    <p className="heading-font-4">
                        {heading}
                    </p>
                    <p className="body-font-4">
                        {description}
                    </p>
                </div>
                <img src={image} alt="" className='md:w-1/2 w-full'/>
            </div>
        </div>
    <hr/>
    </>
  )
}

export default NewsBar