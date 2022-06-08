import React from "react"
import { useSelector } from "react-redux"
import { getMyUserIdSelector } from "../../../../redux/selectors"
import s from './message.module.scss'


const Message: React.FC<any> = ({message, 
                                selectedMessages, 
                                setSelectedMessages, 
                                selectingMode, 
                                setSelectingMode}) => {
    let myUserId = useSelector(getMyUserIdSelector)

    const onRightClick = (e: any) => {
        e.preventDefault()
        setSelectingMode(true)
    }
    const selectMessage = (e: any) => {
        if(!selectedMessages.includes(message.id)){
            setSelectedMessages((selectedMessagesArr: Array<string>) => [...selectedMessagesArr, message.id])
        }
    }
    return(
        <div onContextMenu={onRightClick}
             onDoubleClick={selectingMode ? selectMessage : (e: any) => e.preventDefault()}
             className={selectedMessages.includes(message.id) ? s.message__selected : s.message}>
            <div className={message.senderId === myUserId ? s.message__my : s.message__friend}>
                <span>{message.body}</span>
            </div>
        </div>
    )
}

export default Message