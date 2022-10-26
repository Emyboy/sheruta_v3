import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Global from '../../Global'
import store from '../../redux/store/store'
import { sendMessage, setChatState } from '../../redux/strapi_actions/chat.actions'
import Analytics, { AnalyticsTypes } from '../../services/Analytics'
import MessageService from '../../services/MessageService'
import { notifyEmy } from '../../services/Sheruta'
import DiscussionCenterHeader from '../Discussion/DiscussionCenter/DiscussionCenterHeader'
import DiscussionChatInput from '../Discussion/DiscussionCenter/DiscussionChatInput'
import ChatBobbles from './ChatBobbles'

export default function ChatCenter() {
	const { user } = useSelector((state) => state.auth)
	const { conversations } = useSelector((state) => state.view)
	const dispatch = useDispatch()

	const params = useParams()

	const { conversation_id } = params

	const active_conversation = conversations
		? conversations?.filter((x) => x.uuid == conversation_id)
		: []

	const _user =
		active_conversation[0]?.guest?.id == user?.user?.id
			? active_conversation[0]?.owner
			: active_conversation[0]?.guest


	const _handleSubmit = async (e) => {
		// e.preventDefault()
		if (!e?.message_text) {
			return null
		}
		try {
			setChatState({ sending: true })
			const sent = await MessageService.sendMessage({
				to: _user,
				from: user.user.id,
				message_text: e?.message_text,
				seen: false,
				conversation: active_conversation[0]?.id,
			})
			setChatState({
				messages: [
					...store.getState()?.chat?.messages,
					{ ...sent.data, new: true },
				],
			})
			setChatState({ sending: false })
			Analytics.create({ user_id: _user, type: AnalyticsTypes.message })
			if (sent) {
				notifyEmy({
					heading: `sent a message to ${sent.data.to.first_name} saying >> ${sent.data.message_text} <<`,
				})
			}
		} catch (error) {
			setChatState({ sending: false })
			notifyEmy({
				heading: 'Error sending message',
				log: error,
				status: 'error',
			})
			Promise.reject(error)
		}
	}

	return (
		<div
			className="d-flex flex-column justify-content-between"
			style={{ height: '100vh' }}
		>
			<DiscussionCenterHeader userData={_user} backURL="/messages" />
			<div
				className="d-flex flex-column algin-items-start justify-content-start scroll-bar pt-4"
				style={{ height: '100%', overflowX: 'hidden' }}
			>
				<ChatBobbles />
			</div>
			<div
				className={`bg-white p-3 border-top d-flex flex-column ${
					Global.isMobile && 'fixed-bottom app-footer'
				}`}
				style={
					Global.isMobile
						? { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 0 }
						: null
				}
			>
				<DiscussionChatInput standalone onSubmit={_handleSubmit} />
			</div>
		</div>
	)
}
