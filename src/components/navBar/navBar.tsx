import React from "react"
import { NavLink } from "react-router-dom"
import s from './navBar.module.scss'
import './activeLinkStyles.scss'
import profile_logo from '../../commons/imgs/navBar/profile_logo.png'
import dialogs_logo from '../../commons/imgs/navBar/dialogs_logo.png'
import users_logo from '../../commons/imgs/navBar/users_logo.png'
import chat_logo from '../../commons/imgs/navBar/chat_logo.webp'
import { getIsMobileScreenSelector } from "../../redux/selectors"
import { useSelector } from "react-redux"
import { v4 } from "uuid"

const NavBar: React.FC = () => {
    const isMobileScreen = useSelector(getIsMobileScreenSelector)
    const navElems = ['Profile', 'Dialogs', 'Users', 'Chat']
    const logosObj = {
        profile: profile_logo,
        dialogs: dialogs_logo,
        users: users_logo,
        chat: chat_logo,
    } as any
    
    return(
        <div className={ isMobileScreen ? s.navBar__mobile : s.navBar}>
            <ul>
                { navElems.map(elem => {
                    return (
                        <NavLink key={v4()} to={`/${elem.toLowerCase()}`}>
                            <li>
                                <img src={logosObj[elem.toLowerCase()]}/>
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