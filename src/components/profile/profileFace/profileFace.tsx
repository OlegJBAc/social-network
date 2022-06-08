import React from "react"
import s from './profileFace.module.scss'
import user_main from '../../../user_main.webp'
import { useDispatch } from "react-redux"
import { updateProfilePhotoTC } from "../../../redux/profile-reducer"
import { profileType } from "../../../types/types"
import { Link, Navigate } from "react-router-dom"

type propsType = {
    profile: profileType | null
    isOwner: boolean | null
    currentUserId: number | null
}
const ProfileFace: React.FC<propsType> = ({profile, isOwner, currentUserId}) => {
    const dispatch = useDispatch()
    const updatePhoto = (e: any) => {
        // @ts-ignore
        dispatch(updateProfilePhotoTC(e.target.files[0]))
    }

    return(
        <div className={s.profile__face}>
            <div className={s.avatar}>
                <img src={profile?.photos.large ? profile?.photos.large : user_main}/>
            </div>
            {isOwner
                ? <input onChange={updatePhoto} type="file"/>
                : <Link to={`/dialogs/id=${currentUserId}`}>
                    <div className={s.profile__dialogs}>
                        <span>SendMessage</span>
                    </div>
                </Link>
            }
        </div>
    )
}

export default ProfileFace