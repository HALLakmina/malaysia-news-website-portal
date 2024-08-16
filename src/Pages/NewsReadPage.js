import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FullNewsCard from '../Components/NewsCards/FullNewsCard'
import NewsCard from '../Components/NewsCards/NewsCard'
import { getNewsById } from '../APIS/NewsApi'
import { AppContext } from '../ContextAPI/AppContext'


const responseMessages = require('../Util/responseMessages')

const NewsReadPage = () => {

    const {userNews} = useContext(AppContext)
    const [news, setNews] = useState({})
    const {category,id} = useParams()

    useEffect(()=>{
        if(id){
            getSingleNews(id)
        }
    },[id])
    const getSingleNews = async (id)=>{
        try{
            const respond = await getNewsById(id)
            setNews(respond.data)
        }
        catch(error){
            let takeMessage = error?.message
            const response = error?.response
            if(response){
              const {status, data} = response
              const message = data?.message
              if(response && status === 400){
                const message = data[0]?.message
                takeMessage = message || responseMessages.error[400]
              }
              else if(response && status === 409){
                takeMessage = message || responseMessages.error[409](responseMessages.type.news)
              }
              else if(response && status === 500){
                takeMessage = message || responseMessages.error[500]
              }
            }
        }
    }
    return (
        <div className="w-full flex flex-col md:flex-row">
            <div className="w-full md:w-2/3">
                <FullNewsCard news={news} category={category}/>
            </div>
            <div className="w-full md:w-1/3 md:h-screen md:overflow-y-scroll md:mt-5" style={{scrollbarWidth:'none'}}>
                      
            {userNews?.filter((data, index)=>{
                    return data._id !== id && data.category === category
                })?.map((data, index)=>(
                    <NewsCard category={category} data={data} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default NewsReadPage