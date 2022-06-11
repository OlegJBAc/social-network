import { filterType } from "../redux/users-reducer"
import { instance } from "./API"


export const usersAPI = {
    getUsers(count: number, page: number, filter: filterType){
        return instance.get(`/users?count=${count}&page=${page}&term=${filter.term}&friend=${filter.friend}`)
    },
    follow(userId: number){
        return instance.post(`/follow/${userId}`)
    },
    unfollow(userId: number){
        return instance.delete(`/follow/${userId}`)
    }
}