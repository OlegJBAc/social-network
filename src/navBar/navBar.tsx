import React from "react"
import s from './navBar.module.scss'


const NavBar: React.FC = () => {
    return(
        <div className={s.navBar}>
            <ul>
                <li>Profile</li>
                <li>Dialogs</li>
                <li>Users</li>
            </ul>
        </div>
    )
}

export default NavBar