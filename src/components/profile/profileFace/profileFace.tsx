import React from "react"
import s from './profileFace.module.scss'
import user_main from '../../../commons/imgs/users/user_main.webp'
import { useDispatch, useSelector } from "react-redux"
import { updateProfilePhotoTC } from "../../../redux/profile-reducer"
import { profileType } from "../../../types/types"
import { Link } from "react-router-dom"
import { getAppTheme, getIsMobileScreenSelector, getLoginSelector } from "../../../redux/selectors"
import cnBind from 'classnames/bind'


const ProfileFaceContent: React.FC<propsType> = ({ profile, isOwner, currentUserId }) => {
    const dispatch = useDispatch()
    const updatePhoto = (e: any) => {
        // @ts-ignore
        dispatch(updateProfilePhotoTC(e.target.files[0]))
    }
    const isMobileScreen = useSelector(getIsMobileScreenSelector)
    const login = useSelector(getLoginSelector)

    const appTheme = useSelector(getAppTheme)
    const cx = cnBind.bind(s)

    return (
        <>
            <div className={s.avatar}>
                <img src={profile?.photos.large ? profile?.photos.large : user_main}/>
            </div>
            <div className={s.face__wrapper}>
                {isOwner
                    ? <>
                        { isMobileScreen && 
                        <div className={s.login}>
                            <span>{ login }</span>
                        </div> }
                        <div className={s.input__wrapper}>
                            <input id='input__file' onChange={updatePhoto} type="file" accept="image/*"/>
                            <label htmlFor='input__file'>Choose a photo</label>
                        </div>
                    </> 
                    : <>
                        { isMobileScreen && 
                        <div className={s.login}>
                            <span>{ login }</span>
                        </div>  }
                        <Link to={`/dialogs/id=${currentUserId}`}>
                            <div className={s.profile__dialogs}>
                                <span>SendMessage</span>
                            </div>
                        </Link>
                    </>
                }
            </div>
            
        </>
    )
}

const ProfileFace: React.FC<propsType> = ({ profile, isOwner, currentUserId }) => {
    const isMobileScreen = useSelector(getIsMobileScreenSelector)
    
    const appTheme = useSelector(getAppTheme)
    const cx = cnBind.bind(s)
    
    return(
        <div className={cx(`${isMobileScreen ? s.profile__face_mobile : s.profile__face}`, {
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