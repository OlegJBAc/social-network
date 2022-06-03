import React from "react"
import s from './profileFace.module.scss'
import user_main from '../../../user_main.webp'
import { useDispatch } from "react-redux"
import { updateProfilePhotoTC } from "../../../redux/profile-reducer"

const ProfileFace = () => {
    const dispatch = useDispatch()
    const updatePhoto = (e: any) => {
        // @ts-ignore
        dispatch(updateProfilePhotoTC(e.target.files[0]))
    }
    return(
        <div className={s.profile__face}>
            <div className={s.avatar}>
                <img src={user_main}/>
            </div>
            <input onChange={updatePhoto} type="file"/>
        </div>
    )
}

export default ProfileFace