import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_TOY_FILTER_BY, SET_TOY_PAGE_INFO, SET_TOY_SORT_BY, SET_TOY_PAGE, UPDATE_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export function queryToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    const pageInfo = store.getState().toyModule.pageInfo
    return toyService.query(filterBy, sortBy, pageInfo)
        .then(toyPage => {
            store.dispatch({ type: SET_TOY_PAGE, toyPage })
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

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_TOY_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_TOY_SORT_BY, sortBy })
}

export function setPageInfo(pageInfo) {
    store.dispatch({ type: SET_TOY_PAGE_INFO, pageInfo })
}