import React from 'react'
import DiscussionInfo from './DiscussionInfo'
import DiscussionPropertiesDemo from './DiscussionPropertiesDemo'
import { Divider } from 'antd'
import DiscussionRightUsers from './DiscussionRightUsers'
import Global from '../../../Global'
import { useWindowSize } from 'react-use'
import { useSelector } from 'react-redux'

export default function DiscussionRight() {
	const width = useWindowSize().width
	const { showDetails } = useSelector((state) => state?.group)
	return (
		<div
			className={`bg-white border-left scroll-bar pb-5 bg-gray  ${
				width < 1199 &&
				`right-chat nav-wrap right-scroll-bar ${
					showDetails && 'active-sidebar'
				} shadow`
			}`}
			style={{ maxHeight: '99vh', padding: 0, paddingTop: '0px', zIndex: 70 }}
		>
			<DiscussionInfo />
			{/* <Divider /> */}
			<DiscussionPropertiesDemo />
			<DiscussionRightUsers />
			<div style={{ paddingTop: Global.isMobile ? '10vh' : '5vh' }} />
		</div>
	)
}
