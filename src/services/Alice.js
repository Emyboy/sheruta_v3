import axios from 'axios'
import Cookies from 'js-cookie'
import Analytics, { AnalyticsTypes } from './Analytics'
import store from '../redux/store/store'

export default class Alice {
	static async getAllMySuggestions() {
		if (Cookies.get('token')) {
			const allMySuggestions = await axios(
				process.env.REACT_APP_API_URL + '/alice/suggest/mine',
				{
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			return allMySuggestions
		} else {
			return Promise.reject()
		}
	}

	static async suggestThemForMe() {
		// console.log("%c Alice is suggesting", "color: green; font-size: 25px;")
		if (Cookies.get('token')) {
			const them = await axios(
				process.env.REACT_APP_API_URL + '/alice/suggest/them-to-me',
				{
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			return them
		}
	}

	static async suggestMeToThem() {
		const data = await axios(
			process.env.REACT_APP_API_URL + '/alice/suggest/me-to-them',
			{
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
		return data
	}

	static async rejectThisSuggestion(suggestion_id, status) {
		const update = await axios(
			process.env.REACT_APP_API_URL +
				`/alice/suggest/update-status/${suggestion_id}/${status}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
		Analytics.create({
			type:
				status === 'accepted'
					? AnalyticsTypes.matchAccept
					: AnalyticsTypes.matchRejected,
		})
		return update
	}

	static async getAllMySuggestionsByStatus(status) {
		const accepted = await axios(
			process.env.REACT_APP_API_URL + `/alice/suggest/accepted/${status}`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
		return accepted
	}

	static async addUserToContact(user_id) {
		const { user } = store.getState().auth
		if (user && user_id) {
			const accepted = await axios(
				process.env.REACT_APP_API_URL + `/alice/contact/add`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
					method: 'POST',
					data: {
						auth_id: user?.user?.id,
						contact_id: user_id,
					},
				}
			)
			return accepted
		} else {
			return Promise.reject()
		}
	}
	static async removeUserFromContact(contact_id) {
		const { user } = store.getState().auth
		if (user && contact_id) {
			const deleted = await axios(
				process.env.REACT_APP_API_URL + `/alice/delete/${contact_id}`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
					method: 'DELETE',
				}
			)
			return deleted
		} else {
			return Promise.reject()
		}
	}
}
