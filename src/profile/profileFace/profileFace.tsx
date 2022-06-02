import React from "react"
import s from './profileFace.module.scss'
import user_main from '../../user_main.webp'

const ProfileFace = () => {
    
    return(
        <div className={s.profile__face}>
            <div className={s.avatar}>
                <img src={user_main}/>
            </div>
        </div>
    )
}

export default ProfileFace