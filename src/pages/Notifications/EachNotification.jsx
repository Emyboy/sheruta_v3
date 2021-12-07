import moment from 'moment'
import React, { useEffect } from 'react'
import Global from '../../Global'
import Notifications from '../../services/Notifications'

export default function EachNotification({ data }) {
	const otherUser = data?.users_permissions_user
	const user = data?.owner
	useEffect(async () => {
		try {
			if (!data?.seen) {
				setTimeout(() => {
					Notifications.markNotificationAsSeen(data?.id)
				}, 2000)
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}, [data])
	return (
		<li className="border-bottom">
			<a
				href="#"
				className={`d-flex align-items-center p-3 rounded-3 ${
					!data?.seen && 'bg-lightblue'
				} theme-light-bg`}
			>
				<img
					src={otherUser?.avatar_url || Global.USER_PLACEHOLDER_AVATAR}
					alt="user"
					className="w45 me-3 rounded-3"
				/>
				{/* <i className="feather-heart text-white bg-red-gradiant me-2 font-xssss notification-react"></i> */}
				<h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20">
					<strong>{otherUser?.first_name}</strong>: {data?.title}{' '}
					<span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto">
						{' '}
						{moment(data?.created_at).fromNow()}
					</span>{' '}
				</h6>
				{!data?.seen && (
					<small className="badge badge-success text-grey-900 ms-auto">
						New
					</small>
				)}
			</a>
		</li>
	)
}
