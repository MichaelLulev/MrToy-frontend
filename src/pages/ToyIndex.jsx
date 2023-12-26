import { useEffect } from "react"
import { ToyList } from "../cmps/ToyList"
import { queryToys } from "../store/actions/toy.actions"
import { setErrorMessageText } from "../store/actions/app.actions"


export function ToyIndex() {

    useEffect(() => {
        queryToys()
            .then(toys => console.log(toys))
            .catch(err => setErrorMessageText(err))
    }, [])

    return (
        <>
            <h2>Toy Index</h2>
            <ToyList />
        </>
    )
}