let ws: WebSocket

let observers = {
    'messages-received': [] as Array<(message: any) => void>,
    'status-changed': [] as Array<(status: any) => void>
}

const messageHandler = (data: any) => {
    observers['messages-received'].forEach(obs => obs(JSON.parse(data.data)))
}

export const chatAPI = {
    createChannel(){
        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws.addEventListener('message', messageHandler)
    },
    subscribe(event: eventType, observer: observerMessageType){
        observers[event].push(observer)
        return () => {
            observers[event] = observers[event].filter(obs => obs !== observer)
        }
    },
    unsubscribe(event: eventType, observer: observerStatusType){
        observers[event] = observers[event].filter(obs => obs !== observer)
        observers[event] = []
        observers[event] = []
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    sendMessage(message: string){
        ws.send(message)
    }
}


type eventType = 'messages-received' | 'status-changed'
export type messageType = {
    message: string
    photo: string
    userId: number
    userName: string
    messageId?: string
}
export type observerMessageType = (message: messageType) => void
export type observerStatusType = (status: any) => void