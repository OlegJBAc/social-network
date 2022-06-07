import React, { useEffect, useRef, useState } from "react"
import {  useSelector } from "react-redux"
import { getDialogsMessagesSelector} from "../../../redux/selectors"
import s from './dialogsMessages.module.scss'
import Message from "./message/message"


const DialogsMessages = React.memo(() => {
    let messages = useSelector(getDialogsMessagesSelector)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)

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
        <div className={s.dialogs__messages} onScroll={scrollHandler}>
            {/* @ts-ignore */}
            {messages.map(message => <Message message={message}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
})

export default DialogsMessages

