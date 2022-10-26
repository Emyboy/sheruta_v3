import { Avatar } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChatCard from './ChatCard'

export default function OutGoingChat({ data, index }) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user

	useEffect(() => {
		if (data?.new) {
			setTimeout(() => {
				document.getElementById(index)?.scrollIntoView({
					behavior: 'smooth',
				})
			}, 100)
		}
	}, [data, index])

	return (
		<div id={index}>
			<div className="d-flex justify-content-end mb-2">
				<ChatCard outGoing data={data} />

				{/* <div className="px-2">
					<Avatar src={_user?.avatar_url} />
				</div> */}
			</div>
		</div>
	)
}
