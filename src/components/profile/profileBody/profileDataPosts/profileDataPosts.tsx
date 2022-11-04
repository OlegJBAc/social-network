import { Formik, Form, Field } from "formik"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLikedPostsSelector, getPostsProfileSelector, getProfileSelector } from "../../../../redux/selectors"
import styles from './profileDataPosts.module.scss'
import { actions } from "../../../../redux/profile-reducer"
import user_small from '../../../../commons/imgs/users/user_main.webp'
import ProfileDataPostItem from "./ProfileDataPostItem"

const ProfileDataPosts: React.FC = React.memo(() => {
    let posts = useSelector(getPostsProfileSelector)
    const myTextareaRef: any = useRef('')
    const dispatch = useDispatch()

    // useEffect(() => {
    //     function OnInput(){
    //         //@ts-ignore
    //         this.style.height = 'auto'
    //         //@ts-ignore
    //         this.style.height = (this.scrollHeight) + 'px'
    //     }
    //     debugger
    //     for (let i = 0; i < 1; i++) {
    //         myTextareaRef.current.setAttribute('style', 'height:')
    //         myTextareaRef.current.addEventListener("input", OnInput, false)
    //     }
    //     return () => {
    //         if(myTextareaRef.current){
    //             myTextareaRef.current.removeEventListener("input", OnInput, false)
    //         }
    //     }
    // }, [])

    const submit = (values: {fieldPosts: string}, { setSubmitting }: any) => {
        if(values.fieldPosts !== ''){
            dispatch(actions.addMessage({post: values.fieldPosts, id: posts.length + 1, likeCount: 0}))
            values.fieldPosts = ''
            setSubmitting(false)
        }
        setSubmitting(false)
    }
    return <div className={styles.profile__posts}>
        <Formik initialValues={{fieldPosts: ''}}
                onSubmit={submit}>
        {({ isSubmitting }) => (
            <Form className={styles.profile__textarea}>
            <Field type="text" component='textarea' name="fieldPosts"
            placeholder={'Enter your post...'}/>
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