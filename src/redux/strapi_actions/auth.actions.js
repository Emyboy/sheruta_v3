import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

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
    })
};

export const getUser = () => dispatch => {
    // console.log('%cgetting user --', 'color: red; font-size: 30px;')
    axios(process.env.REACT_APP_API_URL +"/users/me", {
        headers: {
            Authorization: 'Bearer ' + state.auth.user.jwt
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
            console.log(err)
        })
}

