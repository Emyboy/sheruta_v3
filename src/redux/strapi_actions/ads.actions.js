import axios from 'axios'
import { API_URL } from './contact.actions'

export const getAllAds = () => async (dispatch) => {
	try {
		const res = await axios(API_URL + `/ads`)
		dispatch({
			type: 'SET_ADS_STATE',
			payload: {
				all_ads: res.data,
			},
		})
		dispatch(
			getAdsRequestWithIds(
				res.data?.filter((x) => x?.request)?.map((val) => val?.request?.id)
			)
		)
	} catch (error) {
		return Promise.reject(error)
	}
}

export const getAdsRequestWithIds = (ids) => async (dispatch) => {
	try {
		const res = await axios(API_URL + `/ads/requests/ids`, {
			method: 'POST',
			data: ids,
		})
		dispatch({
			type: 'SET_ADS_STATE',
			payload: {
				request_ads: res.data
			},
		})
	} catch (error) {
		console.log('IDS ERROR --', error)
		return Promise.reject(error)
	}
}
