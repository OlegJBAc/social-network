import React from "react"
import { useDispatch, useSelector } from "react-redux"
import s from './userItem.module.scss'
import user_main from '../../../user_main.webp'
import { userType } from "../../../types/types"
import { followTC, unfollowTC } from '../../../redux/users-reducer'
import { v1 } from 'uuid'


type propsType = {
    users: userType[]
}

const UserItem: React.FC<propsType> = ({users}) => {
    const dispatch = useDispatch()
    return(
        <>
            {users.map(user => {
                return <div key={v1()} className={s.user}>
                    <div className={s.user__img}>
                        <img src={user.photos.small ? user.photos.small : user_main}/>
                    </div>
                    <div className={s.user__name}>
                        {user.name}
                    </div>
                    <div className={s.user__following}>
                        {user.followed
                        // @ts-ignore
                            ? <button onClick={() => dispatch(unfollowTC(user.id))}>Unfollow</button>
                        // @ts-ignore
                            : <button onClick={() => dispatch(followTC(user.id))}>Follow</button>
                        }
                    </div>
                </div>
            })}
        </>
    )
}

export default UserItem