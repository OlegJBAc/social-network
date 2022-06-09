import React from "react"
import { NavLink } from "react-router-dom"
import s from './navBar.module.scss'
import './activeLinkStyles.scss'

const NavBar: React.FC = () => {
    return(
        <div className={s.navBar}>
            <ul>
            <NavLink to={'/profile'}><li>Profile</li></NavLink>
            <NavLink to={'/dialogs'}><li>Dialogs</li></NavLink>
            <NavLink to={'/users'}><li>Users</li></NavLink>
            <NavLink to={'/chat'}><li>Chat</li></NavLink>
            </ul>
        </div>
    )
}

export default NavBar