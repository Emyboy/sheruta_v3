import React from 'react'
import DiscussionInfo from './DiscussionInfo'
import DiscussionPropertiesDemo from './DiscussionPropertiesDemo'
import { Divider } from 'antd'

export default function DiscussionRight() {
	return (
		<div className="bg-white border-left h-100">
			<DiscussionInfo />
			<Divider />
			<DiscussionPropertiesDemo />
		</div>
	)
}
