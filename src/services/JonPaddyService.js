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
        return res;
	}
}
