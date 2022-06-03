import { appType } from "./store"

export const getProfileSelector = (state: appType) => {
    return state.profile.profile
}
export const getIsAuthSelector = (state: appType) => {
    return state.auth.isAuth
}
export const getLoginSelector = (state: appType) => {
    return state.auth.login
}
export const getUsersSelector = (state: appType) => {
    return state.users.users
} 