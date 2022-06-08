import React, { useState } from "react"
import InfoInput from "./infoInput/infoInput"
import InfoText from "./infoText/infoText"
import s from './profileBody.module.scss'


const ProfileBody: React.FC<any> = ({profile}) => {
    const [editMode, setEditMode] = useState(false)
    return(
        <div className={s.profile__body}>
            <div className={s.info}>
                {editMode
                    ? <InfoInput profile={profile} setEditMode={setEditMode}/>
                    : <InfoText profile={profile} setEditMode={setEditMode}/>
                }
            </div>
        </div>
    )
}

export default ProfileBody