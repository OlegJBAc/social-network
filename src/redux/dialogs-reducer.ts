import { Dispatch } from "redux"
import { dialogsAPI } from "../API/dialogsAPI"
import { inferActionsType } from "./store"



const initialState = {
    messages: [] as any
}


const dialogsReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'GET_MESSAGES':
            return{...state, messages: [...action.messages]}

        default:
            return state
    }
}

const actions = {
    getMessages: (messages: any) => ({type: 'GET_MESSAGES', messages} as const )
}

export const getMessagesTC = (userId: number, page: number, count: number) => async (dispatch: Dispatch) => {
    let response = await dialogsAPI.getMessages(userId, page, count)
    dispatch(actions.getMessages(response.data.items))
}



export default dialogsReducer


type actionsType = inferActionsType<typeof actions>