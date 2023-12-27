import { store } from "../store.js"
import { userService } from "../../services/user.service.js"
import { SET_LOGGED_IN_USER, SET_USERS, UPDATE_USER } from "../reducers/user.reducer.js"


export function queryUsers() {
    return userService.query()
        .then(users => {
            store.dispatch({ type: SET_USERS, users })
        })
}

export function signup(formUser) {
    return userService.signup(formUser)
        .then(user => {
            store.dispatch({ type: SET_LOGGED_IN_USER, user })
            return user
        })
}

export function login(formUser) {
    return userService.login(formUser)
        .then(user => {
            store.dispatch({ type: SET_LOGGED_IN_USER, user })
            return user
        })
}

export function updateUser(user) {
    return userService.updateUser(user)
        .then(user => {
            store.dispatch({ type: UPDATE_USER, user })
            store.dispatch({ type: SET_LOGGED_IN_USER, user: userService.getLoggedInUser() })
            return user
        })
}

export function logout() {
    return userService.logout()
        .then(user => {
            store.dispatch({ type: SET_LOGGED_IN_USER, user: null })
            return user
        })
}