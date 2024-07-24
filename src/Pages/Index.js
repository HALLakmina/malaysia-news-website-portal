import React from 'react'
import NewsCard from '../Components/NewsCard'
const Index = () => {
  return (
    <>
        <main className='py-5 flex flex-wrap items-center justify-around'>
          <NewsCard/>
          <NewsCard/>
          <NewsCard/>
        </main>
    </>
  )
}

export default Index