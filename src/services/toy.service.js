import { httpService } from "./http.service.js"


const URL_END_POINT_TOY = 'toy'


export const toyService = {
    query,
    get,
    save,
    remove,
    getLabels,
    getDefaultToyPage,
    getDefaultFilterBy,
    getDefaultSortBy,
    getDefaultPageInfo,
}


function query(filterBy={}, sortBy={}, pageInfo={}) {
    return httpService.get(URL_END_POINT_TOY, { ...filterBy, ...sortBy, ...pageInfo })
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

function getLabels() {
    return httpService.get(URL_END_POINT_TOY + '/label')
}

function getDefaultToyPage() {
    return {
        toys: [],
        pageNum: 1,
        lastPageNum: 1,
    }
}

function getDefaultFilterBy() {
    return {
        text: '',
        stock: 'any',
        label: 'any',
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
        pageNum: 1,
        toysPerPage: 4,
    }
}