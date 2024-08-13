import { adminToken } from '../Util/adminToken'
import { serverApiUrl } from './ApiService'


export const createNews = async (createNewsData)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.post(`/api/v1/news`,createNewsData,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const getNewsForAdmin = async (page=1, limit=12, sortOrder='ASC', category='', language='', search='')=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.get(`/api/v1/news?page=${page}&limit=${limit}&language=${language}&category=${category}&sortOrder=${sortOrder}&search=${search}`,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const getNewsForUser = async (page=1, limit=12, sortOrder='ASC', category='', language='', search='')=>{
    return await serverApiUrl.get(`/api/v1/news?page=${page}&limit=${limit}&language=${language}&category=${category}&sortOrder=${sortOrder}&search=${search}`)
}
export const getNewsCount = async ()=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.get(`/api/v1/news/news-count`,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}
export const updateNews = async (id,updateNewsData)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.put(`/api/v1/news/${id}`,updateNewsData,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const disableNews = async (id,isDisable)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.patch(`/api/v1/news/${id}`,{isDisable:isDisable},{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const deleteNews = async (id)=>{
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.delete(`/api/v1/news/${id}`,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

