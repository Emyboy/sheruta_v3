import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import store from "../store/store";

const state = JSON.parse(localStorage.getItem('state'));

export const setAuthState = state => dispatch => {
    dispatch({
        type: 'SET_AUTH_STATE',
        payload: state
    })

}

export const logout = () => dispatch => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove('token')
    dispatch({
        type: 'LOGOUT'
    });
    store.dispatch({
        type: 'SET_VIEW_STATE',
        payload: {
            personal_info: null
        }
    })
};

export const getUser = () => dispatch => {
    console.log('%cgetting user --', 'color: red; font-size: 30px;')
    axios(process.env.REACT_APP_API_URL +"/users/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
        .then(res => {
            dispatch({
                type: 'GET_USER',
                payload: res.data
            })
        })
        .catch(err => {
            notification.error({ message: 'Error fetching profile' })
            store.dispatch({ type: 'LOGOUT'});
            Cookies.remove('token');
            localStorage.clear();
            sessionStorage.clear();
        })
}

