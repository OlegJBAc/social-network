import { instance } from "./API"


export const usersAPI = {
    getUsers(count: number, page: number, term: string='', friend: boolean=false){
        return instance.get(`/users?count=${count}&page=${page}`)
    },
    follow(userId: number){
        return instance.post(`/follow/${userId}`)
    },
    unfollow(userId: number){
        return instance.delete(`/follow/${userId}`)
    }
}