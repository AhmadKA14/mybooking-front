import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://mybooking-api.onrender.com/api/"
})
