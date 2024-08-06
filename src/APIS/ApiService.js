import axios from "axios";

const SERVER_API_URL =  process.env.REACT_APP_API_URL

export const serverApiUrl = axios.create({baseURL: SERVER_API_URL});