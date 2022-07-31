import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DiscussionCenterHeader from './DiscussionCenterHeader'

import Global from '../../../Global'
import DiscussionChatList from './DiscussionChatList'
import DiscussionChatInput from './DiscussionChatInput'
import { setGroupState } from '../../../redux/strapi_actions/group.action'
import DiscussionReplyPreview from './DiscussionReplyPreview'

export default function DiscussionCenter() {
	const { user } = useSelector((state) => state.auth)
	const [newMessages, setNewMessages] = useState(null)
	const { reply } = useSelector((state) => state?.group)

	const _user = user?.user
	return (
		<div
			className="bg-white d-flex flex-column justify-content-between"
			style={{ height: '99vh' }}
		>
			<DiscussionCenterHeader />
			<div
				className="d-flex flex-column algin-items-start justify-content-start scroll-bar pt-4"
				style={{ height: '100%' }}
			>
				<DiscussionChatList newMessage={newMessages} />
			</div>
			<div
				className={`bg-white p-3 border-top d-flex flex-column ${
					Global.isMobile && 'fixed-bottom app-footer'
				}`}
				style={
					Global.isMobile
						? { position: 'absolute', bottom: 0, left: 0, right: 0 }
						: null
				}
			>
				{reply && (
					<DiscussionReplyPreview />
				)}
				<DiscussionChatInput onSend={(e) => setNewMessages(e)} />
			</div>
		</div>
	)
}
