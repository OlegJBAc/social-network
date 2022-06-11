import React, { Dispatch } from "react"
import { useSelector } from "react-redux"
import { getMyUserIdSelector } from "../../../../redux/selectors"
import { messageType } from "../../../../types/types"
import s from './message.module.scss'


type propsType = {
    message: messageType
    selectedMessages: string[]
    setSelectedMessages: (messagesId: string[] | ((selectedMessagesArr: string[]) => any)) => void
    selectingMode: boolean
    setSelectingMode: (mode: boolean) => void
}

const Message: React.FC<propsType> = ({message, 
                                selectedMessages, 
                                setSelectedMessages, 
                                selectingMode, 
                                setSelectingMode}) => {
    let myUserId = useSelector(getMyUserIdSelector)
    console.log(message)
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
    return(
        <div onContextMenu={onRightClick}
             onDoubleClick={selectingMode ? selectMessage : (e: any) => e.preventDefault()}
             className={s.message}>
            <div className={selectedMessages.includes(message.id) ? s.message__selected : s.none}>
                <div className={message.senderId === myUserId ? s.message__my : s.message__friend}>
                    <div className={message.senderId === myUserId ? s.my__wrapper : s.friend__wrapper}>
                        <span id={s.message__text}>{message.body}</span>
                        <span id={s.message__time}>{message.addedAt.substr(beginOfTimeIndex, 5)}</span>
                        <span id={s.message__viewed}>{message.viewed ? '✔' : '🔵'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message