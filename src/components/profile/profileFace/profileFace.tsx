import React from "react"
import s from './profileFace.module.scss'
import user_main from '../../../user_main.webp'
import { useDispatch, useSelector } from "react-redux"
import { updateProfilePhotoTC } from "../../../redux/profile-reducer"
import { getMyUserIdSelector, getProfileSelector } from "../../../redux/selectors"

const ProfileFace: React.FC<any> = ({profile}) => {
    const dispatch = useDispatch()
    let userId = useSelector(getMyUserIdSelector)
    const updatePhoto = (e: any) => {
        // @ts-ignore
        dispatch(updateProfilePhotoTC(e.target.files[0], userId))
    }

    return(
        <div className={s.profile__face}>
            <div className={s.avatar}>
                <img src={profile?.photos.large ? profile?.photos.large : user_main}/>
            </div>
            <input onChange={updatePhoto} type="file"/>
        </div>
    )
}

export default ProfileFace