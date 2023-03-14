import React, { useEffect } from 'react'
import style from './app.module.scss'
import {connect, useSelector} from 'react-redux'
import {HashRouter, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import { getAuthDataTC } from './redux/auth-reducer'
import Login from './components/login/login'
import {getAppInitializedSelector, getIsAuthSelector} from './redux/selectors'
import { actions } from './redux/app-reducer'
import MainLayout from './components/mainLayout/mainLayout'
import Layout from './components/layout/layout'
import PageContainer from './components/pageContainer/pageContainer'
import { useAppDispatch, useAppSelector } from './commons/hooks/hooks'



const App: React.FC = () => {
    let appInitialized = useAppSelector(getAppInitializedSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const localStorageTheme = localStorage.getItem('theme') as 'Light' | 'Dark' | undefined
        if( !localStorageTheme ) {
            localStorage.setItem('theme', 'Dark')
            dispatch(actions.setTheme('Dark'))
        }else{
            dispatch(actions.setTheme( localStorageTheme ))
        }
        // @ts-ignore
        dispatch(getAuthDataTC()).then(result => {
            if ( result ) {
                dispatch(actions.setAppInitialized(true))
            }
        })
    }, [])

    if ( !appInitialized ) {
        return (
            <div className={style.loader}>
                <span>Loading...</span>
            </div>
        )
    }

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path='/*' element={<PageContainer />}/>
                </Route>
                <Route path='login' element={<Login/>}/>
            </Routes>
        </Layout>
    )
}


export default App