import { Dispatch } from "redux"
import { profileAPI } from "../API/profileAPI"

let initialState = {
    profile: null
}

const profileReducer = (state=initialState, action: any) => {
    switch(action.type){
        case 'SET_PROFILE_DATA':
            return {...state, profile: {...action.profile}}
        
        default: 
            return state
    }
}

export const actions = {
    setProfile: (profile: any) => ({type: 'SET_PROFILE_DATA', profile} as const)
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

export default profileReducer