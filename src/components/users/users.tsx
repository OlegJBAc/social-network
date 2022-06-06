import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../commons/loader"
import { getUsersSelector } from "../../redux/selectors"
import { getUsersTC } from "../../redux/users-reducer"
import s from './users.module.scss'
import UserItem from "./userItem/userItem"
import Paginator from "./paginator/paginator"


const Users = () => {
    const dispatch = useDispatch()
    let users = useSelector(getUsersSelector)
    useEffect(() => {
        // @ts-ignore
        dispatch(getUsersTC(100, 1))
    }, [])
    if(!users){
        return <Loader/>
    }
    return(
        <div className={s.users}>
            <Paginator/>
            <div className={s.users__wrap}>
                <UserItem users={users}/>
            </div>
        </div>
    )
}

export default Users