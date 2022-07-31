import React from 'react'
import DiscussionInfo from './DiscussionInfo'
import DiscussionPropertiesDemo from './DiscussionPropertiesDemo'
import { Divider } from 'antd'
import DiscussionRightUsers from './DiscussionRightUsers'

export default function DiscussionRight() {
	return (
		<div
			className="bg-white border-left scroll-bar pb-5 bg-gray"
			style={{ maxHeight: '99vh' }}
		>
			<DiscussionInfo />
			{/* <Divider /> */}
			<DiscussionPropertiesDemo />
			<Divider />
			<DiscussionRightUsers />
		</div>
	)
}
