import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { IoSend } from 'react-icons/io5'
import MessageService from '../../../services/MessageService'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setGroupState } from '../../../redux/strapi_actions/group.action'
import { notifyEmy } from '../../../services/Sheruta'
import Analytics, { AnalyticsTypes } from '../../../services/Analytics'

export default function DiscussionChatInput({ onSend }) {
	const { room_id } = useParams()
	const { user } = useSelector((state) => state.auth)
	const [loading, setLoading] = useState(false)
	const [newMessage, setNewMessage] = useState('')
	const { reply } = useSelector((state) => state?.group)
	const dispatch = useDispatch()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await MessageService.sendMessage({
				message_text: newMessage.replace(/[\+]?\d{10}|\(\d{3}\)\s?-\d{6}/, ''),
				location_keyword: room_id,
				from: user?.user?.id,
				reply,
				seen: true,
			})
			onSend({
				...res.data,
				new: true,
			})
			setNewMessage('')
			setLoading(false)
			notifyEmy({
				heading: `Sent group message saying >>${res.data.message_text}<<`,
				user: user.user.id,
			})
			Analytics.create({
				user_id: user.user.id,
				type: AnalyticsTypes.groupMessages,
			})
			dispatch(setGroupState({ reply: null }))
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	return (
		<form
			className={`bg-grey p-2 rounded-xl d-flex w-100 `}
			onSubmit={handleSubmit}
		>
			<input
				className="form-control border-0 bg-grey rounded-xl font-xs"
				placeholder="Start typing..."
				onChange={(e) => setNewMessage(e.target.value)}
				value={newMessage}
			/>
			<button
				className="btn bg-accent text-white align-self-start"
				style={{ borderRadius: '50px', height: '50px', width: '50px' }}
				disabled={newMessage.length === 0 || loading}
			>
				<IoSend size={24} />
			</button>
		</form>
	)
}
