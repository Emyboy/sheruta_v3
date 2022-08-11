import { Avatar } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function RecentGroupMsgAds() {
	const { personal_info } = useSelector((state) => state.view)

	const show = personal_info?.location_keyword && personal_info?.state
	const [message, setMessage] = useState(null)

	const getRecentMessage = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/messages/?location_keyword=${personal_info?.location_keyword?.id}&_limit=1&_sort=created_at:DESC`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			if (!res.data[0]?.is_notification) {
				setMessage(res.data[0])
			}
		} catch (error) {
			console.log(error)
			return Promise.reject(error)
		}
	}, [personal_info?.location_keyword?.id])

	useEffect(() => {
		if (show) {
			getRecentMessage()
		}
	}, [getRecentMessage, show])

	if (!show || !message) {
		return null
	}

	return (
		<div>
			<hr />
			<h4 className="text-grey-600 mt-4 fw-500">
				Recent message on {personal_info?.location_keyword?.name} group
			</h4>
			<div className="card mb-4 rounded-xxl p-3 bg-accent">
				<div className="comments-list">
					<div className="d-flex align-items-center">
						<Avatar
							src={message?.from?.avatar_url}
							alt="image"
							size={45}
							className="mr-2"
						/>
						<div>
							<h4 className="m-0 text-grey-500">{message?.from?.first_name}</h4>
							<small className="text-grey-600">
								@{message?.from?.username}
							</small>
						</div>
					</div>
					<p className="mt-2 text-grey-200">
						{message?.message_text.replace(/<\/?[^>]+(>|$)/g, '')}
					</p>
					<Link
						to={`/discussion/room/${personal_info?.location_keyword?.id}/${message?.id}`}
						className="reply-btn text-grey-500"
					>
						<i className="bx bx-reply"></i>View More
					</Link>
				</div>
			</div>
			<hr />
		</div>
	)
}
