import React, { useEffect } from 'react'
import { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import MessageService from '../../../services/MessageService'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setGroupState } from '../../../redux/strapi_actions/group.action'
import { notifyEmy } from '../../../services/Sheruta'
import Analytics, { AnalyticsTypes } from '../../../services/Analytics'
import { useRef } from 'react'

export default function DiscussionChatInput({ onSend }) {
	const { room_id } = useParams()
	const { user } = useSelector((state) => state.auth)
	const [loading, setLoading] = useState(false)
	const [newMessage, setNewMessage] = useState('')
	const { reply } = useSelector((state) => state?.group)
	const { app_details, payment_plan } = useSelector((state) => state?.view)
	const dispatch = useDispatch()

	const inputRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (payment_plan || app_details?.everything_free) {
			setLoading(true)
			try {
				const res = await MessageService.sendMessage({
					message_text: newMessage,
					location_keyword: room_id,
					from: user?.user?.id,
					reply,
					seen: true,
					to: reply ? reply?.from?.id : null,
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
		} else {
			dispatch({
				type: 'SET_VIEW_STATE',
				payload: {
					showPaymentPopup: true,
				},
			})
		}
	}

	useEffect(() => {
		if(reply){
			inputRef.current.focus()
		}
	},[reply])

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
				ref={inputRef}
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
