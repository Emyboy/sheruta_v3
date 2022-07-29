import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { HiDotsVertical } from 'react-icons/hi'

export default function DiscussionCenterHeader() {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user
	return (
		<header className="bg-white border-bottom p-2 d-flex justify-content-between animate__fadeInDown animate__animated">
			<div className="d-flex">
				<Avatar src={_user.avatar_url} size={50} />
				<div className="pl-2">
					<h3>Lekki Room</h3>
					<small>
						<i>Josh is typing...</i>
					</small>
				</div>
			</div>
			<HiDotsVertical size={24} className="align-self-center text-grey-600" />
		</header>
	)
}
