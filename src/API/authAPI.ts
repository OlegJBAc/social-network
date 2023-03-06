import { instance } from "./API"

export const authAPI = {
    me(){
        return instance.get('/auth/me')
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string=null){
        return instance.post('/auth/login', {email, password, rememberMe, captcha})
    },
    logout(){
        return instance.delete('/auth/login')
    }
}

// okarakulinjb@mail.ru
// qwerty