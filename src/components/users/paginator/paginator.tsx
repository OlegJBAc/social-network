import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v1 } from "uuid"
import { getCurrentPageSelector, getPageSizeSelector, getTotalUsersCountSelector } from "../../../redux/selectors"
import { getUsersTC } from "../../../redux/users-reducer"
import s from './paginator.module.scss'


const Paginator: React.FC = () => {
    const dispatch = useDispatch()
    let totalUsersCount = useSelector(getTotalUsersCountSelector)
    let pageSize = useSelector(getPageSizeSelector)
    let currentPage = useSelector(getCurrentPageSelector)
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

    return(
        <div className={s.paginator}>
            <div className={s.pages}>
                <button onClick={currentPortion > 0 
                                    ? () => setCurrentPortion((currentPortion) => currentPortion - 1) 
                                    : () => setCurrentPortion((currentPortion) => currentPortion)}>
                    <span>Prev</span>
                </button>
                {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return(
                        <button className={page === currentPage ? s.pages__current : s.pages__item} 
                                onClick={() => changePage(page)} key={v1()}>
                            {page}
                        </button>
                )})}
                <button onClick={currentPortion < countPortions 
                                    ? () => setCurrentPortion((currentPortion) => currentPortion + 1) 
                                    : () => setCurrentPortion((currentPortion) => currentPortion)}>
                    <span>Next</span>
                </button>
            </div>
        </div>
    )
}


export default Paginator