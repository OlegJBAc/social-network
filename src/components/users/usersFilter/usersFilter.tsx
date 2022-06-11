import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { filterType, getUsersTC } from "../../../redux/users-reducer"
import s from './usersFilter.module.scss'



const UsersFilter = () => {
    const dispatch = useDispatch()
    const submit = (values: filterType, { setSubmitting }: any) => {
        // @ts-ignore
        dispatch(getUsersTC(100, 1, values))
        setSubmitting(false);
    }
    return(
        <div className={s.filter}>
            <Formik initialValues={{term: '', friend: 'null'}} onSubmit={submit}>
            {({ isSubmitting }) => (
                <Form>
                    <Field className={s.filter__term} type='text' name='term'/>
                    <div className={s.filter__selectWrap}>
                        <Field className={s.filter__select} as='select' name='friend'>
                            <option value={'true'}><div><span>friend</span></div></option>
                            <option value={'false'}>not friend</option>
                            <option value={'null'}>all</option>
                        </Field>
                        <span className={s.filter__arrow}></span>
                    </div>
                    <button className={s.filter__button} type="submit" disabled={isSubmitting}>Find</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default UsersFilter