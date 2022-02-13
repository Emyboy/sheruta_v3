import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.REACT_APP_API_URL
export default class AgentService {
	static async sendPendingRequest(user_id, agent_id) {
		if(user_id && agent_id){
			const res = await axios(API_URL + '/pending-agents', {
				method: 'POST',
				data: {
					users_permissions_user: user_id,
					agent: agent_id
				},
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			});
			return res;
		}else {
			return Promise.reject("params are missing")
		}
	};

	static async createAgent(data){
		const res = await axios(API_URL+`/agents/new`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`
			},
			data
		});
		return res
	}
}
