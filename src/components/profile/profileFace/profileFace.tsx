import React from "react"
import s from './profileFace.module.scss'
import user_main from '../../../commons/imgs/users/user_main.webp'
import { useDispatch } from "react-redux"
import { updateProfilePhotoTC } from "../../../redux/profile-reducer"
import { profileType } from "../../../types/types"
import { Link } from "react-router-dom"
import './profileFaceStyles.scss'

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
                ? <div className={s.input__wrapper}>
                    <input id='input__file' onChange={updatePhoto} type="file" accept="image/*"/>
                    <label htmlFor='input__file'>Choose a photo</label>
                </div>
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