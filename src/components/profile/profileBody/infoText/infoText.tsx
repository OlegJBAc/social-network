import React, { useState } from "react"
import { useSelector } from "react-redux"
import { v1 } from "uuid"
import { getProfileSelector } from "../../../../redux/selectors"
import { profileType } from "../../../../types/types"
import s from './infoText.module.scss'


type propsType = {
    setEditMode: (editMode: boolean) => void
    profile: any
    isOwner: boolean | null
}

const InfoText: React.FC<propsType> = ({setEditMode, profile, isOwner}) => {
    const [showContacts, setShowContacts] = useState(true)
    let infoHead = Object.keys(profile) as string[]
    let infoContacts = Object.keys(profile.contacts)
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
                    return <div key={v1()} className={s.info__item}>
                                <span className={s.info__key}>{contact + ':'}</span>
                                <span className={s.info__value}>{profile.contacts[contact]}</span>
                    </div>
                })}
            </div>
            {isOwner
                ? <button onClick={() => setEditMode(true)}>EditMode</button>
                : false
            }
        </div>
    )
}

export default InfoText