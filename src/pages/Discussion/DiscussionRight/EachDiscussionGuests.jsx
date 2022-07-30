import React from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function EachDiscussionGuest({ active }) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user

	return (
		<Link
			to="/discussion/room/45255456"
			className={`p-2 border-bottom w-100 list-group-item list-group-item-action ${
				active ? 'bg-theme-light border-1 border-success' : 'bg-white'
			}`}
		>
			<div className="d-flex justify-content-between">
				<div className="d-flex align-items-center">
					<div>
						<div
							className={_user?.is_online ? 'bg-danger' : 'bg-success'}
							style={{ borderRadius: '50px', padding: 3 }}
						>
							<Avatar src={_user.avatar_url} size={60} className="m-0" />
						</div>
					</div>
					<div className="pl-2">
						<h4>{_user.first_name}</h4>
						<small className="text-muted">
							<i>₦ 400,000 Budget</i>
						</small>
					</div>
				</div>
				<div
					style={{ flexDirection: 'column' }}
					className="d-flex justify-content-between"
				>
					<small>
						<i>11 hours ago</i>
					</small>
					{/* <small className="bg-danger text-white align-self-end rounded-xxl pl-1 pr-1">
						43
					</small> */}
				</div>
			</div>
		</Link>
	)
}
