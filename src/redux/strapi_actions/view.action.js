import { notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import MessageService from '../../services/MessageService'
import Notifications from '../../services/Notifications'
import PaymentService from '../../services/PaymentService'
import { getAppDetails } from '../../services/Sheruta'
import store from '../store/store'

const authHeader = {
	authorization: `Bearer ${Cookies.get('token')}`,
}

export const getAllUserInspection = (user_id) => async (dispatch) => {
	try {
		const myInspections = await axios(
			process.env.REACT_APP_API_URL + `/property-inspections/?owner=${user_id}`,
			{
				headers: authHeader,
			}
		)
		const inspectionsIBelong = await axios(
			process.env.REACT_APP_API_URL +
				`/property-inspections/?guests_in=${user_id}`,
			{
				headers: authHeader,
			}
		)
		dispatch({
			type: 'SET_VIEW_STATE',
			payload: {
				inspections: [...myInspections.data, ...inspectionsIBelong.data],
			},
		})
	} catch (error) {
		return Promise.resolve(error)
	}
}

export const getAllUniqueHabits = () => (dispatch) => {
	axios(process.env.REACT_APP_API_URL + '/user-unique-habits')
		.then((res) => {
			dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					unique_habits: res.data,
				},
			})
		})
		.catch((err) => {
			return Promise.reject(err)
		})
}

export const getAllServices = () => (dispatch) => {
	axios(process.env.REACT_APP_API_URL + '/services')
		.then((res) => {
			dispatch({
				type: 'GET_ALL_SERVICES',
				payload: res.data,
			})
		})
		.catch((err) => {
			return Promise.reject(err)
		})
}

export const getAllAmenities = () => (dispatch) => {
	axios(process.env.REACT_APP_API_URL + '/amenities')
		.then((res) => {
			dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					amenities: res.data,
				},
			})
		})
		.catch((err) => {
			return Promise.reject(err)
			// notification.error({ message: 'Error fetching services' })
		})
}

export const getAllCategories = () => (dispatch) => {
	axios(process.env.REACT_APP_API_URL + '/categories')
		.then((res) => {
			dispatch({
				type: 'GET_ALL_CATEGORIES',
				payload: res.data,
			})
		})
		.catch((err) => {
			notification.error({ message: 'Poor internet connection' })
		})
}

export const getUserFeedback = () => (dispatch) => {
	setTimeout(() => {
		const user = store.getState().auth.user
		axios(
			process.env.REACT_APP_API_URL +
				'/user-feedbacks/?users_permissions_user=' +
				user.user.id
		)
			.then((res) => {
				if (res.data.length === 0) {
					dispatch({
						type: 'SET_VIEW_STATE',
						payload: {
							askForUserFeedback: true,
						},
					})
				}
			})
			.catch((err) => {
				return Promise.reject(err)
			})
	}, 5000)
}

export const getAuthPersonalInfo = () => async (dispatch) => {
	let token = await Cookies.get('token')
	axios(process.env.REACT_APP_API_URL + '/personal-infos/me', {
		headers: {
			authorization: `Bearer ${Cookies.get('token')}`
		}
	})
		.then((res) => {
			store.dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					personal_info: res.data,
				},
			})
		})
		.catch((err) => {
			Cookies.set('has_nin', false)
			if (err?.response && err?.response?.status === 401) {
				localStorage.removeItem('token')
				Cookies.remove('token')
				store.dispatch({
					type: 'LOGOUT',
				})
				// notification.error({ message: 'You are logged out' })
			}
			if (err?.response?.status === 404) {
				store.dispatch({
					type: 'SET_VIEW_STATE',
					payload: {
						configureView: true,
					},
				})
			} else {
				store.dispatch({
					type: 'SET_VIEW_STATE',
					payload: {
						configureView: false,
					},
				})
			}
		})
}

export const getAllPaymentTypes = () => (dispatch) => {
	axios(process.env.REACT_APP_API_URL + `/payment-types`)
		.then((res) => {
			dispatch({
				type: 'GET_ALL_PAYMENT_TYPES',
				payload: res.data,
			})
		})
		.catch((err) => {
			return Promise.reject(err)
		})
}

export const getAllStates = () => (dispatch) => {
	axios(process.env.REACT_APP_API_URL + `/states`)
		.then((res) => {
			dispatch({
				type: 'GET_ALL_STATES',
				payload: res.data,
			})
		})
		.catch((err) => {
			return Promise.reject(err)
		})
}
export const getAllWorkIndustries = () => (dispatch) => {
	axios(process.env.REACT_APP_API_URL + `/work-industries`)
		.then((res) => {
			dispatch({
				type: 'GET_ALL_WORK_INDUSTRIES',
				payload: res.data,
			})
		})
		.catch((err) => {
			return Promise.reject(err)
			// notification.error({ message: 'Error with work industries' })
		})
}

