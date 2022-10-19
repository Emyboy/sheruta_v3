import axios from 'axios'
import { API_URL, headers } from '../redux/strapi_actions/contact.actions'

export default class ContactService {
	static async addUserAsContact(user_id) {
		const res = await axios(API_URL + `/contacts/add/${user_id}`, {
			method: 'POST',
			headers: headers(),
		})
		return res
	}
}
