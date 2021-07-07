import { GET_APARTMENT_SUCCESS, GET_APARTMENT_ERROR } from '../actions';

const initialState = {
    getApartmentLoading: true,
    apartments: [],
    error: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_APARTMENT_SUCCESS:
            return {
                ...state,
                apartments: payload,
                getApartmentLoading: false
            }
        case GET_APARTMENT_ERROR:
            return { 
                ...state,
                apartments: payload,
                getApartmentLoading: true
            }
        default:
            return state
    }
}
