import React, { useEffect } from 'react'
import s from './app.module.scss'
import { connect, useDispatch } from 'react-redux'
import Header from './header/header'
import NavBar from './navBar/navBar'
import Profile from './profile/profile'

type propsType = {
  messages: any

}

const App: React.FC<propsType> = ({messages}) => {
  let dispatch = useDispatch()
  return (
    <div className={s.app}>
      <Header/>
        <div className={s.container}>
          <NavBar/>
          <Profile/>
        </div>
    </div>
  )
}

let mapStateToProps = (state: any) => {
  return {
    messages: state.profile.myMessage
  }
}

export default connect(mapStateToProps, {})(App);
