import axios from 'axios'
import Cookies from 'js-cookie'

export const API_URL = process.env.REACT_APP_API_URL

export const headers = () => {
	return {
		authorization: `Bearer ${Cookies.get('token')}`,
	}
}

export const findPerfectMatch = () => async (dispatch) => {
	try {
		const res = await axios(API_URL + `/contacts/find-match`, {
			headers: headers(),
		})
		dispatch({
			type: 'SET_CONTACT_STATE',
			payload: {
				matches: res.data.perfect_match,
			},
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export const getAuthContacts = (auth_id) => async (dispatch) => {
	try {
		const res = await axios(API_URL + `/contacts/?for=${auth_id}`, {
			headers: headers(),
		})
		dispatch({
			type: 'SET_CONTACT_STATE',
			payload: {
				contacts: res.data,
			},
		})
	} catch (error) {
		return Promise.reject(error)
	}
}
