import { notification } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { memo } from 'react'
import { useCallback } from 'react'
import { Spinner } from 'react-activity'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { setChatState } from '../../redux/strapi_actions/chat.actions'
import { getUnreadMessageCount } from '../../redux/strapi_actions/view.action'
import IncomingChat from './IncomingChat'
import OutgoingChat from './OutgoingChat'

export default memo(function ChatBobbles() {
	const params = useParams()
	const [conversation, setConversation] = useState(null)
	const { user } = useSelector((state) => state?.auth)
	const { chat_loading, messages } = useSelector((state) => state?.chat)
	const _auth_user = user?.user;
	const dispatch = useDispatch();

	const { conversation_id } = params

	const scrollToEnd = () => {
		const chat_end = document.getElementById('chat-end')
		if (chat_end) {
			chat_end.scrollIntoView()
		}
	}

	const getAllMessages = useCallback(async () => {
		console.log('GETTING MESSAGES')
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/messages/?conversation=${conversation?.id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			setChatState({ messages: res.data, chat_loading: false })
			scrollToEnd()
			dispatch(getUnreadMessageCount())
		} catch (error) {
			setChatState({ chat_loading: true })

			return Promise.reject(error)
		}
	}, [conversation?.id])

	const getConversation = useCallback(async () => {
		try {
			setChatState({ chat_loading: true })
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/conversations/?uuid=${conversation_id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			setConversation(res.data[0])
		} catch (error) {
			notification.error({ message: 'Error, please refresh page' })
			setChatState({ chat_loading: true })

			return Promise.reject(error)
		}
	}, [conversation_id])

	useEffect(() => {
		getConversation()
	}, [getConversation])

	useEffect(() => {
		getAllMessages()
	}, [conversation])

	return (
		<div style={{ paddingBottom: '20vh' }}>
			{/* <EachGroupMessage
				key={val.id}
				outgoing={user?.user?.id == val?.from?.id}
				data={val}
			/> */}
			{chat_loading ? (
				<div
					className="d-flex justify-content-center  align-items-center"
					style={{ height: '50vh' }}
				>
					<Spinner />
				</div>
			) : (
				<>
					{messages?.map((val) => {
						// console.log('VAL --', val)
						return val?.from?.id == _auth_user?.id ? (
							<OutgoingChat
								index={`msg-${val?.id}`}
								data={val}
								key={`msg-${val?.id}`}
							/>
						) : (
							<IncomingChat data={val} key={`msg-${val?.id}`} />
						)
					})}
				</>
			)}
			<div id="chat-end" />
		</div>
	)
})
