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
export const getCurrentPageSelector = (state: appType) => {
    return state.users.currentPage
}
export const getPageSizeSelector = (state: appType) => {
    return state.users.pageSize
}
export const getTotalUsersCountSelector = (state: appType) => {
    return state.users.totalUsersCount
}
export const getChatMessagesSelector = (state: appType) => {
    return state.chat.messages
} 
export const getDialogsMessagesSelector = (state: appType) => {
    return state.dialogs.messages
}
export const getMyUserIdSelector = (state: appType) => {
    return state.auth.id
}
export const getLikedPostsSelector = (state: appType) => {
    return state.profile.likedPosts
}
export const getPostsProfileSelector = (state: appType) => {
    return state.profile.posts
}
export const getAppInitializedSelector = (state: appType) => {
    return state.app.appInitialized
}
export const getIsMobileScreenSelector = (state: appType) => {
    return state.app.isMobileScreen
}
export const getAppTheme = (state: appType) => {
    return state.app.theme
}