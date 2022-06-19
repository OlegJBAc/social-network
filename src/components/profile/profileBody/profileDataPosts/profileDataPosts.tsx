import { Formik, Form, Field } from "formik"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLikedPostsSelector, getPostsProfileSelector, getProfileSelector } from "../../../../redux/selectors"
import styles from './profileDataPosts.module.scss'
import { actions } from "../../../../redux/profile-reducer"
import user_small from '../../../../commons/imgs/users/user_main.webp'
import ProfileDataPostItem from "./ProfileDataPostItem"

const ProfileDataPosts: React.FC = React.memo(() => {
    let posts = useSelector(getPostsProfileSelector)
    let profile = useSelector(getProfileSelector)
    let likedPosts = useSelector(getLikedPostsSelector)
    const dispatch = useDispatch()

    return <div className={styles.profile__posts}>
        <Formik initialValues={{fieldPosts: ''}}
        onSubmit={(values: {fieldPosts: string}, { setSubmitting }) => {
            if(values.fieldPosts !== ''){
                dispatch(actions.addMessage({post: values.fieldPosts, id: posts.length + 1, likeCount: 0}))
                values.fieldPosts = ''
                setSubmitting(false)
            }
            setSubmitting(false)
        }}>
        {({ isSubmitting }) => (
            <Form className={styles.profile__textarea}>
            <Field type="text" component='textarea' name="fieldPosts" />
            <button type="submit" disabled={isSubmitting}>
                Send
            </button>
            </Form>
        )}
        </Formik>
        <div className={styles.profile__posts}>
            <ul>
            {posts.map((post, index) => {
                    return <ProfileDataPostItem key={post.post + index} post={post} index={index}/>
                })
            }
            </ul>
        </div>
    </div>
})

export default ProfileDataPosts