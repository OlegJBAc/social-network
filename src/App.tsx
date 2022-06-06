import React, { useEffect } from 'react'
import s from './app.module.scss'
import { connect, useDispatch } from 'react-redux'
import Header from './components/header/header'
import NavBar from './components/navBar/navBar'
import Profile from './components/profile/profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
    <BrowserRouter>
      <main className={s.app}>
        <Header/>
          <div className={s.container}>
            <NavBar/>
            <Routes>
              {/* @ts-ignore */}
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/dialogs' element={<Dialogs/>}/>
              <Route path='/users' element={<Users/>}/>
              <Route path='/chat' element={<Chat/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          </div>
      </main>
    </BrowserRouter>
  )
}

let mapStateToProps = (state: any) => {
  return {
    messages: state.profile.myMessage
  }
}

export default connect(mapStateToProps, {})(App);
