import { Field, Form, Formik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { maxLengthVC } from "../../commons/validators/validators"
import { logInTC } from "../../redux/auth-reducer"
import { getAppTheme, getIsAuthSelector } from "../../redux/selectors"
import s from './login.module.scss'
import cnBind from 'classnames/bind'
import cn from "classnames";


const Login = () => {
    const dispatch = useDispatch()
    const appTheme = useSelector(getAppTheme)
    let isAuth = useSelector(getIsAuthSelector)

    const cx = cnBind.bind(s)

    const submit = (values: any, setSubmitting: any) => {
        // @ts-ignore
        dispatch(logInTC(values.email, values.password, values.rememberMe, null))
        setSubmitting(false)
    }

    let maxLength30 = maxLengthVC(30)

    if ( isAuth ){
        return <Navigate to='/Profile'/>
    }
    return(
        <div className={cx('container', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <div className={cx('login', {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })}>
                <Formik initialValues={{email: '', password: '', rememberMe: false}} onSubmit={submit}>
                {({errors, touched, isValidating, isSubmitting}) => (
                    <Form>
                        <div className={cx('login__email', {
                            error: errors.email && touched.email,
                        })}>
                            <Field type='email' name='email' validate={maxLength30}/>
                            { errors.email && touched.email
                                ? <span>{errors.email}</span>
                                : false
                            }
                        </div>
                        <div className={cx('login__password', {
                            error: errors.password && touched.password,
                        })}>
                            <Field type='password' name='password' validate={maxLength30}/>
                            {errors.password && touched.password
                                ? <span>{errors.password}</span>
                                : false
                            }
                        </div>
                        <div className={s.login__rememberMe}>
                            <Field type='checkbox' name='rememberMe'/>
                            <span>Remember me</span>
                        </div>
                        <button className={cn('auth-button', {
                            custom: true,
                        })} type="submit" disabled={isSubmitting}>
                            <span>Log In</span>
                        </button>

                        {/* @ts-ignore */}
                        {/* <button type='button' onClick={() => console.log(errors, touched, isValidating)}>Click</button> */}
                    </Form>
                )}
                </Formik>
            </div>
        </div>
    )
}

export default Login