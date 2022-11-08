import { Field, Form, Formik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { maxLengthVC } from "../../commons/validators/validators"
import { logInTC } from "../../redux/auth-reducer"
import { getIsAuthSelector } from "../../redux/selectors"
import s from './login.module.scss'


const Login = () => {
    const dispatch = useDispatch()
    const submit = (values: any, setSubmitting: any) => {
        // @ts-ignore
        dispatch(logInTC(values.email, values.password, values.rememberMe, null))
        setSubmitting(false)
    }
    let maxLength30 = maxLengthVC(30)
    let isAuth = useSelector(getIsAuthSelector)
    if(isAuth){
        return <Navigate to='/Profile'/>
    }
    return(
        <div className={s.container}>
            <div className={s.login}>
                <Formik initialValues={{email: '', password: '', rememberMe: false}} onSubmit={submit}>
                {({errors, touched, isValidating, isSubmitting}) => (
                    <Form>
                        <div className={errors.email && touched.email ? s.login__email_error : s.login__email}>
                            <Field type='email' name='email' validate={maxLength30}/>
                            {errors.email && touched.email
                                ? <span>{errors.email}</span>
                                : false
                            }
                        </div>
                        <div className={errors.password && touched.password ? s.login__password_error : s.login__password}>
                            <Field type='password' name='password' validate={maxLength30}/>
                            {errors.password && touched.password
                                ? <span>{errors.password}</span>
                                : false
                            }
                        </div>
                        <div className={s.login__rememberMe}>
                            <Field type='checkbox' name='rememberMe'/>
                        </div>
                        <button type="submit" disabled={isSubmitting}>LogIn</button>
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