import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { getIsMobileScreenSelector } from "../../redux/selectors"
import Header from "../header/header"
import NavBar from "../navBar/navBar"
import s from './mainLayout.module.scss'


const MainLayout = () => {
    const isMobileScreen = useSelector(getIsMobileScreenSelector)

    return (
        <main className={s.app}>
            <Header/>
            {isMobileScreen
                ? <div className={s.container__mobile}>
                    <NavBar/>
                    <Outlet/>
                </div>
                : <div className={s.container}>
                    <NavBar/>
                    <Outlet/>
                </div>
            }
        </main>
    )
}


export default MainLayout