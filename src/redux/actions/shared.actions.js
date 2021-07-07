import { GET_SHARED_ERROR, GET_SHARED_SUCCESS, DETAIL_LOADING } from '.'
import Axios from 'axios'
// import { notification } from 'antd'


const getApartmentSuccess = payload => {
    return {
        type: GET_SHARED_SUCCESS,
        payload
    }
}

const getApartmentError = error => {
    return {
        type: GET_SHARED_ERROR,
        payload: error
    }
}

export const getRecentSharedApartments = limit => dispatch => {
    return Axios(`${process.env.REACT_APP_BASE_URL}/shared`)
        .then(res => {
            switch (res.data.message) {
                case 'success':
                    dispatch(getApartmentSuccess(res.data.shared));
                    break;
                case 'faild':
                    dispatch(getApartmentError([]));
                    break;
                default:
                    break;
            }
        })
        .catch(err => {
            // notification.error({ message: 'Error Loading Apartment'})
            getApartmentError(err);
        })
}

/**
 * @description - This method get shared apartment by id
 * @param {id} id 
 */
export const getSharedById = id => dispatch => {
    dispatch({ type: DETAIL_LOADING });
    return Axios(`${process.env.REACT_APP_BASE_URL}/shared/${id}`)
        .then(res => {
            switch (res.data.message) {
                case 'success':
                    dispatch(getApartmentSuccess(res.data.shared[0]));
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
            // notification.error({message: 'Error Loading Apartment'});
            getApartmentError(err);
        })
}
