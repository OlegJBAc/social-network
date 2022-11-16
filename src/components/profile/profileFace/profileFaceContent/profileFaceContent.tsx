import React from "react"
import s from './profileFaceContent.module.scss'
import user_main from '../../../../commons/imgs/users/user_main.webp'
import { updateProfilePhotoTC } from "../../../../redux/profile-reducer"
import { Link,  } from "react-router-dom"
import { getAppTheme, getIsMobileScreenSelector } from "../../../../redux/selectors"
import cnBind from 'classnames/bind'
import { useAppDispatch, useAppSelector } from "../../../../commons/hooks/hooks"
import { profileType } from "../../../../types/types"


const ProfileFaceContent: React.FC<propsType> = ({ profile, isOwner, currentUserId }) => {
    const dispatch = useAppDispatch()

    const isMobileScreen = useAppSelector(getIsMobileScreenSelector)
    const appTheme = useAppSelector(getAppTheme)

    const cx = cnBind.bind(s)

    const updatePhoto = (e: any) => {
        dispatch(updateProfilePhotoTC(e.target.files[0]))
    }
    
    return (
        <>
            <div className={s.avatar}>
                <img src={profile?.photos.large ? profile?.photos.large : user_main}/>
            </div>
            <div className={s.content}>
                {isOwner
                    ? <>
                        { isMobileScreen &&
                            <div className={s.userName}>
                                <span>{ profile?.fullName }</span>
                            </div> }
                            <div className={s.loadPhoto}>
                                <input id='loadPhoto__input' onChange={updatePhoto} type="file" accept="image/*"/>
                                <label htmlFor='loadPhoto__input'>Choose a photo</label>
                            </div>
                    </> 
                    : <>
                        { isMobileScreen && 
                            <div className={s.userName}>
                                <span>{ profile?.fullName }</span>
                            </div>  }
                            <Link to={`/dialogs/id=${currentUserId}`}>
                                <div className={cx(`sendMessage`, {
                                    light: appTheme === 'Light',
                                    dark: appTheme === 'Dark',
                                })}>
                                    <span>SendMessage</span>
                                </div>
                            </Link>
                    </>
                }
            </div>
            
        </>
    )
}

export default ProfileFaceContent


type propsType = {
    profile: profileType | null
    isOwner: boolean | null
    currentUserId: number | null
}