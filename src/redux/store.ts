import { applyMiddleware, combineReducers, createStore } from "redux"
import profileReducer from "./profile-reducer"
import thunk from 'redux-thunk'
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

export type appType = ReturnType<typeof rootReducer>
export type inferActionsType<AT> = AT extends {[key: string]: (...args: any[]) => infer R} ? R : never


let store = createStore(rootReducer, applyMiddleware(thunk))


export default store