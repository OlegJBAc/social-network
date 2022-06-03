import { applyMiddleware, combineReducers, createStore } from "redux"
import profileReducer from "./profile-reducer"
import thunk from 'redux-thunk'
import authReducer from "./auth-reducer"


let rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
})

export type appType = ReturnType<typeof rootReducer>
export type inferActionsType<AT> = AT extends {[key: string]: (...args: any[]) => infer R} ? R : never


let store = createStore(rootReducer, applyMiddleware(thunk))


export default store