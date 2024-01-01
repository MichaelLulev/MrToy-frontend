import { useEffect } from "react"
import { useSelector } from "react-redux"

import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToySort } from "../cmps/ToySort.jsx"
import { ToyPage } from "../cmps/ToyPage.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { queryToys, setLabels } from "../store/actions/toy.actions.js"
import { setErrorMessageText, setTitle } from "../store/actions/app.actions.js"


export function ToyIndex() {
console.log('./src/pages/ToyIndex.jsx')
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const pageInfo = useSelector(state => state.toyModule.pageInfo)

    useEffect(() => setTitle('Toy Catalog'))

    useEffect(() => {
        queryToys()
            .catch(err => setErrorMessageText(err))
        setLabels()
            .catch(err => setErrorMessageText(err))
    }, [filterBy, sortBy, pageInfo])


    return (
        <>
            <section className="filters">
                <ToyFilter />
                <ToySort />
            </section>
            <ToyPage />
            <ToyList />
        </>
    )
}