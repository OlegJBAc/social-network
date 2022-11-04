import React, { useState } from "react"
import { useSelector } from "react-redux"
import { getIsMobileScreenSelector } from "../../../redux/selectors"
import { profileType } from "../../../types/types"
import InfoInput from "./infoInput/infoInput"
import InfoText from "./infoText/infoText"
import s from './profileBody.module.scss'
import ProfileDataPosts from "./profileDataPosts/profileDataPosts"

type propsType = {
    profile: profileType | null
    isOwner: boolean | null
}

const ProfileBody: React.FC<propsType> = ({profile, isOwner}) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedProfile, setUpdatedProfile] = useState(false)
    const isMobileScreen = useSelector(getIsMobileScreenSelector)

    return(
        <div className={isMobileScreen ? s.profile__body_mobile : s.profile__body}>
            <div className={s.info}>
                {editMode
                    ? <InfoInput updatedProfile={updatedProfile} editMode={editMode} isOwner={isOwner}
                                 setUpdatedProfile={setUpdatedProfile} profile={profile}
                                setEditMode={setEditMode}/>
                    : <InfoText isOwner={isOwner} profile={profile} setEditMode={setEditMode}
                        updatedProfile={updatedProfile} setUpdatedProfile={setUpdatedProfile}/>
                }
            </div>
            {isOwner
                ? <>
                    <div className={isMobileScreen ? s.profile__posts_wrapper_mobile : s.profile__posts_wrapper}>
                        <span>Posts Area</span>
                    </div>
                    <ProfileDataPosts/>
                </>
                : false
            }
        </div>
    )
}

export default ProfileBody