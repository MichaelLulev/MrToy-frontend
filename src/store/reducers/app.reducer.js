


export const SET_TITLE = 'SET_TITLE'
export const SET_MESSAGE = 'SET_MESSAGE'
export const SET_IS_SHOW_LOGIN = 'SET_IS_SHOW_LOGIN'
export const SET_IS_SIGNUP = 'SET_IS_SIGNUP'
export const SET_IS_SHOW_CART = 'SET_IS_SHOW_CART'


const initialState = {
    title: '',
    message: null,
    isShowLogin: false,
    isSignup: true,
}


export function appReducer(state=initialState, action={}) {

    switch (action.type) {
        case SET_IS_SHOW_CART:
            return { ...state, isShowCart: action.isShowCart }

        case SET_IS_SIGNUP:
            return { ...state, isSignup: action.isSignup }

        case SET_IS_SHOW_LOGIN:
            return { ...state, isShowLogin: action.isShowLogin }

        case SET_TITLE:
            return { ...state, title: action.title }

        case SET_MESSAGE:
            return { ...state, message: action.message }
        
        default:
            return state
    }
}