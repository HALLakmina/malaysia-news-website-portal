import React, { useContext, useMemo } from 'react'
import { AppContext } from '../ContextAPI/AppContext'
import { CATEGORY_LIST } from '../Util/categories'
import Masthead from '../Components/Home/Masthead'
import LeadSection from '../Components/Home/LeadSection'
import CategoryBlock from '../Components/Home/CategoryBlock'

const Index = () => {
  const { userNews = [] } = useContext(AppContext)

  const sortedNews = useMemo(
    () => [...userNews].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    [userNews]
  )

  const byCategory = useMemo(() => {
    const map = {}
    CATEGORY_LIST.forEach((cat) => {
      map[cat.key] = sortedNews.filter((news) => news.category === cat.key)
    })
    return map
  }, [sortedNews])

  return (
    <div className="bg-white">
      <Masthead />
      <LeadSection articles={sortedNews} />
      {CATEGORY_LIST.map((cat) => (
        <CategoryBlock key={cat.key} category={cat} articles={byCategory[cat.key]} />
      ))}
    </div>
  )
}

export default Index
