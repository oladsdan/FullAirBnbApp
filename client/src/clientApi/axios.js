import axios from 'axios';
// const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://airbnb-api-iota.vercel.app/';
const BASE_URL =  'https://fullairbnb-api.vercel.app';


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})