import React, { useState } from "react"
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
    return(
        <div className={s.profile__body}>
            <div className={s.info}>
                {editMode
                    ? <InfoInput updatedProfile={updatedProfile} editMode={editMode} isOwner={isOwner}
                                 setUpdatedProfile={setUpdatedProfile} profile={profile}
                                setEditMode={setEditMode}/>
                    : <InfoText isOwner={isOwner} profile={profile} setEditMode={setEditMode}
                        updatedProfile={updatedProfile} setUpdatedProfile={setUpdatedProfile}/>
                }
            </div>
            <ProfileDataPosts/>
        </div>
    )
}

export default ProfileBody