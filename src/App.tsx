import React, { useEffect } from 'react'
import s from './app.module.scss'
import { connect, useDispatch } from 'react-redux'
import Header from './components/header/header'
import NavBar from './components/navBar/navBar'
import Profile from './components/profile/profile'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dialogs from './components/dialogs/dialogs'
import Users from './components/users/users'
import { getAuthDataTC } from './redux/auth-reducer'
import Login from './components/login/login'
import Chat from './components/chat/chat'

type propsType = {

}

const App: React.FC<propsType> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // @ts-ignore
    dispatch(getAuthDataTC())
  }, [])
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <main className={s.app}>
        <Header/>
          <div className={s.container}>
            <NavBar/>
            <Routes>
              <Route path={'/'} element={ <Navigate to={'/profile'}/> }/>
              {/* @ts-ignore */}
              <Route path='/profile' element={<Profile/>}>
                <Route path=':id' element={<Profile/>}/>
              </Route>
              <Route path='/dialogs' element={<Dialogs/>}>
                <Route path=':id' element={<Dialogs/>}/>
              </Route>
              <Route path='/users' element={<Users/>}/>
              <Route path='/chat' element={<Chat/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          </div>
      </main>
    </HashRouter>
  )
}

let mapStateToProps = (state: any) => {
  return {
    messages: state.profile.myMessage
  }
}

export default connect(mapStateToProps, {})(App);
