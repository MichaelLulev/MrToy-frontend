


export const SET_MESSAGE = 'SET_MESSAGE'


const initialState = {
    message: null,
}


export function appReducer(state=initialState, action={}) {

    switch (action.type) {
        case SET_MESSAGE:
            return { ...state, message: action.message }
        
        default:
            return state
    }
}