import { notification } from 'antd'
import PropertiesService from '../../services/PropertiesServices'
import store from '../store/store'

const setPropertyState = (payload) => {
	store.dispatch({
		type: 'SET_PROPERTIES_STATE',
		payload,
	})
}

export const getAllRecentProperties = () => async (dispatch) => {
	try {
		const res = await PropertiesService.getRecentProperties()
console.log('PROPS --', res.data)

		setPropertyState({
			recent_properties: res.data,
		})
		return Promise.resolve()
	} catch (error) {
		notification.error({ message: 'Error fetching properties' })
		return Promise.reject(error)
	}
}
