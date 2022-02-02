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
import {
	getUser
} from '../../redux/strapi_actions/auth.actions'
import NotificationPopup from './NotificationPopup'
import AppUpdatePopup from './AppUpdatePopup'
import { logout, setUserOnline } from '../../redux/strapi_actions/auth.actions'
import { useInterval } from 'react-use'
import Global from '../../Global'
import { getAllRecentProperties } from '../../redux/strapi_actions/properties.action'
import LocationUpdatePopup from './LocationUpdatePopup'
import UserService from '../../services/UserService'
import GetMoreInfoPopup from './GetMoreInfoPopup'
import Cookies from 'js-cookie'

const MasterPopup = (props) => {
	const token = Cookies.get('token')
	const { user } = useSelector((state) => state.auth)
	const { services, categories, personal_info } = useSelector((state) => state.view)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!Cookies.get('token')) {
			dispatch(logout())
		}
	}, [])

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
		if (user && !user?.user?.deactivated && token) {
			dispatch(getAllNotifications())
			dispatch(getAllMySuggestion())
			dispatch(suggestThemForMe(user?.user?.id))

			dispatch(getAllSuggestionsByStatus('accepted'))
			dispatch(getUserPaymentPlan())
		}
	}

	useEffect(() => {
		const _token = Cookies.get('token')
		if (localStorage.getItem('token')) {
			localStorage.clear()
			sessionStorage.clear()
			dispatch(logout())
			window.location.reload()
		}

		getForViews()
		if (user && _token) {
			dispatch(setUserOnline())
			dispatch(getUserPaymentPlan())
			getMessageStuffs()
			getForUser()
		}
	}, [])

	useEffect(() => {
		if(user){
			dispatch(getUserPaymentPlan())
		}
	}, [user])

	useInterval(() => {
		if (user) {
			getMessageStuffs()
			dispatch(getUser())
			dispatch(setUserOnline())
		}
	}, 120000)

	// FOR THINGS THAT COME IN FREQUENTLY
	useInterval(() => {
		getForUser();
		getMessageStuffs();
	},[60000])

	useEffect(() => {
		if(personal_info && personal_info?.nin){
			Cookies.set('has_nin',true)
		}
	}, [personal_info])

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
