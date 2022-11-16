import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import authRedirectHoc from "../../commons/hocs/hoc"
import Loader from "../../commons/loader/loader"
import { getProfileTC } from "../../redux/profile-reducer"
import { getAppTheme, getMyUserIdSelector, getProfileSelector } from "../../redux/selectors"
import s from './profile.module.scss'
import ProfileBody from "./profileBody/profileBody"
import ProfileFace from "./profileFace/profileFace"
import * as queryString from 'query-string'
import cnBind from 'classnames/bind'
import { useAppDispatch, useAppSelector } from "../../commons/hooks/hooks"


const Profile = React.memo(() => {
    const dispatch = useAppDispatch()
    const history = useLocation()
    let profile = useAppSelector(getProfileSelector)
    let userId = useAppSelector(getMyUserIdSelector)
    const appTheme = useAppSelector(getAppTheme)

    const [isOwner, setIsOwner] = useState<boolean | null>(null)
    const [currentUserId, setCurrentUserId] = useState(userId)

    useEffect(() => {
        const parsed = queryString.parse(history.pathname)
        if(Number(parsed['/profile/id']) === userId){
            setIsOwner(true)
            setCurrentUserId(userId)
        }
        if(parsed['/profile/id'] && Number(parsed['/profile/id']) !== userId){
            setIsOwner(false)
            setCurrentUserId(Number(parsed['/profile/id']))
            // @ts-ignore
            dispatch(getProfileTC(Number(parsed['/profile/id'])))
        }else{
            // @ts-ignore
            dispatch(getProfileTC(userId))
            setCurrentUserId(userId)
            setIsOwner(true)
        }
    }, [history.pathname])


    const cx = cnBind.bind(s)

    if(!profile){
        return <Loader/>
    }
    return(
        <div className={cx(`profile`, {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <ProfileFace currentUserId={currentUserId} isOwner={isOwner} profile={profile}/>
            <ProfileBody isOwner={isOwner} profile={profile}/>
        </div>
    )
})

export default authRedirectHoc(Profile)