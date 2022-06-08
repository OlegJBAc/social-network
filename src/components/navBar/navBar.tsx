import React from "react"
import { NavLink } from "react-router-dom"
import s from './navBar.module.scss'
import './activeLinkStyles.scss'

const NavBar: React.FC = () => {
    return(
        <div className={s.navBar}>
            <ul>
                <li><NavLink to={'/profile'}>Profile</NavLink></li>
                <li><NavLink to={'/dialogs'}>Dialogs</NavLink></li>
                <li><NavLink to={'/users'}>Users</NavLink></li>
                <li><NavLink to={'/chat'}>Chat</NavLink></li>
            </ul>
        </div>
    )
}

export default NavBar