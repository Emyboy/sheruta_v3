import { notification } from "antd"
import axios from "axios"
import store from "../store/store"


export const getAllServices = () => dispatch => {
    axios(process.env.REACT_APP_BASE_URL + '/services')
        .then(res => {
            dispatch({
                type: 'GET_ALL_SERVICES',
                payload: res.data
            })
        })
        .catch(err => {
            notification.error({ message: 'Error fetching services' })
        })
}

export const getAllCategories = () => dispatch => {
    axios(process.env.REACT_APP_BASE_URL + '/categories')
        .then(res => {
            dispatch({
                type: 'GET_ALL_CATEGORIES',
                payload: res.data
            })
        })
        .catch(err => {
            notification.error({ message: 'Error fetching categories' })
        })
}


export const getUserFeedback = () => dispatch => {
    setTimeout(() => {
        const user = store.getState().auth.user;
        axios(process.env.REACT_APP_BASE_URL + '/user-feedbacks/?users_permissions_user=' + user.user.id)
            .then(res => {
                if(res.data.length === 0){
                    dispatch({
                        type: 'SET_VIEW_STATE',
                        payload: {
                            askForUserFeedback: true
                        }
                    })
                }
            })
            .catch(err => {
                
            })
    }, 5000);
}

