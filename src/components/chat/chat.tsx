import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startListeningMessagesTC, sendMessage, stopListeningMessagesTC } from "../../redux/chat-reducer"
import { getChatMessagesSelector } from "../../redux/selectors"
import s from './chat.module.scss'
import { v1 } from 'uuid'
import user_main from '../../commons/imgs/users/user_main.webp'
import { Link } from "react-router-dom"
import authRedirectHoc from "../../commons/hocs/hoc"


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
                                <Link to={`/profile/id=${message.userId}`}>
                                    <img src={message.photo ? message.photo : user_main}/>
                                </Link>
                            </div>
                            <div className={s.chat__info}>
                                <div className={s.chat__name}>
                                    <Link to={`/profile/id=${message.userId}`}>
                                        {message.userName}
                                    
                                    </Link>
                                </div>
                                <div className={s.chat__text}>
                                    {message.message}
                                </div>
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
    const dispatch = useDispatch()
    const myTextareaRef: any = useRef('')
    const newSymbol = (e: any) => {
        setCurrentValue(e.currentTarget.value)
    }

    const checkingForKeys = (e: any) => {
        if(e.code === 'Enter'){
            e.preventDefault()
            sendMessageWrapper()
        }
    }
    useEffect(() => {
        function OnInput(){
            //@ts-ignore
            this.style.height = 'auto'
            //@ts-ignore
            this.style.height = (this.scrollHeight) + 'px'
        }

            for (let i = 0; i < 1; i++) {
                myTextareaRef.current.setAttribute('style', 'height:')
                myTextareaRef.current.addEventListener("input", OnInput, false)
            }
        
        return () => {
            if(myTextareaRef.current){
                myTextareaRef.current.removeEventListener("input", OnInput, false)
            }
        }
    }, [])
    const sendMessageWrapper = () => {
        {/* @ts-ignore */}
        sendMessage(currentValue)
        setCurrentValue('')
        myTextareaRef.current.style.height = '45px'
    }
    return(
        <div className={s.chat__input}>
            <textarea ref={myTextareaRef} onKeyDown={checkingForKeys}
             onChange={newSymbol} value={currentValue} placeholder={'write a message...'}/>
            <button onClick={sendMessageWrapper}>SendMessage</button>
        </div>
    )
}


export default authRedirectHoc(Chat)