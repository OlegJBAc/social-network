export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription:string
    fullName:string
    contacts: {
        github:string
        vk:string
        facebook:string
        instagram: string
        twitter: string
        website:string
        youtube:string
        mainLink:string
    }
    photos: {
        small: string
        large: string
    }
}

export type userType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}