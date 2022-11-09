import React, { useEffect } from 'react'
import s from './app.module.scss'
import { connect, useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getAuthDataTC } from './redux/auth-reducer'
import Login from './components/login/login'
import { getAppInitializedSelector } from './redux/selectors'
import { actions } from './redux/app-reducer'
import MainLayout from './components/mainLayout/mainLayout'
import Layout from './components/layout/layout'
import PageContainer from './components/pageContainer/pageContainer'


type propsType = {

}

const App: React.FC<propsType> = () => {
  const dispatch = useDispatch()
  const appInitialized = useSelector(getAppInitializedSelector)

  useEffect(() => {
    if(!appInitialized){
      window.addEventListener('resize', () => {
        if(window.innerWidth > 768){
          dispatch(actions.setIsMobileScreen(false))
        }else{
          dispatch(actions.setIsMobileScreen(true))
        }
      })
      dispatch(actions.setAppInitialized(true))
    }
  }, [appInitialized])

  useEffect(() => {
    const theme = localStorage.getItem('theme') as 'Dark' | 'Light'
    if(theme !== 'Dark' && theme !== 'Light'){
      dispatch(actions.setTheme(theme))
    }else{
      dispatch(actions.setTheme('Dark'))
      localStorage.setItem('theme', 'Dark')
    }
    if(window.innerWidth > 768){
      dispatch(actions.setIsMobileScreen(false))
    }else{
      dispatch(actions.setIsMobileScreen(true))
    }
    // @ts-ignore
    dispatch(getAuthDataTC())
  }, [])

  return (
    <HashRouter>
      <Layout>
        {appInitialized
          ? <Routes>
              <Route path='/' element={<MainLayout/>}>
                <Route path={'/'} element={<Navigate to={'/profile'}/> }/>
                <Route path='/*' element={<PageContainer />}/>
              </Route>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          : <></>
        }
      </Layout>
    </HashRouter>
  )
}

let mapStateToProps = (state: any) => {
  return {
    messages: state.profile.myMessage
  }
}

export default connect(mapStateToProps, {})(App);
