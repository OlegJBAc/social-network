import React from "react"
import s from './header.module.scss'
import logo from '../../commons/imgs/common/logo.jpg'
import { useDispatch, useSelector } from "react-redux"
import { getAppTheme, getIsAuthSelector, getLoginSelector } from "../../redux/selectors"
import { logOutTC } from "../../redux/auth-reducer"
import cnBind from 'classnames/bind'
import { actions } from "../../redux/app-reducer"
import cn from "classnames";

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const login = useSelector(getLoginSelector)
    const isAuth = useSelector(getIsAuthSelector)
    const appTheme = useSelector(getAppTheme)
    const cx = cnBind.bind(s)

    const changeTheme = () => {
        dispatch(actions.setTheme(appTheme === 'Light' ? 'Dark' : 'Light'))
    }

    // @ts-ignore
    return(
        <div className={cx("header", {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <div className={s.header__content}>
                <img src={logo} alt='logo'/>
                <button className={cx('theme__toggle', {
                        light: appTheme === 'Light',
                        dark: appTheme === 'Dark',
                })} id={s.theme__toggle} onClick={changeTheme}
                    title={'Change theme'}>
            </button>
                <div className={s.header__login}>
                    {isAuth
                        ? <div className={s.header__authorized}>
                            <span>{login}</span>
                            {/* @ts-ignore*/}
                            <button onClick={() => dispatch(logOutTC())}
                                    className={cn('auth-button', {
                                        custom: true,
                                        changes: true,
                                    })}
                                    id={s['auth-button']}
                            >
                                <span>Logout</span>
                            </button>
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