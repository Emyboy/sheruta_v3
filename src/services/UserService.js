import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../redux/store/store'

export default class UserService {
	static async setUserOnline() {
		const data = await axios(
			process.env.REACT_APP_API_URL + `/users-permissions/auth/online`,
			{
				method: 'POST',
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
		return data
	}

	static async updateProfile(update) {
		const token = Cookies.get("token");
		if (token && store.getState().auth?.user) {
			const data = await axios(
				process.env.REACT_APP_API_URL +
					`/users-permissions/auth/local/edit/${
						store.getState().auth?.user?.user?.id
					}`,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
					method: 'POST',
					data: update,
				}
			)
			return data
		}
	}

	static async confirmPassword(password){
		const res = await axios(process.env.REACT_APP_API_URL + `/users-permissions/auth/confirm-password`, {
			method: 'POST',
			data: {
				password,
			},
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`
			}
		})

		return res
	}

}
