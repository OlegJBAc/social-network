import React, { useState } from "react"
import InfoInput from "./infoInput/infoInput"
import InfoText from "./infoText/infoText"
import s from './profileBody.module.scss'


const ProfileBody = () => {
    const [editMode, setEditMode] = useState(false)
    return(
        <div className={s.profile__body}>
            <div className={s.info}>
                {editMode
                    ? <InfoInput setEditMode={setEditMode}/>
                    : <InfoText setEditMode={setEditMode}/>
                }
            </div>
        </div>
    )
}

export default ProfileBody