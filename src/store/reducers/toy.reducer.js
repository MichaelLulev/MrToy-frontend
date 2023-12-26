import { toyService } from "../../services/toy.service.js"


export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'

export const SET_TOY_FILTER_BY = 'SET_TOY_FILTER_BY'
export const SET_TOY_SORT_BY = 'SET_TOY_SORT_BY'


const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilterBy(),
    sortBy: toyService.getDefaultSortBy(),
}


export function toyReducer(state=initialState, action={}) {
    
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys}

        case ADD_TOY:
            var toys = [action.toy, ...state.toys]
            return { ...state, toys }

        case UPDATE_TOY:
            var toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        case REMOVE_TOY:
            var toys = state.toys.filter(toy => toy._id !== action.toy._id)
            return { ...state, toys }

        case SET_TOY_FILTER_BY:
            var filterBy = { ...state.filterBy, ...action.filterBy }
            return { ...state, filterBy }

        case SET_TOY_SORT_BY:
            var sortBy = { ...state.sortBy, ...action.sortBy }
            return { ...state, sortBy }

        default:
            return state
    }
}