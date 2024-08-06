import { serverApiUrl } from './ApiService'

const ADMIN_JWT_TOKEN =''

export const createNews = async (createNewsData)=>{
    return await serverApiUrl.post(`/api/v1/news`,createNewsData,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const getNews = async (page=1, limit=12, language='', category='', sortOrder='ASC', search='')=>{
    return await serverApiUrl.get(`/api/v1/news?page=${page}, limit=${limit}, language=${language}, category=${category}, sortOrder=${sortOrder}, search=${search}`)
}

export const updateNews = async (id,updateNewsData)=>{
    return await serverApiUrl.post(`/api/v1/news/${id}`,updateNewsData,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const disableNews = async (id,isDisable)=>{
    return await serverApiUrl.post(`/api/v1/news/${id}`,isDisable,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const deleteNews = async (id)=>{
    return await serverApiUrl.post(`/api/v1/news/${id}`,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}