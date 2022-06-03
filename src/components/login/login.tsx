import { Field, Form, Formik } from "formik"
import React from "react"
import { useDispatch } from "react-redux"
import { logInTC } from "../../redux/auth-reducer"
import s from './login.module.scss'


const Login = () => {
    const dispatch = useDispatch()
    const submit = (values: any, setSubmitting: any) => {
        // @ts-ignore
        dispatch(logInTC(values.email, values.password, values.rememberMe, null))
    }
    return(
        <div className={s.login}>
            <Formik initialValues={{email: '', password: '', rememberMe: false}} onSubmit={submit}>
            {({isSubmitting}) => (
                <Form>
                    <div className={s.login__email}>
                        <Field type='email' name='email'/>
                    </div>
                    <div className={s.login__password}>
                        <Field type='password' name='password'/>
                    </div>
                    <div className={s.login__rememberMe}>
                        <Field type='checkbox' name='rememberMe'/>
                    </div>
                    <button type="submit" disabled={isSubmitting}>LogIn</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Login