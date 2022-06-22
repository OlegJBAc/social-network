import { Action, AnyAction, applyMiddleware, combineReducers, createStore } from "redux"
import profileReducer from "./profile-reducer"
import thunk, { ThunkAction } from 'redux-thunk'
import authReducer from "./auth-reducer"
import usersReducer from "./users-reducer"
import chatReducer from "./chat-reducer"
import dialogsReducer from "./dialogs-reducer"


let rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    chat: chatReducer,
    dialogs: dialogsReducer
})
let store = createStore(rootReducer, applyMiddleware(thunk))

export type appType = ReturnType<typeof rootReducer>
export type inferActionsType<AT> = AT extends {[key: string]: (...args: any[]) => infer R} ? R : never

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>





export default store