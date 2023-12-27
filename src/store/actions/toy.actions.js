import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_TOY_FILTER_BY, SET_TOY_PAGE_INFO, SET_TOY_SORT_BY, SET_TOY_PAGE, UPDATE_TOY, SET_LABELS } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export function setLabels() {
    return toyService.getLabels()
        .then(labels => {
            store.dispatch({ type: SET_LABELS, labels })
        })
}

export function queryToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    const pageInfo = store.getState().toyModule.pageInfo
    return toyService.query(filterBy, sortBy, pageInfo)
        .then(toyPage => {
            store.dispatch({ type: SET_TOY_PAGE, toyPage })
        })
}

export function addToy(newToy) {
    return toyService.save(newToy)
        .then(toy => {
            return queryToys().then(() => toy)
        })
}

export function updateToy(updatedToy) {
    return toyService.save(updatedToy)
        .then(toy => {
            return queryToys().then(() => toy)
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(toy => {
            return queryToys().then(() => toy)
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