export const getAppDetail = () => async (dispatch) => {
	try {
		const app = await getAppDetails()
		console.log('FOUND APP ---', app.data)
		dispatch({
			type: 'GET_APP_DETAILS',
			payload: app.data,
		})
	} catch (error) {
		getAppDetail()
		return Promise.reject(error)
	}
}

export const showRobotMessage =
	(message, actionText, actionLink) => (dispatch) => {
		dispatch({
			type: 'SHOW_ROBOT_MESSAGE',
			payload: {
				robot_message: message,
				robot_action_text: actionText,
				robot_action_link: actionLink,
			},
		})
		setTimeout(() => {
			dispatch({
				type: 'SHOW_ROBOT_MESSAGE',
				payload: {
					robot_message: null,
					robot_action_text: null,
					robot_action_link: null,
				},
			})
		}, 15000)
	}

export const getAllNotifications = () => async (dispatch) => {
	if (store.getState().auth.user) {
		const list = await Notifications.getAuthUserNotification()
		dispatch({
			type: 'GET_ALL_NOTIFICATIONS',
			payload: list.data,
		})
	}
}

export const getUnreadMessageCount = () => async (dispatch) => {
	if (Cookies.get('token')) {
		try {
			const msg = await MessageService.getUnreadMessages()
			dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					messages: msg.data,
				},
			})
		} catch (error) {
			return Promise.reject(error)
		}
	}
}

export const getAllConversations = () => async (dispatch) => {
	try {
		const convs = await MessageService.getUserConversations()
		const { conversations } = store.getState().view

		// console.log({
		// 	currentFirstConv: conversations[0],
		// 	newCurrentConv: convs[0]
		// })

		// dispatch({
		// 	type: 'SET_VIEW_STATE',
		// 	payload: {
		// 		conversations: convs,
		// 	},
		// })
		if (conversations?.length > 0 && conversations[0]?.id === convs[0]?.id) {
			dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					conversations: convs,
				},
			})
		} else {
			dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					conversations: [],
				},
			})
			dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					conversations: convs,
				},
			})
		}
	} catch (error) {
		return Promise.reject(error)
	}
}

export const getUserPaymentPlan = () => async (dispatch) => {
	store.dispatch({
		type: 'SET_VIEW_STATE',
		payload: {
			payment_plan_loading: true,
		},
	})
	try {
		const res = await PaymentService.getUserSubscription()
		if (res?.data?.length === 0) {
			store.dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					payment_plan_loading: false,
					payment_plan: null,
				},
			})
			return
		}
		store.dispatch({
			type: 'SET_VIEW_STATE',
			payload: {
				payment_plan_loading: false,
				payment_plan: res?.data[0],
			},
		})
	} catch (error) {
		store.dispatch({
			type: 'SET_VIEW_STATE',
			payload: {
				payment_plan_loading: false,
				payment_plan: null,
			},
		})
		return Promise.reject(error)
	}
}

export const getRecentUsers = () => async (dispatch) => {
	try {
		const res = await axios(
			process.env.REACT_APP_API_URL +
				`/users/?is_verified=true&_limit=10&_start=0&_sort=created_at:DESC`
		)

		dispatch({
			type: 'SET_VIEW_STATE',
			payload: {
				recent_users: res.data,
			},
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export const getLocationKeyWordsByState = (state_id) => async (dispatch) => {
	try {
		const res = await axios(
			process.env.REACT_APP_API_URL + `/location-keywords/?state=${state_id}`
		)
		dispatch({
			type: 'SET_VIEW_STATE',
			payload: {
				location_keywords: res.data,
			},
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export const getAllLocationKeyword = (state) => async (dispatch) => {
	try {
		const res = await axios(
			process.env.REACT_APP_API_URL + `/location-keywords/?state=${state || 1}`
		)
		dispatch({
			type: 'SET_VIEW_STATE',
			payload: {
				location_keywords: res.data,
			},
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export const getRealTimeStuffs = () => (dispatch) => {
	dispatch(getAllConversations())
	dispatch(getUnreadMessageCount())
	// dispatch(getAllNotifications())
	// dispatch(getUserPaymentPlan())
}

export const getAllViewOptions = () => (dispatch) => {
	dispatch(getAllWorkIndustries())
	dispatch(getAllPaymentTypes())
	dispatch(getAllCategories())
	dispatch(getAllAmenities())
	dispatch(getAllServices())
	dispatch(getAllStates())
}

export const getOtherStuffs = () => (dispatch) => {
	dispatch(getAppDetail())
	dispatch(getAuthPersonalInfo())
	dispatch(getRecentUsers())
}
