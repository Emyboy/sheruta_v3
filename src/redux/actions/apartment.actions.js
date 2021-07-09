import { GET_APARTMENT_ERROR, GET_APARTMENT_SUCCESS, DETAIL_LOADING } from '.'
import Axios from 'axios'

const getApartmentSuccess = payload => {
    return {
        type: GET_APARTMENT_SUCCESS,
        payload
    }
}

const getApartmentError = error => {
    return {
        type: GET_APARTMENT_ERROR,
        payload: error
    }
}

export const getRecentApartments = limit => dispatch => {
    return Axios(`${process.env.REACT_APP_API_URL}/hostels/limit/${limit}`)
        .then(res => {
            switch (res.data.message) {
                case 'success':
                    dispatch(getApartmentSuccess(res.data.apartment));
                    break;
                case 'faild':
                    dispatch(getApartmentError([]));
                    break;
                default:
                    break;
            }
        })
        .catch(err => {
            getApartmentError(err);
        })
}

export const getApartmentById = id => dispatch => {
    dispatch({ type: DETAIL_LOADING });
    return Axios(`${process.env.REACT_APP_API_URL}/hostels/${id}`)
        .then(res => {
            switch (res.data.message) {
                case 'success':
                    dispatch(getApartmentSuccess(res.data.hostel[0]));
                    dispatch({ type: DETAIL_LOADING });
                    break;
                case 'faild':
                    dispatch(getApartmentError(res.data));
                    break;
                default:
                    break;
            }
        })
        .catch(err => {
        })
}
