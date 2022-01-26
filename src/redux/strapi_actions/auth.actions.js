import { notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import UserService from '../../services/UserService'
import store from '../store/store'

export const setAuthState = (state) => (dispatch) => {
	dispatch({
		type: 'SET_AUTH_STATE',
		payload: state,
	})
}

export const logout = () => (dispatch) => {
	Cookies.remove('token')
	localStorage.removeItem('token')
    store.dispatch({
        type: 'SET_VIEW_STATE',
        payload: {
            personal_info: null,
        },
    })
	dispatch({
		type: 'LOGOUT',
	})
	
}

export const getUser = () => (dispatch) => {
	// console.log("%cgetting user --", "color: red; font-size: 30px;");
	axios(process.env.REACT_APP_API_URL + '/users/me', {
		headers: {
			Authorization: `Bearer ${Cookies.get('token')}`,
		},
	})
		.then((res) => {
			dispatch({
				type: 'GET_USER',
				payload: res.data,
			})
		})
		.catch((err) => {
			notification.error({ message: 'Slow network detected' })
		})
}

export const setUserOnline = () => async (dispatch) => {
	try {
		await UserService.setUserOnline()
		dispatch(getUser())
	} catch (error) {
		return Promise.reject(error)
	}
}
