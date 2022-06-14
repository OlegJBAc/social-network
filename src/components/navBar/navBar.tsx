import React from "react"
import { NavLink } from "react-router-dom"
import s from './navBar.module.scss'
import './activeLinkStyles.scss'
import profile_logo from '../../profile_logo.png'
import dialogs_logo from '../../dialogs_logo.png'
import users_logo from '../../users_logo.png'
import chat_logo from '../../chat_logo.webp'


const NavBar: React.FC = () => {
    return(
        <div className={s.navBar}>
            <ul>
                <NavLink to={'/profile'}>
                    <li>
                        <img src={profile_logo}/>
                        <span>Profile</span>
                    </li>
                </NavLink>
                <NavLink to={'/dialogs'}>
                    <li>
                        <img src={dialogs_logo}/>
                        <span>Dialogs</span>
                    </li>
                </NavLink>
                <NavLink to={'/users'}>
                    <li>
                        <img src={users_logo}/>
                        <span>Users</span>
                    </li>
                </NavLink>
                <NavLink to={'/chat'}>
                    <li>
                        <img src={chat_logo}/>
                        <span>Chat</span>
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default NavBar