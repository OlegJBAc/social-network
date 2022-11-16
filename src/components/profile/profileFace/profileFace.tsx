import React from "react"
import s from './profileFace.module.scss'
import { profileType } from "../../../types/types"
import { getAppTheme, getIsMobileScreenSelector, getLoginSelector } from "../../../redux/selectors"
import cnBind from 'classnames/bind'
import { useAppSelector } from "../../../commons/hooks/hooks"
import ProfileFaceContent from "./profileFaceContent/profileFaceContent"


const ProfileFace: React.FC<propsType> = ({ profile, isOwner, currentUserId }) => {
    const isMobileScreen = useAppSelector(getIsMobileScreenSelector)

    const appTheme = useAppSelector(getAppTheme)
    const cx = cnBind.bind(s)
    
    return(
        <div className={cx('profileFace', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            {isMobileScreen
                ? <ProfileFaceContent profile={profile} isOwner={isOwner} currentUserId={currentUserId}/>
                : <ProfileFaceContent profile={profile} isOwner={isOwner} currentUserId={currentUserId}/>
            }
        </div>
    )
}

export default ProfileFace


type propsType = {
    profile: profileType | null
    isOwner: boolean | null
    currentUserId: number | null
}
