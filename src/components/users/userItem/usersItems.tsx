import React from "react"
import { useDispatch, useSelector } from "react-redux"
import s from './usersItems.module.scss'
import user_main from '../../../commons/imgs/users/user_main.webp'
import { userType } from "../../../types/types"
import { followTC, unfollowTC } from '../../../redux/users-reducer'
import { v1 } from 'uuid'
import { Link } from "react-router-dom"


type propsType = {
    users: userType[]
    flexible: boolean
}

const UserItem: React.FC<propsType> = ({users, flexible}) => {
    const dispatch = useDispatch()
    return(
        <>
            {users.map(user => {
                return(
                    <div key={v1()} className={flexible ? s.user__flexible : s.user__classic}>
                        <div className={flexible ? s.flexible__img : s.classic__img}>
                            <Link to={`/profile/id=${user.id}`}>
                                <img src={user.photos.small ? user.photos.small : user_main}/>
                            </Link>
                        </div>
                        <div className={flexible ? s.flexible__nameWrapper : s.classic__nameWrapper}>
                            <Link to={`/profile/id=${user.id}`}>
                                <div className={flexible ? s.flexible__name : s.classic__name}>
                                    {user.name}
                                </div>
                            </Link>
                            <div className={flexible ? s.flexible__following : s.classic__following}>
                                {user.followed
                                    ? <button className={s.user__unfollow}
                                            // @ts-ignore
                                            onClick={() => dispatch(unfollowTC(user.id))}>
                                        <span>Unfollow</span>
                                    </button>
                                
                                    : <button className={s.user__follow}
                                            // @ts-ignore
                                            onClick={() => dispatch(followTC(user.id))}>
                                        <span>Follow</span>
                                    </button>
                                }
                                <Link to={`/dialogs/id=${user.id}`}>
                                    <button id={flexible ? s.flexible__write : s.classic__write}>
                                        <span>Write message</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )})}
        </>
    )
}

export default UserItem