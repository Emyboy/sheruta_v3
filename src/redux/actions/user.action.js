import {
    UPLOAD_ERROR, 
    UPLOAD_LOADING,
    SEND_REQUEST_ERROR, 
    SEND_REQUEST_SUCCESS, 
    TOGGLE_DONE_MODAL, 
    SEARCH_ERROR, 
    SEARCH_SUCCESS
} from '.';
import Axios from 'axios';
import { notification } from 'antd';

export const toggleDoneModal = (isOpen) => {
    return {
        type: TOGGLE_DONE_MODAL,
        payload: isOpen
    }
}

const uploadLoading = () => {
    return {
        type: UPLOAD_LOADING,
    }
}

const uploadError = error => {
    return {
        type: UPLOAD_ERROR,
        payload: error
    }
}
const sendRequestSuccess = payload => {
    return {
        type: SEND_REQUEST_SUCCESS,
        payload
    }
}
const sendRequestError = error => {
    return {
        type: SEND_REQUEST_ERROR,
        payload: error
    }
}
const searchSuccess = data => {
    return {
        type: SEARCH_SUCCESS,
        payload: data
    }
}
const searchError = error => {
    return {
        type: SEARCH_ERROR,
        payload: error
    }
}

export const uploadApartment = data => dispatch => {
    dispatch(uploadLoading());
    return Axios(`${process.env.REACT_APP_BASE_URL}/hostels`, {
        method: 'POST',
        data
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
}

export const sendRequest = data => dispatch => {
    console.log('sending request', data);
    dispatch(uploadLoading());
    return Axios(`${process.env.REACT_APP_BASE_URL}/message`, {
        method: 'POST',
        data
    })
        .then(res => {
            console.log('res..', res);
            if (res.data.status === 200) {
                notification.success({ message: 'Request Sent..' });
                Axios(`${process.env.REACT_APP_BASE_URL}/agent`, )
                dispatch(sendRequestSuccess(res.data));
                dispatch(toggleDoneModal(true));
            } else {
                notification.error({ message: 'Request Not Sent..' })
                dispatch(sendRequestError(res.data))
            }
        })
        .catch(err => {
            notification.error({ message: 'Request Error!' })
            dispatch(sendRequestError(err));
            console.log(err);
        })
}

export const sharedSignup = data => dispatch => {
    dispatch(uploadLoading());
    return Axios(`${process.env.REACT_APP_BASE_URL}/sharing/signup`, {
        method: 'POST',
        data
    }).then(res => {
        if (res.data.error) {
            dispatch(uploadError(res.data.error));
            notification.error({ message: 'Request Error!!' })
        }else {
            notification.success({ message: 'Signup'});
            window.location = '/shared';
            const state = JSON.parse(localStorage.getItem('state'));
            state.auth.user.sharing = true;
            localStorage.setItem('state', state);
        }
        console.log('res', res)
    })
        .catch(err => {
            dispatch(uploadError(err));
            console.log('err', err)
        })
}

export const addToFavorite = data => dispatch => {
    return Axios(`${process.env.REACT_APP_BASE_URL}/cube/${data.userId}`, {
        data,
        method: 'POST'
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}

export const search = data => dispatch => {
    console.log('searchin ', data);
    dispatch(uploadLoading());
    const { area, bedrooms, sittingrooms, price, type } = data;
    return Axios(`${process.env.REACT_APP_BASE_URL}/search/${area}/${bedrooms}/${sittingrooms}/${type}/${price}`, {
        method: 'POST'
    })
        .then(res => {
            console.log(res);
            res.data.results.length > 0 ?
                dispatch(searchSuccess(res.data.results)) : dispatch(searchError(res.data))
        })
        .catch(err => {
            notification.error({ message: "Error Loading Results!" });
            dispatch(searchError(err));
        })

}

export const SendMessage = data => dispatch => {
    return Axios(`${process.env.REACT_APP_BASE_URL}/message`, {
        data,
        method: 'POST'
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}
