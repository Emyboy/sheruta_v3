import axios from 'axios'
import Cookies from 'js-cookie';
import store from '../redux/store/store'

export default class PaymentService {
	static async getUserSubscription() {
		const res = await axios(
			process.env.REACT_APP_API_URL +
				`/transactions/?users_permissions_user=${
					store.getState().auth.user.user.id
				}&status=success`, 
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`
					}
				}
		);
        return res;
	}
}
