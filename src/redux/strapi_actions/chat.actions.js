import { notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../store/store'

const API_URL = process.env.REACT_APP_API_URL

export const setChatState = (newState) => {
	store.dispatch({
		type: 'SET_CHAT_STATE',
		payload: newState,
	})
}

export const sendMessage = (newMessage) => async (dispatch) => {
	try {
		const res = await axios(API_URL + `/messages`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: newMessage,
		})
		setChatState({
			messages: [
				...store.getState()?.chat?.messages,
				{ ...res.data, new: true },
			],
		})
		console.log('MESSAGE SENT --', res.data)
	} catch (error) {
		notification.error({ message: 'Error, please try again' })
		return Promise.reject(error)
	}
}
