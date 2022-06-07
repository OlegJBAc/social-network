import React, { useEffect, useRef, useState } from "react"
import {  useDispatch, useSelector } from "react-redux"
import { v1 } from "uuid"
import { deleteMessagesTC } from "../../../redux/dialogs-reducer"
import { getDialogsMessagesSelector} from "../../../redux/selectors"
import s from './dialogsMessages.module.scss'
import Message from "./message/message"


const DialogsMessages = React.memo(() => {
    const dispatch = useDispatch()
    let messages = useSelector(getDialogsMessagesSelector)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const [selectingMode, setSelectingMode] = useState(false)
    const [selectedMessages, setSelectedMessages] = useState([])

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
            {selectingMode 
                ? 
                    <div className={s.selecting}>
                        {/* @ts-ignore */}
                        <button onClick={() => {
                            {/* @ts-ignore */}
                            dispatch(deleteMessagesTC(selectedMessages, 19901)).then((data) => {
                                console.log(data)
                                setSelectingMode(false)
                            })

                            }}>Delete</button>
                        <button onClick={() => setSelectingMode(false)}>Cancel</button>
                    </div>
                
                : false
            }
            {/* @ts-ignore */}
            {messages.map(message => <Message key={v1()}
                                              message={message}
                                              selectedMessages={selectedMessages}
                                              setSelectedMessages={setSelectedMessages}
                                              selectingMode={selectingMode}
                                              setSelectingMode={setSelectingMode}
                                        />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
})

export default DialogsMessages

