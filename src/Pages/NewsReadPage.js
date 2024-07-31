import React from 'react'
import { useParams } from 'react-router-dom'
import FullNewsCard from '../Components/NewsCards/FullNewsCard'
import NewsCard from '../Components/NewsCards/NewsCard'

const NewsReadPage = () => {
    const {type,id} = useParams()
    return (
        <div className="w-full flex flex-col md:flex-row">
            <div className="w-full md:w-2/3">
                <FullNewsCard/>
            </div>
            <div className="w-full md:w-1/3 md:h-screen md:overflow-y-scroll md:mt-5" style={{scrollbarWidth:'none'}}>
                <NewsCard type={type} data={'01'}/>
                <NewsCard type={type} data={'02'}/>
                <NewsCard type={type} data={'03'}/>
                <NewsCard type={type} data={'04'}/>
                <NewsCard type={type} data={'05'}/>
            </div>
        </div>
    )
}

export default NewsReadPage