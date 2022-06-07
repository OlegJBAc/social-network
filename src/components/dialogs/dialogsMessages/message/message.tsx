import React from "react"
import { useSelector } from "react-redux"
import { getMyUserIdSelector } from "../../../../redux/selectors"
import s from './message.module.scss'


const Message: React.FC<any> = ({message}) => {
    let myUserId = useSelector(getMyUserIdSelector)
    // recipientId: 19901
    // senderId: 19897
    return(
        <div className={s.message}>
            <div className={message.senderId === myUserId ? s.message__my : s.message__friend}>
                <span>{message.body}</span>
            </div>
        </div>
    )  
}

export default Message