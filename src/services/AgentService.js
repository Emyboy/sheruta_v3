import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.REACT_APP_API_URL
export default class AgentService {
	static async sendPendingRequest(userData) {
		const res = await axios(API_URL + '/agents/request/pending', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`,
			},
		});
        return res;
	}
}
