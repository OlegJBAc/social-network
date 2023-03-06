import React, { useEffect, useRef, useState } from "react"
import { v1 } from "uuid"
import { useAppDispatch, useAppSelector } from "../../../commons/hooks/hooks"
import { deleteMessagesTC } from "../../../redux/dialogs-reducer"
import { getDialogsMessagesSelector} from "../../../redux/selectors"
import s from './dialogsMessages.module.scss'
import Message from "./message/message"


type propsType = {
    userId: number
}

const DialogsMessages: React.FC<propsType> = React.memo(({ userId }) => {
    const dispatch = useAppDispatch()
    let messages = useAppSelector(getDialogsMessagesSelector)

    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const [selectingMode, setSelectingMode] = useState(false)
    const [selectedMessages, setSelectedMessages] = useState<string[]>([])

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
        <>
            {messages.length === 0
                ? <div className={s.dialogs__messagesZero}>
                    <span>There are no messages here yet</span>
                </div>
                : <div className={s.dialogs__messages} onScroll={scrollHandler}>
                    {selectingMode 
                        ? 
                            <div className={s.selecting}>
                                {/* @ts-ignore */}
                                <button onClick={() => {
                                    {/* @ts-ignore */}
                                    dispatch(deleteMessagesTC(selectedMessages, userId)).then(() => {
                                        setSelectingMode(false)
                                    })
                                    }}>Delete</button>
                                <button onClick={() => {
                                    setSelectingMode(false)
                                    setSelectedMessages([])
                                    }}>Cancel</button>
                            </div>
                        
                        : false
                    }
                    { messages.map(message => <Message key={v1()}
                                                    userId={userId}
                                                    message={message}
                                                    selectedMessages={selectedMessages}
                                                    setSelectedMessages={setSelectedMessages}
                                                    selectingMode={selectingMode}
                                                    setSelectingMode={setSelectingMode}
                                                />)}
                    <div ref={messagesAnchorRef}></div>
                </div>
            }
        </>
    )
})

export default DialogsMessages

