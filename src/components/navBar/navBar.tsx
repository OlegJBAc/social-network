import React from "react"
import { NavLink } from "react-router-dom"
import s from './navBar.module.scss'
import './activeLinkStyles.scss'
import profile_logo from '../../commons/imgs/navBar/profile_logo.png'
import dialogs_logo from '../../commons/imgs/navBar/dialogs_logo.png'
import users_logo from '../../commons/imgs/navBar/users_logo.png'
import chat_logo from '../../commons/imgs/navBar/chat_logo.webp'
import { getAppTheme, getIsMobileScreenSelector } from "../../redux/selectors"
import { useSelector } from "react-redux"
import { v4 } from "uuid"
import cnBind from 'classnames/bind'
import { ReactComponent as AvatarSvg } from '../../commons/imgs/navBar/avatar.svg'
import { ReactComponent as DialogsSvg } from '../../commons/imgs/navBar/dialogs.svg'
import { ReactComponent as UsersSvg } from '../../commons/imgs/navBar/users.svg'
import { ReactComponent as ChatSvg } from '../../commons/imgs/navBar/chat.svg'


const NavBar: React.FC = () => {
    const isMobileScreen = useSelector(getIsMobileScreenSelector)
    const navElems = ['Profile', 'Dialogs', 'Users', 'Chat']
    const logosObj = {
        profile: <AvatarSvg/>,
        dialogs: <DialogsSvg/>,
        users: <UsersSvg/>,
        chat: <ChatSvg/>,
    } as any

    const appTheme = useSelector(getAppTheme)
    const cx = cnBind.bind(s)

    return(
        <div className={cx(`${isMobileScreen ? s.navBar__mobile : s.navBar}`, {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <ul>
                { navElems.map(elem => {
                    return (
                        <NavLink key={v4()} to={`/${elem.toLowerCase()}`}>
                            <li className={cx(`${'navItem'}`, {
                                light: appTheme === 'Light',
                                dark: appTheme === 'Dark',
                            })}>
                                {logosObj[elem.toLowerCase()]}
                                <span>{elem}</span>
                            </li>
                        </NavLink>
                    )
                }) }
            </ul>
        </div>
    )
}

export default NavBar