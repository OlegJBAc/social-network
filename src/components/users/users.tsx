import React, { useEffect, useState } from "react"
import Loader from "../../commons/loader/loader"
import {getAppTheme, getPageSizeSelector, getUsersSelector} from "../../redux/selectors"
import { getUsersTC } from "../../redux/users-reducer"
import s from './users.module.scss'
import UserItem from "./userItem/usersItems"
import Paginator from "./paginator/paginator"
import UsersFilter from "./usersFilter/usersFilter"
import authRedirectHoc from "../../commons/hocs/hoc"
import cnBind from 'classnames/bind'
import { useAppDispatch, useAppSelector } from "../../commons/hooks/hooks"


const Users = () => {
    const dispatch = useAppDispatch()
    let users = useAppSelector(getUsersSelector)
    let pageSize = useAppSelector(getPageSizeSelector)
    const appTheme = useAppSelector(getAppTheme)

    const [flexible, setFlexible] = useState(true)
    
    const cx = cnBind.bind(s)
    
    useEffect(() => {
        dispatch(getUsersTC(pageSize, 1))
    }, [])
    if(!users){
        return <Loader/>
    }
    return(
        <div className={cx("users", {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <Paginator/>
            <div className={s.users__view}>
                <UsersFilter/>
                {flexible
                    ? <button className={s['users__view-button']} onClick={() => setFlexible(false)}>ClassicView</button>
                    : <button className={s['users__view-button']} onClick={() => setFlexible(true)}>FlexibleView</button>
                }
            </div>
            <div className={flexible ? s.users__flexible : s.users__classic}>
                <UserItem users={users} flexible={flexible}/>
            </div>
        </div>
    )
}

export default authRedirectHoc(Users)