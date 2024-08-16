import React, { useContext } from 'react'
import SlidShow from '../Components/SlidShow'
import NewsBar from '../Components/NewsCards/NewsBar'
import { AppContext } from '../ContextAPI/AppContext'

const Index = () => {
  const {userNews=[]} = useContext(AppContext)
  return (
    <>
      <SlidShow/>
      <NewsBar news={userNews} category={'sri_lankan'}/>
      <NewsBar news={userNews} category={'malaysian'}/>
      <NewsBar news={userNews} category={'gossip'}/>
      <NewsBar news={userNews} category={'sport'}/>
      <NewsBar news={userNews} category={'world'}/>
    </>
  )
}

export default Index