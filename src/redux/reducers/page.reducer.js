import { PAGE_LOADING } from "../actions"

const initialState = {
    isPageLooading: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case PAGE_LOADING:
        return { ...state, isPageLooading: payload }

    default:
        return state
    }
}
