import { GET_SHARED_SUCCESS, GET_SHARED_ERROR } from '../actions';

const initialState = {
    sharedLoading: true,
    shared: [],
    error: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SHARED_SUCCESS:
            return {
                ...state,
                shared: payload,
                sharedLoading: false
            }
        case GET_SHARED_ERROR:
            return {
                ...state,
                shared: payload,
                sharedLoading: true
            }
        default:
            return state
    }
}
