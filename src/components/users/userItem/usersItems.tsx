import React from "react"
import s from './usersItems.module.scss'
import user_main from '../../../commons/imgs/users/user_main.webp'
import { userType } from "../../../types/types"
import { followTC, unfollowTC } from '../../../redux/users-reducer'
import { v1 } from 'uuid'
import { Link } from "react-router-dom"
import { getAppTheme } from "../../../redux/selectors"
import cnBind from 'classnames/bind'
import { useAppDispatch, useAppSelector } from "../../../commons/hooks/hooks"


const UserItem: React.FC<propsType> = ({users, flexible}) => {
    const dispatch = useAppDispatch()

    const appTheme = useAppSelector(getAppTheme)
    const cx = cnBind.bind(s)
    
    return(
        <>
            {users.map(user => {
                return(
                    <div key={v1()} className={cx(`${flexible ? s.user__flexible : s.user__classic}`, {
                        light: appTheme === 'Light',
                        dark: appTheme === 'Dark',
                    })}>
                        <div className={flexible ? s.flexible__img : s.classic__img}>
                            <Link to={`/profile/id=${user.id}`}>
                                <img src={user.photos.small ? user.photos.small : user_main}/>
                            </Link>
                        </div>
                        <div className={flexible ? s.flexible__nameWrapper : s.classic__nameWrapper}>
                            <Link to={`/profile/id=${user.id}`}>
                                <div className={flexible ? s.flexible__name : s.classic__name}>
                                    <span>{user.name}</span>
                                </div>
                            </Link>
                            <div className={flexible ? s.flexible__following : s.classic__following}>
                                {user.followed
                                    ? <button className={s.user__unfollow}
                                            // @ts-ignore
                                            onClick={() => dispatch(unfollowTC(user.id))}>
                                        <span>Unfollow</span>
                                    </button>
                                
                                    : <button className={flexible ? s['flexible__follow-button'] : s['classic__follow-button']}
                                            // @ts-ignore
                                            onClick={() => dispatch(followTC(user.id))}>
                                        <span>Follow</span>
                                    </button>
                                }
                                <Link to={`/dialogs/id=${user.id}`}>
                                    <button className={flexible ? s['flexible__write-button'] : s['classic__write-button']}>
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


type propsType = {
    users: userType[]
    flexible: boolean
}
