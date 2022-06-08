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
    },
    updateProfilePhoto(photo: any){
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put(`/profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
}