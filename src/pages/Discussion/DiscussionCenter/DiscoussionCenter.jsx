import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import DiscussionCenterHeader from './DiscussionCenterHeader'

import Global from '../../../Global'
import { useParams } from 'react-router'
import DiscussionChatList from './DiscussionChatList'
import DiscussionChatInput from './DiscussionChatInput'

export default function DiscussionCenter() {
	const { user } = useSelector((state) => state.auth)
	const { room_id } = useParams()
	const [newMessages, setNewMessages] = useState(null)

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
				className={`bg-white p-3 border-top  ${
					Global.isMobile && 'fixed-bottom app-footer'
				}`}
				style={
					Global.isMobile
						? { position: 'absolute', bottom: 0, left: 0, right: 0 }
						: null
				}
			>
				<DiscussionChatInput onSend={(e) => setNewMessages(e)} />
			</div>
		</div>
	)
}
