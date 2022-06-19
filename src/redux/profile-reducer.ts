import { Dispatch } from "redux"
import { profileAPI } from "../API/profileAPI"
import { profileType } from "../types/types"
import { inferActionsType } from "./store"



const initialState = {
    posts: [
        {post: 'Hello World!!!', id: 1, likeCount: 3},
        {post: 'Here will be my posts', id: 2, likeCount: 0},
        {post: 'It\'s first post, just for more posts)', id: 3, likeCount: 11}
    ] as postType[],
    profile: null as profileType | null,
    likedPosts: [1] as any,
    status: '' as string,
    isFollowed: false as boolean,
    profileReady: false
}

const profileReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'SET_PROFILE_DATA':
            return {...state, profile: {...action.profile}}
        case 'SET_PROFILE_PHOTO':
            // @ts-ignore
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}  
        case 'ADD_POST_LIKE':
            return {...state, posts: state.posts.map(post => {
                if(post.id === action.postId){               
                    return {...post, likeCount: post.likeCount + 1}
                }else{
                    return {...post}
                }
            })}
        case 'ADD_LIKED_POST':
            return {...state, likedPosts: [...state.likedPosts, action.idPost]}
        case 'ADD_MESSAGE':
            return {...state, posts: [...state.posts, action.post]}
        case 'DELETE_POST_LIKE':
                let stateCopy = JSON.parse(JSON.stringify(state))
                stateCopy.posts[action.deleteId - 1].likeCount--
                stateCopy.likedPosts.splice(state.likedPosts.indexOf(action.deleteId), 1)
                return stateCopy
        default: 
            return state
    }
}

export const actions = {
    setProfile: (profile: profileType) => ({type: 'SET_PROFILE_DATA', profile} as const),
    addMessage: (post: postType) => ({type: 'ADD_MESSAGE', post} as const),
    setProfilePhoto: (photos: File) => ({type: 'SET_PROFILE_PHOTO', photos} as const),
    addLikedPost: (idPost: number) => ({type: 'ADD_LIKED_POST', idPost} as const),
    addPostLike: (postId: number) => ({type: 'ADD_POST_LIKE', postId} as const),
    deletePostLike: (deleteId: number) => ({type: 'DELETE_POST_LIKE', deleteId} as const)
}

export const getProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setProfile(response.data))
}

export const updateProfileTC = (profile: any, myId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateProfile(profile)
    if(response.data.resultCode === 0){
        // @ts-ignore
        dispatch(getProfileTC(myId))
    }
}

export const updateProfilePhotoTC = (photo: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateProfilePhoto(photo)
    if(response.data.resultCode === 0){
        dispatch(actions.setProfilePhoto(response.data.data.photos))
    }else{
        console.error(response + 'FAIL BRO')
    }
}

export default profileReducer

type postType = {
    post: string
    likeCount: number
    id: number
}
type actionsType = inferActionsType<typeof actions>