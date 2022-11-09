import React, { FC } from "react"
import './layout.scss'
import cn from 'classnames'
import { getAppTheme } from "../../redux/selectors"
import { useSelector } from "react-redux"


const Layout: FC<propsType> = ({ children }) => {
    const appTheme = useSelector(getAppTheme) 
    return (
        <div className={cn("layout", {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            { children }
        </div>
    )
}


export default Layout


interface propsType {
    children: any
}