import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.REACT_APP_API_URL
export default class JoinPaddyService {
	static async create(data) {
		const res = axios(API_URL + `/join-paddies`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`,
			},
			data,
		})
		return res
	}

	static async getAllJoinPaddy() {
		const res = axios(
			API_URL + `/join-paddies/?_limit=${'50'}&_start=0&_sort=created_at:DESC`
		)
		return res
	}
}
