import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { sendMessageTC } from "../../../redux/dialogs-reducer"
import s from './dialogsInput.module.scss'



const DialogsInput = React.memo(() => {
    const [currentValue, setCurrentValue] = useState('')
    const dispatch = useDispatch()
    return(
        <div className={s.dialogs__input}>
            <textarea onChange={(e: any) => setCurrentValue(e.currentTarget.value)} value={currentValue}/>
            {/* @ts-ignore */}
            <button onClick={() => dispatch(sendMessageTC(19901, currentValue))}>SendMessage</button>
        </div>
    )
})


export default DialogsInput