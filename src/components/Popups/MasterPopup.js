import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import ConfigViewPopup from './ConfigViewPopup'
import GetStartedPopup from './GetStartedPopup'
import {
	getAllStates,
	getAllCategories,
	getAllServices,
	getAllPaymentTypes,
	getAllWorkIndustries,
	getAllNotifications,
	getUnreadMessageCount,
	getAllConversations,
	getUserPaymentPlan,
	getAllAmenities,
} from '../../redux/strapi_actions/view.action'
import {
	getAllSuggestionsByStatus,
	getAllMySuggestion,
	suggestThemForMe,
} from '../../redux/strapi_actions/alice.actions'
import NotificationPopup from './NotificationPopup'
import AppUpdatePopup from './AppUpdatePopup'
import { setUserOnline } from '../../redux/strapi_actions/auth.actions'
import { useInterval } from 'react-use'
import Global from '../../Global'
import { getAllRecentProperties } from '../../redux/strapi_actions/properties.action'
import LocationUpdatePopup from './LocationUpdatePopup'
import UserService from '../../services/UserService'
import GetMoreInfoPopup from './GetMoreInfoPopup'

const MasterPopup = (props) => {
	const { user } = useSelector((state) => state.auth)
	const { services, categories } = useSelector((state) => state.view)
	const dispatch = useDispatch()

	const getForViews = () => {
		if (services.length === 0 && categories.length === 0) {
			dispatch(getAllStates())
			dispatch(getAllCategories())
			dispatch(getAllServices())
			dispatch(getAllPaymentTypes())
			dispatch(getAllWorkIndustries())
			dispatch(getAllRecentProperties())
			dispatch(getAllAmenities())
		}
	}

	const getMessageStuffs = () => {
		if (user && !user?.user?.deactivated) {
			dispatch(getUnreadMessageCount())
			dispatch(getAllConversations())
		}
	}

	const getForUser = () => {
		if (user && !user?.user?.deactivated) {
			dispatch(getAllNotifications())
			dispatch(getAllMySuggestion())
			dispatch(suggestThemForMe())

			dispatch(getAllSuggestionsByStatus('accepted'))
			dispatch(getUserPaymentPlan())
			UserService.updateProfile({ last_seen: new Date() })
		}
	}

	useEffect(() => {
		getForViews()
		if (user) {
			dispatch(setUserOnline())
			dispatch(getUserPaymentPlan())
			getMessageStuffs()
		}
	}, [])

	useEffect(() => {
		setInterval(() => {
			getForViews()
		}, 20000)
	}, [services, categories])

	useEffect(() => {
		if (user) {
			getForUser()
		} else {
			getForViews()
		}
	}, [user])

	// useInterval(() => {
	// 	if (user) {
	// 		// dispatch(getAllMySuggestion())
	// 		// dispatch(suggestThemForMe())
	// 		// dispatch(getAllNotifications())
	// 		// dispatch(getUnreadMessageCount())
	// 	}
	// }, 60000)
	useInterval(() => {
		if (user) {
			dispatch(setUserOnline())
			getMessageStuffs()
		}
	}, 200000)

	if (user) {
		return (
			<>
				<ConfigViewPopup />
				<GetStartedPopup />
				<GetMoreInfoPopup />
				{Global.PLATFORM !== 'iPhone' && (
					<>
						{' '}
						{/* <NotificationPopup /> */}
						<LocationUpdatePopup />
					</>
				)}
				<AppUpdatePopup />
			</>
		)
	} else {
		return null
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPopup)
