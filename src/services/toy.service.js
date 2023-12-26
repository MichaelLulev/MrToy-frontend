import { httpService } from "./http.service.js"


const URL_END_POINT_TOY = 'toy'


export const toyService = {
    query,
    get,
    save,
    remove,
    getDefaultFilterBy,
    getDefaultSortBy,
    getDefaultPageInfo,
}


function query(filterBy={}, sortBy={}, pageInfo={}) {
    return httpService.get(URL_END_POINT_TOY, { params: { ...filterBy, ...sortBy, ...pageInfo } })
}

function get(toyId) {
    return httpService.get(URL_END_POINT_TOY + `/${toyId}`)
}

function save(toy) {
    const saveFunc = toy._id ? httpService.put : httpService.post
    return saveFunc(URL_END_POINT_TOY, toy)
}

function remove(toyId) {
    return httpService.delete(URL_END_POINT_TOY + `/${toyId}`)
}

function getDefaultFilterBy() {
    return {
        text: '',
        stock: 0,
    }
}

function getDefaultSortBy() {
    return {
        field: 'name',
        isAscending: false,
    }
}

function getDefaultPageInfo() {
    return {
        idx: 0,
        toysPerPage: 4,
    }
}