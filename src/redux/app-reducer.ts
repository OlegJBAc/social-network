import { Dispatch } from "redux"
import { inferActionsType } from "./store"


const initialState = {
    appInitialized: false,
    isMobileScreen: false,
    theme: 'Dark' as 'Light' | 'Dark'
}

const appReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'SET_APP_INITIALIZED':
            return {...state, appInitialized: action.appInitialized}
        case 'SET_IS_MOBILE_SCREEN':
            return {...state, isMobileScreen: action.isMobileScreen}
        case 'SET_THEME':
            localStorage.setItem('theme', action.theme)
            return {...state, theme: action.theme}
        default:
            return state
    }
}

export const actions = {
    setAppInitialized: (appInitialized: boolean) => {
        return { type: 'SET_APP_INITIALIZED', appInitialized} as const },
    setIsMobileScreen: (isMobileScreen: boolean) => {
        return { type: 'SET_IS_MOBILE_SCREEN', isMobileScreen} as const },
    setTheme: (theme: 'Light' | 'Dark') => {
        return { type: 'SET_THEME', theme} as const },
}


export default appReducer

type actionsType = inferActionsType<typeof actions>