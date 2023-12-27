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

export function addToy(newToy) {
    return toyService.save(newToy)
        .then(() => queryToys())
}

export function updateToy(updatedToy) {
    return toyService.save(updatedToy)
        .then(() => queryToys())
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => queryToys())
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