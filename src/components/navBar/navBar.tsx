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


const NavBar: React.FC = () => {
    const isMobileScreen = useSelector(getIsMobileScreenSelector)
    const navElems = ['Profile', 'Dialogs', 'Users', 'Chat']
    
    return(
        <div className={ isMobileScreen ? s.navBar__mobile : s.navBar}>
            <ul>
                { navElems.map(elem => {
                    return (
                        <NavLink to={`/${elem.toLowerCase()}`}>
                            <li>
                                <img src={profile_logo}/>
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