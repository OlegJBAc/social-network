import React from "react"
import s from './header.module.scss'
import logo from './../../logo.jpg'
import { useDispatch, useSelector } from "react-redux"
import { getIsAuthSelector, getLoginSelector } from "../../redux/selectors"
import { logOutTC } from "../../redux/auth-reducer"


const Header: React.FC = () => {
    const dispatch = useDispatch()
    const login = useSelector(getLoginSelector)
    const isAuth = useSelector(getIsAuthSelector)
    return(
        <div className={s.header}>
            <div className={s.header__content}>
                <img src={logo} alt='logo'/>
                <div className={s.header__login}>
                    {isAuth
                        ? <div className={s.header__authorized}> 
                            <span>{login}</span>
                            {/* @ts-ignore */}
                            <button onClick={() => dispatch(logOutTC())}>Logout</button>
                        </div>
                        : <div className={s.header__notauthorized}>
                            <span>Please LogIn</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header