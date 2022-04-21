import { notification } from 'antd'
import PropertiesService from '../../services/PropertiesServices'
import store from '../store/store'

const setPropertyState = (payload) => {
	store.dispatch({
		type: 'SET_PROPERTIES_STATE',
		payload,
	})
}

export const getAllRecentProperties =
	(location_keyword) => async (dispatch) => {
		const { personal_info } = store.getState().view
		const user_location_keyword =
			location_keyword ||
			(personal_info ? personal_info?.location_keyword?.id : null)
		console.log('THE LOCATION KEYWORD FROM ACTION ---', user_location_keyword)
		try {
			const res = await PropertiesService.getRecentProperties(
				user_location_keyword
			)
			console.log('THE RESULT ---', res.data)
			setPropertyState({
				recent_properties: res.data,
			})
			return Promise.resolve()
		} catch (error) {
			notification.error({ message: 'Error fetching properties' })
			return Promise.reject(error)
		}
	}
