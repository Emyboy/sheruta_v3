import { Avatar } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import ChatCard from './ChatCard'

export default function IncomingChat({ data }) {
	const { user } = useSelector((state) => state.auth)

	const _user = data?.from

	return (
		<div>
			<div className="d-flex mb-2">
				<div className="px-2">
					<Avatar src={_user?.avatar_url} />
				</div>
				<ChatCard data={data} />
			</div>
		</div>
	)
}
