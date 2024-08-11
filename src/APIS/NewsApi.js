import { adminToken } from '../Util/adminToken'
import { serverApiUrl } from './ApiService'


export const createNews = async (createNewsData)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.post(`/api/v1/news`,createNewsData,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const getNews = async (page=1, limit=12, language='', category='', sortOrder='ASC', search='')=>{
    return await serverApiUrl.get(`/api/v1/news?page=${page}, limit=${limit}, language=${language}, category=${category}, sortOrder=${sortOrder}, search=${search}`)
}

export const updateNews = async (id,updateNewsData)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.post(`/api/v1/news/${id}`,updateNewsData,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const disableNews = async (id,isDisable)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.post(`/api/v1/news/${id}`,isDisable,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const deleteNews = async (id)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.post(`/api/v1/news/${id}`,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}