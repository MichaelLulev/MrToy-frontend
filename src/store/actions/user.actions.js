import { store } from "../store.js"
import { userService } from "../../services/user.service.js"
import { SET_LOGGED_IN_USER, SET_USERS, UPDATE_USER } from "../reducers/user.reducer.js"


export async function queryUsers() {
    const users = await userService.query()
    store.dispatch({ type: SET_USERS, users })
}

export async function signup(formUser) {
    const user = await userService.signup(formUser)
    store.dispatch({ type: SET_LOGGED_IN_USER, user })
    return user
}

export async function login(formUser) {
    const user = await userService.login(formUser)
    store.dispatch({ type: SET_LOGGED_IN_USER, user })
    return user
}

export async function updateUser(user) {
    const _user = await userService.updateUser(user)
    store.dispatch({ type: UPDATE_USER, user: _user })
    store.dispatch({ type: SET_LOGGED_IN_USER, user: userService.getLoggedInUser() })
    return _user
}

export async function logout() {
    const _user = await userService.logout()
    store.dispatch({ type: SET_LOGGED_IN_USER, user: null })
    return _user
}