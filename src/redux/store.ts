import { applyMiddleware, combineReducers, createStore } from "redux"
import profileReducer from "./profile-reducer"
import thunk from 'redux-thunk'


let rootReducer = combineReducers({
    profile: profileReducer
})


let store = createStore(rootReducer, applyMiddleware(thunk))


export default store