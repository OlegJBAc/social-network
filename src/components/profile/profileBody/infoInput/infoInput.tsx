import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { getMyUserIdSelector, getProfileSelector } from "../../../../redux/selectors"
import s from './infoInput.module.scss'
import { v1 } from "uuid"
import { updateProfileTC } from "../../../../redux/profile-reducer"


type propsType = {
    setEditMode: (editMode: boolean) => void
    profile: any
    isOwner: boolean | null
    editMode: boolean
    updatedProfile: boolean
    setUpdatedProfile: any
}

const InfoInput: React.FC<propsType> = ({setEditMode, profile, isOwner, editMode, 
                                        updatedProfile, setUpdatedProfile}) => {
    const dispatch = useDispatch()
    const [showContacts, setShowContacts] = useState(isOwner && editMode && updatedProfile ? true : false)
    let userId = useSelector(getMyUserIdSelector)
    const infoHeadMapped = Object.keys(profile).map(item => {
        if(!['userId', 'contacts', 'photos'].includes(item)){
            return <div key={v1()} className={s.info__item}>
                        <span className={s.info__key}>{item + ':'}</span>
                        <Field type='text' name={item}/>
                    </div>
        }})
    const infoContactsMapped = Object.keys(profile.contacts).map(contact => {
        return <div key={v1()} className={s.info__item}>
                    <span className={s.info__key}>{contact + ':'}</span>
                    <Field type='text' name={'contacts.' + contact}/>
                </div>
        })
    
    const submit = (values: any, { setSubmitting }: any) => {
        // @ts-ignore
        dispatch(updateProfileTC(values, userId))
        setSubmitting(false)
        setEditMode(false)
        setUpdatedProfile(true)
    }

    return(
        <div className={s.info__input}>
          <Formik initialValues={{...profile}} onSubmit={submit}>
          {({ isSubmitting }) => (
                <Form>
                    {infoHeadMapped}
                    <div className={s.show__buttonWrap}>
                        <button id={s.show__button} type="button"
                                onClick={() => setShowContacts(showContacts ? false : true)}>
                            ShowContacts
                        </button>
                    </div>
                    <div className={showContacts ? s.info__showed : s.info__hidden}>
                        {infoContactsMapped}
                    </div>
                    <button className={s.info__save} type="submit" disabled={isSubmitting}>SaveInfo</button>
                </Form>
            )}
          </Formik>
        </div>
    )
}

export default InfoInput