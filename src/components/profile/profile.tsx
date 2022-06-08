import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import authRedirectHoc from "../../commons/hocs/hoc"
import Loader from "../../commons/loader"
import { getProfileTC } from "../../redux/profile-reducer"
import { getMyUserIdSelector, getProfileSelector } from "../../redux/selectors"
import s from './profile.module.scss'
import ProfileBody from "./profileBody/profileBody"
import ProfileFace from "./profileFace/profileFace"
import * as queryString from 'query-string'


const Profile = () => {
    const dispatch = useDispatch()
    const history = useLocation()
    let profile = useSelector(getProfileSelector)
    let userId = useSelector(getMyUserIdSelector)

    useEffect(() => {
        const parsed = queryString.parse(history.pathname)
        if(parsed['/profile/id']){
            // @ts-ignore
            dispatch(getProfileTC(Number(parsed['/profile/id'])))
        }else{
            // @ts-ignore
            dispatch(getProfileTC(userId))
        }
    }, [history.pathname])
    // @ts-ignore
    if(!profile){
        return <Loader/>
    }
    return(
        <div className={s.profile}>
            <ProfileFace profile={profile}/>
            <ProfileBody profile={profile}/>
        </div>
    )
}

export default authRedirectHoc(Profile)