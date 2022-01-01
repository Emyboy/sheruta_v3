import axios from 'axios'
import store from '../redux/store/store'

const API_URL = process.env.REACT_APP_API_URL
const { user } = store.getState().auth
export default class RequestService {
	static async getAllUsersRequests() {
		const res = await axios(
			API_URL + `/property-requests?users_permissions_user=${user?.user?.id}`
		)
        return res;
	}
}
