import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.REACT_APP_API_URL

export default class InspectionService {
	static async removeUser(user_id, inspection_id) {
		const res = await axios(
			API_URL + `/property-inspections/remove/me/${user_id}/${inspection_id}`,{
                headers: {
                    authorization: `Bearer ${Cookies.get('token')}`,
                },
                method: 'PUT'
            }
		)
		return res
	}
}
