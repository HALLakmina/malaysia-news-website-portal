import { adminToken } from "../Util/adminToken";
import { serverApiUrl } from "./ApiService";

// const ADMIN_JWT_TOKEN = adminToken()

export const uploadNewsImageFiles = async (payload) => {
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.post(`/api/v1/file/image-upload`,payload, {headers:{"admin-access-token":ADMIN_JWT_TOKEN,'Content-Type': 'multipart/form-data'}});
}

export const deleteNewsImageFiles = async (payload) => {
    const ADMIN_JWT_TOKEN = await adminToken()
    return await serverApiUrl.post(`/api/v1/files/upload`,payload, {headers:{"admin-access-token":ADMIN_JWT_TOKEN,'Content-Type': 'multipart/form-data'}});
}