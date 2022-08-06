import React from 'react'
import { Divider } from 'antd'
import Global from '../../../Global'
import renderHTML from 'react-render-html'

export default function EachDiscussionNotification({ notification }) {
	return (
		<div className=" mt-5 mb-5">
			<div className="d-flex align-items-center">
				<div className="border w-100" />
				<div
					style={{
						minWidth: Global.isMobile ? '250px' : '400px',
						textAlign: 'center',
					}}
				>
					<i className="text-grey-500 ml-2 mr-3 text-center">
						{renderHTML(notification)}
					</i>
				</div>
				<div className="border w-100" />
			</div>
		</div>
	)
}
