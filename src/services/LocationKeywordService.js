import axios from 'axios'

export default class LocationKeywordService {
	static async getLocationKeywordBySlug(slug) {
		const res = await axios(
			process.env.REACT_APP_API_URL + `/location-keywords/?slug=${slug}`
		)
		return res
	}
}
