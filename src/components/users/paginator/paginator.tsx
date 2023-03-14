import React, { useState } from "react"
import { v1 } from "uuid"
import { useAppDispatch, useAppSelector } from "../../../commons/hooks/hooks"
import { getCurrentPageSelector, getPageSizeSelector, getTotalUsersCountSelector } from "../../../redux/selectors"
import { getUsersTC } from "../../../redux/users-reducer"
import s from './paginator.module.scss'
import cnBind from "classnames/bind";


const Paginator: React.FC = () => {
    const dispatch = useAppDispatch()
    let totalUsersCount = useAppSelector(getTotalUsersCountSelector)
    let pageSize = useAppSelector(getPageSizeSelector)
    let currentPage = useAppSelector(getCurrentPageSelector)
    
    const changePage = (page: number) => {
        // @ts-ignore
        dispatch(getUsersTC(pageSize, page))
    }
    let countPages = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = 1; i <= countPages; i++) {
        pages.push(i)
    }
    let portionSize = 10
    let countPortions = Math.ceil(countPages / portionSize)
    const [currentPortion, setCurrentPortion] = useState(0)
    let leftPortionPageNumber = (currentPortion + 1) * portionSize - 10
    let rightPortionPageNumber = leftPortionPageNumber + portionSize

    const cx = cnBind.bind(s)


    return(
        <div className={s.paginator}>
            <div className={s.pages}>
                <button className={s['pages-button__prev']}
                        onClick={currentPortion > 0
                                    ? () => setCurrentPortion((currentPortion) => currentPortion - 1) 
                                    : () => setCurrentPortion((currentPortion) => currentPortion)}>
                    <span>Prev</span>
                </button>
                {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return(
                        <button className={cx('pages-button', {
                            current: page === currentPage,
                        })}
                                onClick={() => changePage(page)} key={v1()}>
                            {page}
                        </button>
                )})}
                <button className={s['pages-button__next']}
                        onClick={currentPortion < countPortions
                                    ? () => setCurrentPortion((currentPortion) => currentPortion + 1) 
                                    : () => setCurrentPortion((currentPortion) => currentPortion)}
                >
                    <span>Next</span>
                </button>
            </div>
        </div>
    )
}


export default Paginator