import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { getIsAuthSelector } from "../../redux/selectors"


const authRedirectHoc = (Component: any) => {
    const HocRedirect = () => {
        const isAuth = useSelector(getIsAuthSelector)
        return(
            <>
                {isAuth
                    ? <Component/>
                    : <Navigate to={'/login'}/>
                }
            </>
        )
    }
    return HocRedirect
}


export default authRedirectHoc