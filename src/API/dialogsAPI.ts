import { instance } from "./API"



export const dialogsAPI = {
    getMessages(userId: number, page: number=1, count: number=20){
        return instance.get(`dialogs/${userId}/messages?page=${page}&count=${count}`)
    }    
}