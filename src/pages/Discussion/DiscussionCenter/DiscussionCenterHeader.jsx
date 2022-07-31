import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { FiInfo } from 'react-icons/fi'
import { useParams } from 'react-router'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const iconSize = 24

export default function DiscussionCenterHeader() {
	const { room_id } = useParams()
	const { location_keywords } = useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user

	const data = location_keywords.filter((x) => x.id == room_id)

	return (
		<header className="bg-white border-bottom p-2 d-flex justify-content-between animate__fadeInDown animate__animated">
			<div className="d-flex align-items-center">
				<button className="btn btn-sm mr-3">
					<AiOutlineArrowLeft size={iconSize} className="text-grey-600" />
				</button>
				<Avatar src={data[0]?.background_img} size={50} />
				<div className="pl-2">
					<h3>{data[0]?.name} Room</h3>
					<small>
						<i>Josh is typing...</i>
					</small>
				</div>
			</div>
			<FiInfo size={iconSize} className="align-self-center text-grey-600" />
		</header>
	)
}
