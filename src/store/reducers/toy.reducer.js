import { toyService } from "../../services/toy.service.js"


export const SET_LABELS = 'SET_LABELS'
export const SET_TOY_PAGE = 'SET_TOY_PAGE'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'

export const SET_TOY_FILTER_BY = 'SET_TOY_FILTER_BY'
export const SET_TOY_SORT_BY = 'SET_TOY_SORT_BY'
export const SET_TOY_PAGE_INFO = 'SET_TOY_PAGE_INFO'


const initialState = {
    labels: [],
    toyPage: toyService.getDefaultToyPage(),
    filterBy: toyService.getDefaultFilterBy(),
    sortBy: toyService.getDefaultSortBy(),
    pageInfo: toyService.getDefaultPageInfo(),
}


export function toyReducer(state=initialState, action={}) {
    
    switch (action.type) {
        case SET_LABELS:
            return { ...state, labels: action.labels}
            
        case SET_TOY_PAGE:
            return { ...state, toyPage: action.toyPage}

        case ADD_TOY:
            // var toys = [action.toy, ...state.toyPage.toys]
            // return { ...state, toyPage: { ...toyPage, toys } }

        case UPDATE_TOY:
            // var toys = state.toyPage.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            // return { ...state, toyPage: { ...toyPage, toys } }

        case REMOVE_TOY:
            // var toys = state.toyPage.toys.filter(toy => toy._id !== action.toy._id)
            // return { ...state, toyPage: { ...toyPage, toys } }
            return { ...state }

        case SET_TOY_FILTER_BY:
            var filterBy = { ...state.filterBy, ...action.filterBy }
            return { ...state, filterBy }

        case SET_TOY_SORT_BY:
            var sortBy = { ...state.sortBy, ...action.sortBy }
            return { ...state, sortBy }

        case SET_TOY_PAGE_INFO:
            var pageInfo = { ...state.pageInfo, ...action.pageInfo }
            return { ...state, pageInfo}

        default:
            return state
    }
}