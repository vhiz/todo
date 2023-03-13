import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://todoapi-2ubu.onrender.com/api/",
    withCredentials: true
})