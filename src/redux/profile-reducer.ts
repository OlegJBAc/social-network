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
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}  
        default: 
            return state
    }
}

export const actions = {
    setProfile: (profile: profileType) => ({type: 'SET_PROFILE_DATA', profile} as const),
    setProfilePhoto: (photos: File) => ({type: 'SET_PROFILE_PHOTO', photos} as const),
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


type actionsType = inferActionsType<typeof actions>