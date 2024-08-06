import { apiClient } from "./ApiService";

const ADMIN_JWT_TOKEN =''

export const createAdmin = async(createAdminData) => {
    return await apiClient.post(`/api/v1/admin`,createAdminData,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}

export const signInAdmin = async({email, password}) => {
    return await apiClient.post(`/api/v1/admin/sign-in`,{email,password})
}

export const getAdmin = async() => {
    return await apiClient.post(`/api/v1/admin/profile`,{headers:{"admin-access-token":ADMIN_JWT_TOKEN}})
}