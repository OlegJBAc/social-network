import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { sendMessageTC } from "../../../redux/dialogs-reducer"
import s from './dialogsInput.module.scss'

type propsType = {
    userId: number | null
}

const DialogsInput: React.FC<propsType> = React.memo(({userId}) => {
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
        dispatch(sendMessageTC(userId, currentValue))
        setCurrentValue('')
        myTextareaRef.current.style.height = '45px'
    }
    return(
        <div className={s.dialogs__input}>
            {/* @ts-ignore */}
            <textarea ref={myTextareaRef} onKeyDown={checkingForKeys}
             onChange={newSymbol} value={currentValue} placeholder={'write a message...'} />
            <button onClick={sendMessageWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="send_24__Page-2" stroke="none" fill="none">
                        <g id="send_24__send_24">
                            <path id="send_24__Rectangle-76" d="M0 0h24v24H0z"/>
                            <path d="M5.74 15.75a39.14 39.14 0 00-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 003 2.54l5.76 1.11a.1.1 0 010 .2L8.73 13.2a4 4 0 00-3 2.54z" id="send_24__Mask" fill="currentColor"/>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
    )
})


export default DialogsInput