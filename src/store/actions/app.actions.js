import { SET_MESSAGE } from "../reducers/app.reducer.js"
import { store } from "../store.js"


export function setInfoMessageText(text) {
    store.dispatch({ type: SET_MESSAGE, message: { type: 'info', text }})
}

export function setErrorMessageText(text) {
    store.dispatch({ type: SET_MESSAGE, message: { type: 'error', text }})
}

export function setMessage(message) {
    store.dispatch({ type: SET_MESSAGE, message })
}