import React from 'react'
import FullNewsCard from '../Components/NewsCards/FullNewsCard'
import NewsCard from '../Components/NewsCards/NewsCard'
import { useParams } from 'react-router-dom'
const NewsPage = () => {
    const { type } = useParams()
    return (
        <div>
            <FullNewsCard/>
            <div className="flex flex-wrap ">
                <div className=" w-100 lg:w-1/3 md:w-2/4">
                    <NewsCard type={type} data={"123"}/>
                </div>
                <div className=" w-100 lg:w-1/3 md:w-2/4">
                    <NewsCard type={type} data={"456"}/>
                </div><div className=" w-100 lg:w-1/3 md:w-2/4">
                    <NewsCard type={type} data={"789"}/>
                </div>
                <div className=" w-100 lg:w-1/3 md:w-2/4">
                    <NewsCard type={type} data={"012"}/>
                </div>
                <div className=" w-100 lg:w-1/3 md:w-2/4">
                    <NewsCard type={type} data={"345"}/>
                </div>
            </div>
        </div>
    )
}

export default NewsPage