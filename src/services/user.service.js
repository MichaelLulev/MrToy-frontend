import { httpService } from "./http.service.js"


const URL_END_POINT_AUTH = 'auth'
const URL_END_POINT_USER = 'user'
const STORAGE_KEY_LOGGED_IN = 'loggedInUser'


export const userService = {
    query,
    get,
    signup,
    login,
    getLoggedInUser,
    updateUser,
    logout,
    getNewUser,
}


function query() {
    return httpService.get(URL_END_POINT_USER)
}

function get(userId) {
    return httpService.get(URL_END_POINT_USER + userId)
}

function signup(user) {
    return httpService.post(URL_END_POINT_AUTH + '/signup', user)
        .then(user => {
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid signup')
        })
}

function login(user) {
    return httpService.post(URL_END_POINT_AUTH + '/login', user)
        .then(user => {
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid login')
        })
}

function getLoggedInUser() {
    const strLoggedInUser = sessionStorage.getItem(STORAGE_KEY_LOGGED_IN)
    return JSON.parse(strLoggedInUser)
}

function updateUser(user) {
    return httpService.put(URL_END_POINT_USER + '/update', user)
        .then(user => {
            if (getLoggedInUser()._id === user._id) _setLoggedInUser(user)
            return user
        })
}

function _setLoggedInUser(user) {
    const strUser = JSON.stringify(user)
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN, strUser)
    return user
}

function logout() {
    return httpService.post(URL_END_POINT_AUTH + '/logout')
        .then(user => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN)
            return user
        })
}

function getNewUser() {
    return {
        fullName: '',
        username: '',
        password: '',
    }
}