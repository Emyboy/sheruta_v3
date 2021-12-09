import axios from 'axios'
import store from '../redux/store/store'

export default class PaymentService {
	static async getUserSubscription() {
		const res = await axios(
			process.env.REACT_APP_API_URL +
				`/transactions/?users_permissions_user=${
					store.getState().auth.user.user.id
				}&status=success`
		);
        return res;
	}
}
