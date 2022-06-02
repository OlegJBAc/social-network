import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'd9e59968-f6ef-4bd0-bec3-5e01feee0910'
    }
})
