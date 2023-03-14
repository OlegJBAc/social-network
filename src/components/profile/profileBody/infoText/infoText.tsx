import React, { useState } from "react"
import { v1 } from "uuid"
import s from './infoText.module.scss'


const InfoText: React.FC<propsType> = ({setEditMode, profile, isOwner, updatedProfile, setUpdatedProfile}) => {
    const [showContacts, setShowContacts] = useState(isOwner ? false : true)
    let infoHead = Object.keys(profile) as string[]
    let infoContacts = Object.keys(profile.contacts)
    let counter = 0
    return(
        <div className={s.info__text}>
            {infoHead.map(item => {
                if(!['userId', 'contacts', 'photos'].includes(item)){
                    return <div key={v1()} className={s.info__item}>
                            <span className={s.info__key}>{item + ':'}</span>
                            <span className={s.info__value}>
                                {typeof profile[item] === 'boolean'
                                    ? profile[item] ? 'not searching' : 'searching'
                                    : profile[item]
                                }
                            </span>
                        </div>
            }})}
            <div className={s.show__buttonWrap}>
                <button id={s.show__button} type="button"
                        onClick={() => setShowContacts(showContacts ? false : true)}>
                    ShowContacts
                </button>
            </div>
            <div className={showContacts ? s.info__showed : s.info__hidden}>
                {infoContacts.map(contact => {
                    if(profile.contacts[contact] !== null && profile.contacts[contact] !== ''){
                        ++counter
                        return <div key={v1()} className={s.info__item}>
                                <span className={s.info__key}>{contact + ':'}</span>
                                <span className={s.info__value}>{profile.contacts[contact]}</span>
                        </div>
                    }})}
                {counter === 0
                    ? <div className={s.info__zero}>
                            <span>This user didn't give some info about contacts.</span>
                        </div>
                    : false
                }
            </div>
            <div className={s.info__buttonarea}>
                {isOwner
                    ? <button onClick={() => {
                        setEditMode(true)
                        setUpdatedProfile(true)}}>EditMode</button>
                    : false
                }
            </div>
        </div>
    )
}

export default InfoText


type propsType = {
    setEditMode: (editMode: boolean) => void
    profile: any
    isOwner: boolean | null
    updatedProfile: boolean
    setUpdatedProfile: any
}