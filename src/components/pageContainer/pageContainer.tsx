import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Chat from '../chat/chat'
import Dialogs from '../dialogs/dialogs'
import Profile from '../profile/profile'
import Users from '../users/users'
import s from './pageContainer.module.scss'


const PageContainer: React.FC<propsType> = () => {

    console.log('from PAGE CONTAINER')

    return(
        <div className={s.page}>
            <Routes>
                <Route path='/profile' element={<Profile/>}>
                  <Route path=':id' element={<Profile/>}/>
                </Route>
                <Route path='/dialogs' element={<Dialogs/>}>
                  <Route path=':id' element={<Dialogs/>}/>
                </Route>
                <Route path='/users' element={<Users/>}/>
                <Route path='/chat' element={<Chat/>}/>
            </Routes>
        </div>
    )
}


export default PageContainer


interface propsType {

}