import React from "react"
import s from './header.module.scss'
import logo from './../logo.svg'



const Header: React.FC = () => {
    return(
        <div className={s.header}>
            <img src={logo} alt='logo'/>
        </div>
    )
}

export default Header