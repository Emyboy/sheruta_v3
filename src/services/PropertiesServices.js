import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
export default class PropertiesService {
	static async getRecentProperties(location_keyword) {
		const data = await axios(
			API_URL +
				(location_keyword
					? `/properties/?&_limit=80&_start=0&_sort=created_at:DESC`
					: `/properties/?_limit=80&_start=0&_sort=created_at:DESC`)
		)
		return data
	};
	
	/**
	 * @param {number} location_keyword 
	 * @returns axios response [list of properties]
	 */
	static async getPropertiesByLocationKeyword(location_keyword) {
		const data = await axios(
			API_URL +
				(`/properties/?location_keyword=${location_keyword}&_limit=80&_start=0&_sort=created_at:DESC`
					)
		)
		return data
	}

	static async getPropertyByUidAndID(property_id, limit) {
		const data = await axios(API_URL + `/properties/?id=${property_id}`)
		return data
	}

	static async getPropertyViaQuery(query){
		const data = await axios(API_URL + `/properties/${query}`)
		return data
	}
}
