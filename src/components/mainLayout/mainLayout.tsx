import React from "react"
import { useSelector } from "react-redux"
import {Navigate, Outlet, useLocation} from "react-router-dom"
import {getAppTheme, getIsAuthSelector, getIsMobileScreenSelector} from "../../redux/selectors"
import Header from "../header/header"
import NavBar from "../navBar/navBar"
import s from './mainLayout.module.scss'
import cnBind from 'classnames/bind'


const MainLayout = () => {
    const appTheme = useSelector(getAppTheme)
    let isAuth = useSelector(getIsAuthSelector)

    const location = useLocation()

    const cx = cnBind.bind(s)

    if ( isAuth && location.pathname === '/' ){
        return <Navigate to='/Profile'/>
    }

    return (
        <main className={cx("app", {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <Header/>
            <div className={cx("container", {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })}>
                <NavBar/>
                <Outlet/>
            </div>
        </main>
    )
}


export default MainLayout