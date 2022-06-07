import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getMessagesTC } from "../../redux/dialogs-reducer"
import s from './dialogs.module.scss'
import DialogsMessages from "./dialogsMessages/dialogsMessages"


const Dialogs = React.memo(() => {
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(getMessagesTC(19901, 1, 20))
    }, [])
    return(
        <div className={s.dialogs}>
            <DialogsMessages/>
        </div>
    )
})


export default Dialogs