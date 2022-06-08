import React, { useState } from "react"
import { profileType } from "../../../types/types"
import InfoInput from "./infoInput/infoInput"
import InfoText from "./infoText/infoText"
import s from './profileBody.module.scss'

type propsType = {
    profile: profileType | null
    isOwner: boolean | null
}

const ProfileBody: React.FC<propsType> = ({profile, isOwner}) => {
    const [editMode, setEditMode] = useState(false)
    return(
        <div className={s.profile__body}>
            <div className={s.info}>
                {editMode
                    ? <InfoInput profile={profile} setEditMode={setEditMode}/>
                    : <InfoText isOwner={isOwner} profile={profile} setEditMode={setEditMode}/>
                }
            </div>
        </div>
    )
}

export default ProfileBody