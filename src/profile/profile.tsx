import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../commons/loader"
import { getProfileTC } from "../redux/profile-reducer"
import { getProfileSelector } from "../redux/selectors"
import s from './profile.module.scss'
import ProfileBody from "./profileBody/profileBody"
import ProfileFace from "./profileFace/profileFace"

const Profile = () => {
    const dispatch = useDispatch()
    let profile = useSelector(getProfileSelector)
    useEffect(() => {
        // @ts-ignore
        dispatch(getProfileTC(19901))
    }, [])
    if(!profile){
        return <Loader/>
    }
    return(
        <div className={s.profile}>
            <ProfileFace/>
            <ProfileBody/>

        </div>
    )
}

export default Profile