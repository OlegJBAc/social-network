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

export type messageType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null | boolean
    viewed: boolean
}