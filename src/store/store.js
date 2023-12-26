import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { appReducer } from './reducers/app.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'


const rootReducer = combineReducers({
    appModule: appReducer,
    userModule: userReducer,
    toyModule: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store