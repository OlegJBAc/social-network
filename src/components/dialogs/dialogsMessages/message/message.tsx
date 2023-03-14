import React, { Dispatch } from "react"
import { useAppSelector } from "../../../../commons/hooks/hooks"
import { getMyUserIdSelector } from "../../../../redux/selectors"
import { messageType } from "../../../../types/types"
import s from './message.module.scss'
import {v4} from "uuid";


const Message: React.FC<propsType> = ({message, 
                                       userId,
                                       selectedMessages, 
                                       setSelectedMessages, 
                                       selectingMode, 
                                       setSelectingMode}) => {

    let myUserId = useAppSelector(getMyUserIdSelector)

    const onRightClick = (e: any) => {
        e.preventDefault()
        setSelectingMode(true)
    }
    const selectMessage = () => {
        if(!selectedMessages.includes(message.id)){
            setSelectedMessages((selectedMessagesArr: string[]) => [...selectedMessagesArr, message.id])
        }
    }
    const beginOfTimeIndex = message.addedAt.indexOf('T') + 1

    const parseMessage = () => {
        let messageText = message.body

        if(messageText[0] === '{') {
            const messageCleared = messageText.substring(1, messageText.length - 1).split('&quot;')
            const messageProperties = ['name', 'email', 'phone', 'message']

            return messageProperties.map(property => {
                const propertyIndex = messageCleared.indexOf(property)
                const propertyContent = messageCleared[propertyIndex + 2]

                return <div key={v4()}
                            className={s.message__property}
                >
                    { propertyContent.length > 1 && property + ': ' + propertyContent }
                </div>
            })
        }else{
            return messageText
        }
    }

    return(
        <div onContextMenu={onRightClick}
             onDoubleClick={selectingMode ? selectMessage : (e: any) => e.preventDefault()}
             className={s.message}>
            <div className={selectedMessages.includes(message.id) ? s.message__selected : s.none}>
                <div className={message.senderId === myUserId ? s.message__my : s.message__friend}>
                    <div className={message.senderId === myUserId ? s.my__wrapper : s.friend__wrapper}>
                        <div id={s.message__text}>
                            { parseMessage() }
                        </div>
                        <span id={s.message__time}>
                            { message.addedAt.substr(beginOfTimeIndex, 5) }
                        </span>
                        <span id={s.message__viewed}>
                            { message.viewed ? '✔' : '🔵' }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message


type propsType = {
    message: messageType
    userId: number
    selectedMessages: string[]
    setSelectedMessages: (messagesId: string[] | ((selectedMessagesArr: string[]) => any)) => void
    selectingMode: boolean
    setSelectingMode: (mode: boolean) => void
}