import { httpService } from "./http.service.js"


const URL_END_POINT_AUTH = 'auth/'
const URL_END_POINT_USER = 'user/'
const STORAGE_KEY_LOGGED_IN = 'loggedInUser'


export const userService = {
    query,
    get,
    signup,
    login,
    getLoggedInUser,
    updateBalance,
    logout,
    getNewUser,
}


function query() {
    return httpService.get(URL_END_POINT_USER)
}

function get(userId) {
    return httpService.get(URL_END_POINT_USER + userId)
}

function signup({ fullName, username, password }) {
    const user = { fullName, username, password, balance: 10000 }
    return httpService.post(URL_END_POINT_AUTH + 'signup', user)
        .then(user => {
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid signup')
        })
}

function login({ username, password }) {
    return httpService.post(URL_END_POINT_AUTH + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid login')
        })
}

function getLoggedInUser() {
    const strLoggedInUser = sessionStorage.getItem(STORAGE_KEY_LOGGED_IN)
    return JSON.parse(strLoggedInUser)
}

function updateBalance(diff) {
    if (getLoggedInUser().balance + diff < 0) return Promise.reject('Not enough credit')
    return httpService.put(URL_END_POINT_USER, { diff })
        .then(user => {
            _setLoggedInUser(user)
            return user.balance
        })
}

function _setLoggedInUser(user) {
    const { _id, fullName, username, balance } = user
    const userToSet = { _id, fullName, username, balance }
    const strUserToSet = JSON.stringify(userToSet)
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN, strUserToSet)
    return userToSet
}

function logout() {
    return httpService.post(URL_END_POINT_AUTH + 'logout')
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