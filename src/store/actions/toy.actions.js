import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, REMOVE_TOY, SET_TOY_FILTER_BY, SET_TOY_PAGE_INFO, SET_TOY_SORT_BY, SET_TOY_PAGE, UPDATE_TOY, SET_LABELS } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export async function setLabels() {
    const labels = await toyService.getLabels()
    store.dispatch({ type: SET_LABELS, labels })
}

export async function queryToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    const pageInfo = store.getState().toyModule.pageInfo
    const toyPage = await toyService.query(filterBy, sortBy, pageInfo)
    store.dispatch({ type: SET_TOY_PAGE, toyPage })
}

export async function addToy(newToy) {
    const toy = await toyService.save(newToy)
    store.dispatch({ type: ADD_TOY, toy })
    await queryToys()
    return toy
}

export async function updateToy(updatedToy) {
    const toy = await toyService.save(updatedToy)
    store.dispatch({ type: UPDATE_TOY, toy })
    await queryToys()
    return toy
}

export async function updateToyStock(toyId, stockDiff) {
    const toy = await toyService.updateStock(toyId, stockDiff)
    store.dispatch({ type: UPDATE_TOY, toy })
    await queryToys()
    return toy
}

export async function removeToy(toyId) {
    const toy = await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toy })
    await queryToys()
    return toy
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