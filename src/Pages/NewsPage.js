import React, { useContext } from 'react'
import FullNewsCard from '../Components/NewsCards/FullNewsCard'
import NewsCard from '../Components/NewsCards/NewsCard'
import { useParams } from 'react-router-dom'
import { AppContext } from '../ContextAPI/AppContext'
const NewsPage = () => {
    const { category } = useParams()

    const {userNews=[]} = useContext(AppContext)
    return (
        <div>
            {userNews?.filter((data, index)=>{
                return data.category === category 
            })?.slice(0,1)?.map((data, index)=>(
                <FullNewsCard news={data} category={category}/>
            ))}
            <div className="flex flex-wrap ">         
                {userNews?.filter((data, index)=>{
                    return data.category === category 
                })?.slice(1).map((data, index)=>(
                    <div className=" w-100 lg:w-1/3 md:w-2/4">
                        <NewsCard category={category} data={data} key={index}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsPage