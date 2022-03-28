import React from 'react'
import { IoMail, IoCallSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import Global from '../../Global'
// import store from '../../redux/store/store'
import Analytics, { AnalyticsTypes } from '../../services/Analytics'
// import NotificationService from '../../services/Notifications'
// import { notifyEmy } from '../../services/Sheruta'


export default function UserAction({ user, disable, alignment, className }) {
	const auth = useSelector((state) => state.auth)
	// const { payment_plan } = useSelector((state) => state.view)
	const deactivated = user?.deactivated

	const recordCallAnalytics = (type) => {
		Analytics.create({ user_id: user?.id, type })
	}

	const handleButtonClicks = (action) => {
		recordCallAnalytics(AnalyticsTypes.calls);
		
		// if (!payment_plan) {
		// 	store.dispatch({
		// 		type: 'SET_VIEW_STATE',
		// 		payload: {
		// 			showPaymentPopup: true,
		// 		},
		// 	})
		// 	recordCallAnalytics(AnalyticsTypes.declinedCalls)
		// 	notifyEmy({
		// 		heading: ` ${action} ${user?.first_name} ${user?.last_name} but hasn't paid ( Blocked )`,
		// 	})
		// 	NotificationService.notifyUser({
		// 		owner: user?.id,
		// 		sub_title: 'this action was blocked',
		// 		type: `${action === 'message' ? 'message_attempt' : 'call_attempt'}`,
		// 	})
		// } else {
		// 	recordCallAnalytics(AnalyticsTypes.calls)
		// 	notifyEmy({
		// 		heading: ` ${action} ${user?.first_name} ${user?.last_name}`,
		// 	})
		// }
	}

	if (deactivated || auth.user && auth.user?.user?.deactivated) {
		return null
	}

	return (
		<>
			{auth.user && auth.user?.user?.id === user?.id ? null : (
				<div className={`d-flex justify-content-${alignment || 'center'} ${className && className}`}>
					<Link
						to={`/messages/new/${user?.id}`}
						// onClick={() => handleButtonClicks('message')}
						className="mr-3"
					>
						<button
							disable={disable}
							className="btn shadow bg-theme text-white rounded ml-2 mr-2"
						>
							<IoMail className="mr-2" />
							Message
						</button>
					</Link>{' '}
					<a
						href={`tel:${user?.phone_number}`}
						className="ml-3"
					>
						<button
							disabled={disable}
							onClick={() => handleButtonClicks('called')}
							className="btn shadow bg-theme text-white rounded mr-2"
						>
							<IoCallSharp className="mr-2" />
							Call Me
						</button>
					</a>
				</div>
			)}
		</>
	)
}
