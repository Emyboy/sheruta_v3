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

const MasterPopup = (props) => {
	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getAllStates())
		dispatch(getAllCategories())
		dispatch(getAllServices())
		dispatch(getAllPaymentTypes())
		dispatch(getAllWorkIndustries())
		if (user) {
			dispatch(setUserOnline())
			dispatch(getUserPaymentPlan())
		}
	}, [])

	useEffect(() => {
		if (user) {
			dispatch(getAllNotifications())
			dispatch(getAllMySuggestion())
			dispatch(suggestThemForMe())
			dispatch(getUnreadMessageCount())
			dispatch(getAllConversations())
			dispatch(getAllSuggestionsByStatus('accepted'))
			dispatch(getUserPaymentPlan())
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
			dispatch(setUserOnline());
		}
	}, 100000)

	if (user) {
		return (
			<>
				<ConfigViewPopup />
				<GetStartedPopup />
				{Global.PLATFORM !== 'iPhone' && <NotificationPopup />}
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
