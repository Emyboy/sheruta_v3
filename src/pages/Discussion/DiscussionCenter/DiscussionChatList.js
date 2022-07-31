import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Global from '../../../Global'
import EachDiscussionNotification from '../DiscussionNotificatioin/EachDiscussionNotification'
import EachGroupMessage from '../EachDiscussionChat/EachGroupMessage'

export default function DiscussionChatList({ newMessage }) {
	const { room_id } = useParams()
	const [messages, setMessages] = useState([])
	const { user } = useSelector((state) => state.auth)

	const getRecentMessages = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL +
					`/messages/?location_keyword=${room_id}`,
				{
					headers: {
						authorization: `Bearer ${Cookies.get('token')}`,
					},
				}
			)
			setMessages(res.data)
			document.getElementById('chat-end').scrollIntoView()
		} catch (error) {
			return Promise.reject(error)
		}
	}, [room_id])

	useEffect(() => {
		if (newMessage) {
			setMessages([...messages, newMessage])
			document.getElementById('chat-end').scrollIntoView({
				behavior: 'smooth',
			})
		}
	}, [newMessage])

	useEffect(() => {
		getRecentMessages()
	}, [getRecentMessages])

	return (
		<div>
			{messages.map((val, i) => {
				return (
					<EachGroupMessage
						key={val.id}
						outgoing={user?.user?.id == val?.from?.id}
						data={val}
					/>
				)
			})}

			<EachDiscussionNotification
				notification={`dolorum explicabo aperiam tempora sed quo ut
							quisquam! Voluptate illum placeat inventore aliquam odio omnis
							aspernatur debitis libero `}
			/>
			<div
				style={{ paddingTop: Global.isMobile ? '30vh' : '15vh' }}
				id="chat-end"
			/>
		</div>
	)
}
