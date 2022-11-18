import React from "react"
import { useDispatch } from "react-redux"
import s from './dialogsHeader.module.scss'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getAppTheme, getProfileSelector } from "../../../redux/selectors"
import user_small from '../../../commons/imgs/users/user_main.webp'
import * as queryString from 'query-string'
import cnBind from 'classnames/bind'
import { useAppSelector } from "../../../commons/hooks/hooks"


const DialogsHeader = () => {
    const dispatch = useDispatch()
    const history = useLocation()
    const navigate = useNavigate()

    let profile = useAppSelector(getProfileSelector)
    const appTheme = useAppSelector(getAppTheme)

    const cx = cnBind.bind(s)

    let parsed = queryString.parse(history.pathname)
    return(
        <div className={cx('header', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <div className={s.header__back}>
                <svg onClick={() => navigate(-1)} fill="none" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.88 18.12a1.25 1.25 0 0 1-1.76 1.76l-7-7a1.25 1.25 0 0 1 0-1.76l7-7a1.25 1.25 0 0 1 1.76 1.76L9.77 12z" fill="currentColor">
                    </path>
                </svg>
                <span onClick={() => navigate(-1)}>Back</span>
            </div>
            <div className={s.header__name}>
            <Link to={`/profile/id=${Number(parsed['/dialogs/id'])}`}>
                <span>{profile?.fullName}</span>
            </Link>
            </div>
            <Link to={`/profile/id=${Number(parsed['/dialogs/id'])}`}>
                <img src={profile?.photos.small ? profile.photos.small : user_small}/>
            </Link>
        </div>
    )
}


export default DialogsHeader