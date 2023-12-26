import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_TOY_FILTER_BY, SET_TOY_SORT_BY, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export function queryToys() {
    const toyFilterBy = store.getState().toyModule.toyFilterBy
    const toySortBy = store.getState().toyModule.toySortBy
    return toyService.query(toyFilterBy, toySortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
}

export function updateToy(updatedToy) {
    return toyService.save(updatedToy)
        .then(toy => {
            store.dispatch({ type: UPDATE_TOY, toy })
        })
}

export function removeToy(toy) {
    return toyService.remove(toy)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toy })
        })
}

export function addToy(newToy) {
    return toyService.save(newToy)
        .then(toy => {
            store.dispatch({ type: ADD_TOY, toy })
        })
}

export function setToyFilterBy(toyFilterBy) {
    store.dispatch({ type: SET_TOY_FILTER_BY, toyFilterBy })
}

export function setToySortBy(toySortBy) {
    store.dispatch({ type: SET_TOY_SORT_BY, toySortBy })
}