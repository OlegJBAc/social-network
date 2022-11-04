import { Dispatch } from "redux"
import { authAPI } from "../API/authAPI"
import { inferActionsType } from "./store"


const initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false as boolean
}

const authReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'SET_AUTH_DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}

const actions = {
    setAuthData: (email: string | null, id: number | null, login: string | null, isAuth: boolean=false) => {
        return {type: 'SET_AUTH_DATA', data: {email, id, login, isAuth}} as const},
}


export const getAuthDataTC = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if(response.data.resultCode === 0){
        const {email, id, login} = response.data.data
        dispatch(actions.setAuthData(email, id, login, true))
    }else{
        console.log('getAuthDataTC some trouble')
    }
}

export const logInTC = (email: string, 
                        password: string, 
                        rememberMe: boolean, 
                        captcha: string | null=null) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if(response.data.resultCode === 0){
        dispatch(getAuthDataTC())
    }else{
        console.log('logInTC some trouble')
    }
}

export const logOutTC = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if(response.data.resultCode === 0){
        dispatch(actions.setAuthData(null, null, null, false))
    }else{
        console.log('logOutTC some trouble')
    }
}

export default authReducer


type actionsType = inferActionsType<typeof actions>

