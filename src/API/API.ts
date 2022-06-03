import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '904d6c87-d7a6-413c-b2ac-7594fcc363d1'
    }
})
