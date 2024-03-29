import { Formik, Form, Field } from "formik"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAppTheme, getLikedPostsSelector, getPostsProfileSelector, getProfileSelector } from "../../../../redux/selectors"
import s from './profileDataPosts.module.scss'
import { actions } from "../../../../redux/profile-reducer"
import user_small from '../../../../commons/imgs/users/user_main.webp'
import ProfileDataPostItem from "./ProfileDataPostItem"
import cnBind from 'classnames/bind'


const ProfileDataPosts: React.FC = React.memo(() => {
    let posts = useSelector(getPostsProfileSelector)
    const appTheme = useSelector(getAppTheme)

    const dispatch = useDispatch()

    const cx = cnBind.bind(s)


    const submit = (values: {fieldPosts: string}, { setSubmitting }: any) => {
        if(values.fieldPosts !== ''){
            dispatch(actions.addMessage({post: values.fieldPosts, id: posts.length + 1, likeCount: 0}))
            values.fieldPosts = ''
            setSubmitting(false)
        }
        setSubmitting(false)
    }
    return <div className={cx('profile__posts', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
        <Formik initialValues={{fieldPosts: ''}}
                onSubmit={submit}>
        {({ isSubmitting }) => (
            <Form className={cx('profile__textarea', {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark',
            })}>
            <Field type="text" component='textarea' name="fieldPosts"
            placeholder={'Enter your post...'}/>
            <button type="submit" disabled={isSubmitting}>
                Send
            </button>
            </Form>
        )}
        </Formik>
        <div className={cx('profile__posts', {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark',
        })}>
            <ul>
            { posts.map((post, index) => {
                    return <ProfileDataPostItem key={post.post + index} post={post} index={index}/>
                })
            }
            </ul>
        </div>
    </div>
})

export default ProfileDataPosts