import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { sendMessageTC } from "../../../redux/dialogs-reducer"
import s from './dialogsInput.module.scss'

type propsType = {
    userId: number | null
}

const DialogsInput: React.FC<propsType> = React.memo(({userId}) => {
    const [currentValue, setCurrentValue] = useState('')
    const dispatch = useDispatch()
    const newSymbol = (e: any) => {
        setCurrentValue(e.currentTarget.value)
    }
    const sendMessageWrapper = () => {
        {/* @ts-ignore */}
        dispatch(sendMessageTC(userId, currentValue))
        setCurrentValue('')
    }
    const checkingForKeys = (e: any) => {
        if(e.code === 'Enter'){
            e.preventDefault()
            sendMessageWrapper()
        }
    }
    function auto_grow(element: any) {
        console.log(element.target.style)
        element.target.style.height += "5px";
        element.target.style.height = (element.scrollHeight) + "px";
    }
    return(
        <div className={s.dialogs__input}>
            {/* @ts-ignore */}
            <textarea onInput={auto_grow} onKeyDown={checkingForKeys} onChange={newSymbol} value={currentValue}/>
            <button onClick={sendMessageWrapper}>SendMessage</button>
        </div>
    )
})


export default DialogsInput