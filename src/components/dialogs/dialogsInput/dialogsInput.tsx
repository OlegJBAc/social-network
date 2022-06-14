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
            <button onClick={sendMessageWrapper}>SendMessage</button>
        </div>
    )
})


export default DialogsInput