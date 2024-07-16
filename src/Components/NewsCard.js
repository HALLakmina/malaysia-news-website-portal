import React from 'react'

const NewsCard = () => {
  return (
    <div className="rounded-lg p-3 color-bg-white flex flex-col" style={{width:'380px'}}>
        <div style={{width:'100%',height:'200px'}}>
            <img src="" alt="" className="size-full rounded-lg"/>
        </div>
        <p className="heading-font-5">UNESCO Director-General in SL</p>
        <p className="body-font-5 color-text-on-ash-gray">July 16, 2024  4:32 pm</p>
        <p className="body-font-5">
            Audrey Azoulay, the Director-General of the United Nations Educational, 
            Scientific and Cultural Organization (UNESCO), participated in the celebration 
            of the 75th anniversary of Sri Lanka’s UNESCO membership at the Nelum Pokuna 
            Theatre today Pix by Waruna Wanniarachchi
        </p>
        <div className='flex flex-row items-center justify-center my-5' style={{width:'100%'}}>
            <button className="body-font-5 font-bold">READ MORE</button>
        </div>
    </div>
  )
}

export default NewsCard