import { useEffect } from "react"
import { useSelector } from "react-redux"

import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToySort } from "../cmps/ToySort.jsx"
import { ToyPage } from "../cmps/ToyPage.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { queryToys } from "../store/actions/toy.actions.js"
import { setErrorMessageText } from "../store/actions/app.actions.js"


export function ToyIndex() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const pageInfo = useSelector(state => state.toyModule.pageInfo)

    useEffect(() => {
        queryToys()
            .catch(err => setErrorMessageText(err))
    }, [filterBy, sortBy, pageInfo])

    return (
        <>
            <h2>Toy Index</h2>
            <ToyFilter />
            <ToySort />
            <ToyPage />
            <ToyList />
        </>
    )
}