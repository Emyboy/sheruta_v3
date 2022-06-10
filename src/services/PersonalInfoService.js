import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../redux/store/store'

export default class PersonalInfoService {
	static async updatePersonalInfo(update) {
		const info = store.getState().view?.personal_info
		if (info) {
			const _update = await axios(
				process.env.REACT_APP_API_URL + `/personal-infos/${info?.id}`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
					method: 'PUT',
                    data: update
				}
			)
			return _update
		} else {
			return null
		}
	}

	
}
