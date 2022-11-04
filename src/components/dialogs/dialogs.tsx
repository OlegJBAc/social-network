import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessagesTC } from "../../redux/dialogs-reducer"
import { getIsMobileScreenSelector, getMyUserIdSelector } from "../../redux/selectors"
import s from './dialogs.module.scss'
import DialogsInput from "./dialogsInput/dialogsInput"
import DialogsMessages from "./dialogsMessages/dialogsMessages"
import * as queryString from 'query-string'
import { useLocation } from "react-router-dom"
import authRedirectHoc from "../../commons/hocs/hoc"
import DialogsHeader from "./dialogsHeader/dialogsHeader"
import { getProfileTC } from "../../redux/profile-reducer"


const Dialogs = React.memo(() => {
    const dispatch = useDispatch()
    const history = useLocation()
    const [userId, setUserId] = useState(0)

    const isMobileScreen = useSelector(getIsMobileScreenSelector)

    useEffect(() => {
        const parsed = queryString.parse(history.pathname)
        if(Number(parsed['/dialogs/id'])){
            setUserId(Number(parsed['/dialogs/id']))
        }
    }, [history.pathname])
    useEffect(() => {
        if(userId !== 0){
            // @ts-ignore
            dispatch(getMessagesTC(userId, 1, 20))
        }
    }, [userId])
    useEffect(() => {
        if(userId !== 0){
            dispatch(getProfileTC(userId))
        }
    }, [userId])
    return(
        <div className={userId === 0 ? s.dialogs__myself : s.dialogs}>
            {userId === 0
                ? <div className={s.dialogs__own}>
                    <span>Sorry, but you can't send message to yourself^_^</span>
                </div>
                : <>
                    <DialogsHeader/>
                    <DialogsMessages userId={userId}/>
                    <DialogsInput userId={userId}/>
                </>
            }
        </div>
    )
})


export default authRedirectHoc(Dialogs)