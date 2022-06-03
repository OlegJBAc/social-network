import { Dispatch } from "redux"
import { profileAPI } from "../API/profileAPI"
import { profileType } from "../types/types"
import { inferActionsType } from "./store"



const initialState = {
    profile: null as profileType | null
}

const profileReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'SET_PROFILE_DATA':
            return {...state, profile: {...action.profile}}
        case 'SET_PROFILE_PHOTO':
            // @ts-ignore
            return {...state, profile: {...action.profile, photos: action.photos} as profileType}
            
        default: 
            return state
    }
}

export const actions = {
    setProfile: (profile: profileType) => ({type: 'SET_PROFILE_DATA', profile} as const),
    setProfilePhoto: (photo: File) => ({type: 'SET_PROFILE_PHOTO', photo} as const),
}

export const getProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setProfile(response.data))
}

export const updateProfileTC = (profile: any) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateProfile(profile)
    if(response.data.resultCode === 0){
        // @ts-ignore
        dispatch(getProfileTC(19901))
    }
}

export const updateProfilePhotoTC = (photo: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateProfilePhoto(photo)
    if(response.data.resultCode === 0){
        dispatch(actions.setProfilePhoto(photo))
        console.log(response)
    }else{
        console.log(response + 'FAIL BRO')
    }
}

export default profileReducer


type actionsType = inferActionsType<typeof actions>