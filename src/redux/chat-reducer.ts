import { Dispatch } from "redux"
import { chatAPI, messageType } from "../API/chatAPI"
import { appDispatchType, inferActionsType } from "./store"
import { v1 } from 'uuid'


const initialState = {
    messages: [] as messageType[] 
}

const chatReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'SET_MESSAGES':
            return{...state, messages: [
                ...state.messages, ...action.messages.map(m => ({...m, id: v1()}))]
                .filter((m, index, arr) => index >= arr.length - 100)
            }
        case 'CLEAN_MESSAGES':
            return{...state, messages: []}
        default:
            return state
    }
}

export const actions = {
    setMessages: (messages: messageType[]) => ({type: 'SET_MESSAGES', messages} as const),
    cleanMessages: () => ({type: 'CLEAN_MESSAGES'} as const)
}

let _newMessageHandler: ((messages: messageType[]) => void) | null = null
let newMessagesHandlerCreator = (dispatch: appDispatchType) => {
    if(_newMessageHandler === null){
        _newMessageHandler = (messages: any) => {
            dispatch(actions.setMessages(messages))
        }
    }
    return _newMessageHandler 
}

export const startListeningMessagesTC = () => (dispatch: appDispatchType) => {
    chatAPI.createChannel()
    // @ts-ignore
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
} 
export const stopListeningMessagesTC = () => (dispatch: appDispatchType) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.destroyChannel()
    dispatch(actions.cleanMessages())
} 
export const sendMessage = (message: string) => {
    chatAPI.sendMessage(message)
}


export default chatReducer

type actionsType = inferActionsType<typeof actions>