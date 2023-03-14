import React, { useEffect, useState } from "react"
import { getMessagesTC } from "../../redux/dialogs-reducer"
import { getAppTheme } from "../../redux/selectors"
import s from './dialogs.module.scss'
import DialogsInput from "./dialogsInput/dialogsInput"
import DialogsMessages from "./dialogsMessages/dialogsMessages"
import * as queryString from 'query-string'
import { useLocation } from "react-router-dom"
import authRedirectHoc from "../../commons/hocs/hoc"
import DialogsHeader from "./dialogsHeader/dialogsHeader"
import { getProfileTC } from "../../redux/profile-reducer"
import cnBind from 'classnames/bind'
import { useAppDispatch, useAppSelector } from "../../commons/hooks/hooks"


const Dialogs = React.memo(() => {
    const dispatch = useAppDispatch()
    const history = useLocation()
    const [userId, setUserId] = useState(0)

    const appTheme = useAppSelector(getAppTheme)
    const cx = cnBind.bind(s)

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
        <div className={cx(`${userId === 0 ? s.dialogs__myself : s.dialogs}`, {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            {userId === 0
                ? <div className={cx(`dialogs__own`, {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })}>
                    <span>Sorry, but you can't send message to yourself^_^</span>
                </div>
                : <>
                    <DialogsHeader userId={userId}/>
                    <DialogsMessages userId={userId}/>
                    <DialogsInput userId={userId}/>
                </>
            }
        </div>
    )
})


export default authRedirectHoc(Dialogs)