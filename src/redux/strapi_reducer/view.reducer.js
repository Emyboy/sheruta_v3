
const initialState = {
    services: [],
    categories: [],
    askForUserFeedback: false,
    showPaymentPopup: false,
    personal_info: null
}

function ViewReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SET_VIEW_STATE':
            return {
                ...state,
                ...payload
            }

        case 'GET_ALL_SERVICES':
            return { ...state, services: payload }

        case 'GET_ALL_CATEGORIES':
            return { ...state, categories: payload }

        default:
            return state
    }
}

export default ViewReducer;
