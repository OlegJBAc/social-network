import { instance } from "./API"

export const profileAPI = {
    getProfile(userId: number){
        return instance.get(`/profile/${userId}`)
    },
    updateProfile(profile: any){
        return instance.put(`/profile`, { ...profile })
    },
    getProfileStatus(userId: number){
        return instance.get(`/profile/status${userId}`)
    },
    updateProfileStatus(status: string){
        return instance.put('/profile/status', {status})
    }
}