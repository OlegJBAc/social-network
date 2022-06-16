import { Formik, Form, Field } from "formik"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLikedPostsSelector, getPostsProfileSelector, getProfileSelector } from "../../../../redux/selectors"
import styles from './profileDataPosts.module.scss'
import { actions } from "../../../../redux/profile-reducer"
import user_small from '../../../../commons/imgs/users/user_main.webp'


const ProfileDataPostItem: React.FC<any> = React.memo(({post, index}) => {
    // let posts = useSelector(getPostsProfileSelector)
    let profile = useSelector(getProfileSelector)
    let likedPosts = useSelector(getLikedPostsSelector)
    let [wasLiked, setWasLiked] = useState(false)
    console.log(wasLiked)
    const dispatch = useDispatch()
    if(likedPosts.includes(post)){
        setWasLiked(true)
    }
    return <>
            <li className={styles.profile__postsPhoto}>
                <img src={profile?.photos.small ? profile?.photos.small : user_small}/>
                <span>{profile?.fullName ? profile.fullName : 'Name'}</span>
            </li>
            <li className={styles.profile__postsPost}>
                <span>{post.post}</span>
            </li>
            <li className={wasLiked ? styles.profile__postsLike : styles.profile__postsUnlike}>
                <button onClick={() => {
                        dispatch(actions.addPostLike(post.id))
                        dispatch(actions.addLikedPost(post.id))
                        setWasLiked(true)
                    }
                }>
                    {wasLiked ? 'kok ' + post.likeCount : '🤍 ' + post.likeCount}
                </button>
            </li>
    </>
})

export default ProfileDataPostItem