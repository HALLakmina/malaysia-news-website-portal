import { serverApiUrl } from './ApiService'


export const createContact = async (clientPayload)=>{
    console.log(clientPayload)
    return await serverApiUrl.post(`/api/v1/contact-us`,clientPayload)
}