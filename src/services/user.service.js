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
    return httpService.get(URL_END_POINT_USER + `/${userId}`)
}

async function signup(user) {
    const _user = await httpService.post(URL_END_POINT_AUTH + '/signup', user)
    if (_user) return _setLoggedInUser(_user)
    return Promise.reject('Invalid signup')
}

async function login(user) {
    const _user = await httpService.post(URL_END_POINT_AUTH + '/login', user)
    if (_user) return _setLoggedInUser(_user)
    else return Promise.reject('Invalid login')
}

function getLoggedInUser() {
    const strLoggedInUser = sessionStorage.getItem(STORAGE_KEY_LOGGED_IN)
    return JSON.parse(strLoggedInUser)
}

async function updateUser(user) {
    const _user = await httpService.put(URL_END_POINT_USER + '/update', user)
    if (getLoggedInUser()._id === _user._id) _setLoggedInUser(_user)
    return _user
}

function _setLoggedInUser(user) {
    const strUser = JSON.stringify(user)
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN, strUser)
    return user
}

async function logout() {
    const _user = await httpService.post(URL_END_POINT_AUTH + '/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN)
    return _user
}

function getNewUser() {
    return {
        fullName: '',
        username: '',
        password: '',
    }
}