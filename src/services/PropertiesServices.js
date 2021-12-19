import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
export default class PropertiesService {
	static async getRecentProperties() {
		const data = await axios(
			API_URL +
				`/properties/?_limit=50&_start=0&_sort=created_at:DESC`
		)
		return data
	};

	static async getPropertyByUidAndID(uid, property_id) {
		const data = await axios(
			API_URL + `/properties/?uid=${uid}&id=${property_id}`
		)
		return data
	}
}
