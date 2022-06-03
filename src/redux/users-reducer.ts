import { Dispatch } from "redux"
import { usersAPI } from "../API/usersAPI"
import { userType } from "../types/types"
import { inferActionsType } from "./store"


const initialState = {
    users: [] as userType[]
}

const usersReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'SET_USERS':
            return{...state, users: action.users}
        case 'FOLLOW':
            return{...state, users: state.users.map(user => {
                if(user.id === action.userId){
                    return{...user, followed: true}
                }
                return user
            })}
        case 'UNFOLLOW':
            return{...state, users: state.users.map(user => {
                if(user.id === action.userId){
                    return{...user, followed: false}
                }
                return user
            })}
        default: 
            return state
    }
}

export const actions = {
    setUsers: (users: any) => ({type: 'SET_USERS', users} as const),
    follow: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
}

export const getUsersTC = (count: number, page: number) => async (dispatch: any) => {
    const response = await usersAPI.getUsers(count, page)
    dispatch(actions.setUsers(response.data.items))
}

export const followTC = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.follow(userId)
    if(response.data.resultCode === 0){
        dispatch(actions.follow(userId))
    }else{
        console.log('followTC some trouble')
    }
}

export const unfollowTC = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.unfollow(userId)
    if(response.data.resultCode === 0){
        dispatch(actions.unfollow(userId))
    }else{
        console.log('unfollowTC some trouble')
    }
}


export default usersReducer


type actionsType = inferActionsType<typeof actions>