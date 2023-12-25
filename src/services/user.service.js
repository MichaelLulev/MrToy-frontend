import { storageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"
import { WEEK, utilService } from "./util.service.js"

const BASE_AUTH_URL = 'auth/'
const BASE_USER_URL = 'user/'
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
    return httpService.get(BASE_USER_URL)
}

function get(userId) {
    return httpService.get(BASE_USER_URL + userId)
}

function signup({ fullName, username, password }) {
    const user = { fullName, username, password, balance: 10000 }
    return httpService.post(BASE_AUTH_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid signup')
        })
}

function login({ username, password }) {
    return httpService.post(BASE_AUTH_URL + 'login', { username, password })
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
    return httpService.put(BASE_USER_URL, { diff })
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
    return httpService.post(BASE_USER_URL + 'logout')
        .then(() => sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN))
}

function getNewUser() {
    const newUser = {
        fullName: '',
        username: '',
        password: '',
    }
    return newUser
}