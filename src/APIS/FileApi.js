import { apiClient } from "./ApiService";

const ADMIN_JWT_TOKEN =''

export const uploadNewsImageFiles = async (payload) => {
    return await apiClient.post(`/api/v1/files/upload`,payload, {headers:{"admin-access-token":ADMIN_JWT_TOKEN,'Content-Type': 'multipart/form-data'}});
}

export const deleteNewsImageFiles = async (payload) => {
    return await apiClient.post(`/api/v1/files/upload`,payload, {headers:{"admin-access-token":ADMIN_JWT_TOKEN,'Content-Type': 'multipart/form-data'}});
}