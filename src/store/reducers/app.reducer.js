


export const SET_TITLE = 'SET_TITLE'
export const SET_MESSAGE = 'SET_MESSAGE'


const initialState = {
    title: '',
    message: null,
}


export function appReducer(state=initialState, action={}) {

    switch (action.type) {
        case SET_TITLE:
            return { ...state, title: action.title }

        case SET_MESSAGE:
            return { ...state, message: action.message }
        
        default:
            return state
    }
}