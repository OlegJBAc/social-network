import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../commons/loader"
import { getUsersSelector } from "../../redux/selectors"
import { getUsersTC } from "../../redux/users-reducer"
import s from './users.module.scss'
import UserItem from "./userItem/usersItems"
import Paginator from "./paginator/paginator"
import UsersFilter from "./usersFilter/usersFilter"


const Users = () => {
    const dispatch = useDispatch()
    let users = useSelector(getUsersSelector)
    const [flexible, setFlexible] = useState(true)
    useEffect(() => {
        // @ts-ignore
        dispatch(getUsersTC(9, 1))
    }, [])
    if(!users){
        return <Loader/>
    }
    return(
        <div className={s.users}>
            <Paginator/>
            <div className={s.users__view}>
                <UsersFilter/>
                {flexible
                    ? <button onClick={() => setFlexible(false)}>ClassicView</button>
                    : <button onClick={() => setFlexible(true)}>FlexibleView</button>
                }
            </div>
            <div className={flexible ? s.users__flexible : s.users__classic}>
                <UserItem users={users} flexible={flexible}/>
            </div>
        </div>
    )
}

export default Users