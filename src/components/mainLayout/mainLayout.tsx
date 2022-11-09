import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { getAppTheme, getIsMobileScreenSelector } from "../../redux/selectors"
import Header from "../header/header"
import NavBar from "../navBar/navBar"
import s from './mainLayout.module.scss'
import cnBind from 'classnames/bind'


const MainLayout = () => {
    const isMobileScreen = useSelector(getIsMobileScreenSelector)
    const appTheme = useSelector(getAppTheme)
    const cx = cnBind.bind(s)

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