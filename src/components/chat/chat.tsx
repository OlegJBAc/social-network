import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startListeningMessagesTC, sendMessage, stopListeningMessagesTC } from "../../redux/chat-reducer"
import { getChatMessagesSelector } from "../../redux/selectors"
import s from './chat.module.scss'
import { v1 } from 'uuid'
import user_main from '../../user_main.webp'

const Chat = () => {
    const dispatch = useDispatch()
    let messages = useSelector(getChatMessagesSelector)
    useEffect(() => {
        // @ts-ignore
        dispatch(startListeningMessagesTC(dispatch))
        return () => {
            // @ts-ignore
            dispatch(stopListeningMessagesTC())
        }
    }, [])
    return(
        <div className={s.chat}>
            <div className={s.chat__body}>
                {messages.map(message => {
                    console.log(message)
                    return(
                        <div key={v1()} className={s.chat__message}>
                            <div>
                                <img src={message.photo ? message.photo : user_main}/>
                            </div>
                            <div>
                                {message.userName}
                            </div>
                            <div>
                                {message.message}
                            </div>
                        </div>
                    )
                })}
            </div>
            <AddMessage/>
        </div>
    )
}

const AddMessage = () => {
    const [currentValue, setCurrentValue] = useState('')
    const newSymbol = (e: any) => {
        setCurrentValue(e.currentTarget.value)
    }

    return(
        <div className={s.chat__input}>
            <textarea onChange={newSymbol} value={currentValue}/>
            <button onClick={() => sendMessage(currentValue)}>SendMessage</button>
        </div>
    )
}




export default Chat