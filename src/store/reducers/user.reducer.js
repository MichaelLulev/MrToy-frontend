import { userService } from "../../services/user.service.js"


export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
export const SET_USERS = 'SET_USERS'
export const UPDATE_USER = 'UPDATE_USER'


const initialState = {
    loggedInUser: userService.getLoggedInUser(),
    users: [],
}


export function userReducer(state=initialState, action={}) {
    
    switch (action.type) {
        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.user }

        case SET_USERS:
            return { ...state, users: action.users}

        case UPDATE_USER:
            var loggedInUser = action.user._id === loggedInUser._id ? action.user : loggedInUser
            var users = state.users.map(user => user._id === action.user ? action.user : user)
            return { ...state, loggedInUser, users }

        default:
            return state
    }
}