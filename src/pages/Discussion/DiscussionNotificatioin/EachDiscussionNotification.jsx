import React from 'react'
import { Divider } from 'antd'

export default function EachDiscussionNotification({ notification }) {
	return (
		<div className=" mt-5 mb-5">
			<div className="d-flex align-items-center">
				<div className="border w-100" />
				<div style={{ minWidth: '400px', textAlign: 'center' }}>
					<i className="text-grey-500 ml-2 mr-3 text-center">{notification}</i>
				</div>
				<div className="border w-100" />
			</div>
		</div>
	)
}
