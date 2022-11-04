import { Dispatch } from "redux"
import { dialogsAPI } from "../API/dialogsAPI"
import { messageType } from "../types/types"
import { inferActionsType } from "./store"



const initialState = {
    messages: [] as messageType[]
}

const dialogsReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'GET_MESSAGES':
            return{...state, messages: [...action.messages]}
        case 'MESSAGES_WITH_SENDED':
            return{...state,
                messages: [...state.messages, action.message]}
        default:
            return state
    }
}

const actions = {
    getMessages: (messages: messageType[]) => ({type: 'GET_MESSAGES', messages} as const ),
    messagesWithSended: (message: messageType) => ({type: 'MESSAGES_WITH_SENDED', message} as const),
}

export const getMessagesTC = (userId: number, page: number, count: number) => async (dispatch: Dispatch) => {
    let response = await dialogsAPI.getMessages(userId, page, count)
        dispatch(actions.getMessages(response.data.items))
}

export const sendMessageTC = (userId: number, body: string) => async (dispatch: Dispatch) => {
    let response = await dialogsAPI.sendMessage(userId, body)
    dispatch(actions.messagesWithSended(response.data.data.message))
}
export const deleteMessagesTC = (messages: Array<string>, userId: number) => async (dispatch: Dispatch) => {
    let counter = 0
    const deleteFunc = () => {
        dialogsAPI.deleteMessage(messages[counter]).then(() => {
            ++counter
            if(counter < messages.length){
                deleteFunc()
            }if(counter === messages.length){
                // @ts-ignore
                dispatch(getMessagesTC(userId))
                return new Promise((resolve, reject) => {
                    resolve('ready')
                })
            }
        })
    }
    deleteFunc()
}

export default dialogsReducer


type actionsType = inferActionsType<typeof actions>