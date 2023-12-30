import { SET_IS_SHOW_CART, SET_IS_SHOW_LOGIN, SET_IS_SIGNUP, SET_MESSAGE, SET_TITLE } from "../reducers/app.reducer.js"
import { store } from "../store.js"


export function setIsShowCart(isShowCart) {
    store.dispatch({ type: SET_IS_SHOW_CART, isShowCart })
}

export function setIsSignup(isSignup) {
    store.dispatch({ type: SET_IS_SIGNUP, isSignup })
}

export function setIsShowLogin(isShowLogin) {
    store.dispatch({ type: SET_IS_SHOW_LOGIN, isShowLogin })
}

export function setTitle(text) {
    store.dispatch({ type: SET_TITLE, title: text })
}

export function setInfoMessageText(text) {
    store.dispatch({ type: SET_MESSAGE, message: { type: 'info', text }})
}

export function setErrorMessageText(text) {
    store.dispatch({ type: SET_MESSAGE, message: { type: 'error', text }})
}

export function setMessage(message) {
    store.dispatch({ type: SET_MESSAGE, message })
}