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
import Global from '../../../Global'

export default function DiscussionChatInput({
	onSend,
	standalone,
	onSubmit,
}) {
	const { room_id } = useParams()
	const { user } = useSelector((state) => state.auth)
	const { sending } = useSelector((state) => state?.chat)
	const [loading, setLoading] = useState(sending)
	const [newMessage, setNewMessage] = useState('')
	const { reply } = useSelector((state) => state?.group)
	const dispatch = useDispatch()

	const inputRef = useRef(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (standalone && onSubmit) {
			onSubmit({ message_text: newMessage });
			//TODO - Find a better solution
			setTimeout(() => {
				setNewMessage('')
			}, 100);
		} else {
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
			// if (payment_plan || app_details?.everything_free) {
			// } else {
			// 	dispatch({
			// 		type: 'SET_VIEW_STATE',
			// 		payload: {
			// 			showPaymentPopup: true,
			// 		},
			// 	})
			// }
		}
	}

	useEffect(() => {
		if (reply) {
			inputRef.current.focus()
		}
	}, [reply])

	return (
		<form
			className={`bg-grey p-2 rounded-xl d-flex w-100 align-items-center`}
			onSubmit={handleSubmit}
		>
			<textarea
				className="scroll-bar form-control border-0 bg-grey rounded-xl font-xs"
				placeholder="Start typing..."
				onChange={(e) => setNewMessage(e.target.value)}
				value={newMessage}
				ref={inputRef}
				rows={'1'}
				style={{
					height:
						newMessage.length > (Global.isMobile ? 30 : 160)
							? `${
									newMessage.length -
									(Global.isMobile ? 1 : 190) +
									(Global.isMobile ? 45 : 1)
							  }px`
							: '45px',
					lineHeight: '30px',
					maxHeight: '300px',
					resize: 'none',
				}}
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
