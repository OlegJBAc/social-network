import React, { useEffect, useRef, useState } from "react"
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
    
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return(
        <div className={s.chat}>
            <div className={s.chat__body} onScroll={scrollHandler}>
                {messages.map(message => {
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
                <div ref={messagesAnchorRef}></div>
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