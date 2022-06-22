import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'ebf536e3-3303-498b-b5bb-6080ca866d8c'
    }
})
