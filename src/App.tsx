import React, { useEffect } from 'react'
import s from './app.module.scss'
import { connect, useDispatch, useSelector } from 'react-redux'
import Header from './components/header/header'
import NavBar from './components/navBar/navBar'
import Profile from './components/profile/profile'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dialogs from './components/dialogs/dialogs'
import Users from './components/users/users'
import { getAuthDataTC } from './redux/auth-reducer'
import Login from './components/login/login'
import Chat from './components/chat/chat'
import { getAppInitializedSelector } from './redux/selectors'
import { actions } from './redux/app-reducer'
import MainLayout from './components/mainLayout/mainLayout'


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
      {appInitialized
        ? <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route path={'/'} element={<Navigate to={'/profile'}/> }/>
              {/* @ts-ignore */}
              <Route path='/profile' element={<Profile/>}>
                <Route path=':id' element={<Profile/>}/>
              </Route>
              <Route path='/dialogs' element={<Dialogs/>}>
                <Route path=':id' element={<Dialogs/>}/>
              </Route>
              <Route path='/users' element={<Users/>}/>
              <Route path='/chat' element={<Chat/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        : <></>
      }
    </HashRouter>
  )
}

let mapStateToProps = (state: any) => {
  return {
    messages: state.profile.myMessage
  }
}

export default connect(mapStateToProps, {})(App);
