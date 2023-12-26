import { useEffect } from "react"
import { ToyList } from "../cmps/ToyList"
import { queryToys } from "../store/actions/toy.actions"
import { setErrorMessageText } from "../store/actions/app.actions"
import { useSelector } from "react-redux"


export function ToyIndex() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)

    useEffect(() => {
        queryToys()
            .catch(err => setErrorMessageText(err))
    }, [filterBy, sortBy])

    return (
        <>
            <h2>Toy Index</h2>
            <ToyList />
        </>
    )
}