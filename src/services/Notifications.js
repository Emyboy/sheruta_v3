import axios from 'axios'
import Cookies from 'js-cookie'
import Global from '../Global'
import store from '../redux/store/store'

export const notificationTypes = {
	profileView: 'profile_view',
	requestView: 'request_view',
	personal_info_view: 'personal_info_view',
	newUser: 'new_user',
	suggestions_accept: 'suggestions_accept',
}

const NotificationService = {
	notifyUser: async ({
		title,
		sub_title,
		owner,
		users_permissions_user,
		type,
		property_request,
		payment_plan,
	}) => {
		const { user } = store.getState().auth

		if (user && owner === user.user.id) {
			return
		}
		if (user && user?.user?.id === Global.ADMIN_ID) {
			return
		}
		if (user && user?.user?.deactivated) {
			return null
		}
		const data = await axios(
			process.env.REACT_APP_API_URL + `/notifications/create`,
			{
				method: 'POST',
				data: {
					title,
					sub_title,
					owner,
					users_permissions_user:
						user && user.user.id !== owner ? user.user.id : null,
					type,
					property_request,
					payment_plan,
				},
			}
		)
		return data
	},

	getAuthUserNotification: async () => {
		if (store.getState().auth.user) {
			try {
				const list = await axios(
					process.env.REACT_APP_API_URL +
						`/notifications/?owner=${
							store.getState().auth.user.user.id
						}&_sort=created_at:DESC`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get('token')}`,
						},
					}
				)

				console.log('FETCHED LIST --', list)
				return list
			} catch (error) {
				// getAuthUserNotification()
			}
		}
	},

	markNotificationAsSeen: async (notification_id) => {
		const seen = await axios(
			process.env.REACT_APP_API_URL + `/notifications/${notification_id}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				data: {
					seen: true,
				},
			}
		)
		return seen
	},
}

export default NotificationService
