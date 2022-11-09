import React, { useState } from "react"
import { useSelector } from "react-redux"
import { getAppTheme, getIsMobileScreenSelector } from "../../../redux/selectors"
import { profileType } from "../../../types/types"
import InfoInput from "./infoInput/infoInput"
import InfoText from "./infoText/infoText"
import s from './profileBody.module.scss'
import ProfileDataPosts from "./profileDataPosts/profileDataPosts"
import cnBind from 'classnames/bind'


type propsType = {
    profile: profileType | null
    isOwner: boolean | null
}

const ProfileBody: React.FC<propsType> = ({profile, isOwner}) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedProfile, setUpdatedProfile] = useState(false)
    const isMobileScreen = useSelector(getIsMobileScreenSelector)
    const appTheme = useSelector(getAppTheme)
    const cx = cnBind.bind(s)

    return(
        <div className={cx(`${isMobileScreen ? s.profile__body_mobile : s.profile__body}`, {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
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
                    <div className={cx(`${isMobileScreen ? s.profile__posts_wrapper_mobile : s.profile__posts_wrapper}`, {
                        light: appTheme === 'Light',
                        dark: appTheme === 'Dark',
                    })}>
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