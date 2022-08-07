import { notification, Alert } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Global from '../../../Global'
import EachDiscussionNotification from '../DiscussionNotificatioin/EachDiscussionNotification'
import EachGroupMessage from '../EachDiscussionChat/EachGroupMessage'
import { useInterval } from 'react-use'
import DiscussionBreakPoint from '../DiscussionBreakPoint'
import { notifyEmy } from '../../../services/Sheruta'

export default function DiscussionChatList({ newMessage }) {
	const { room_id, message_id } = useParams()
	const [messages, setMessages] = useState([])
	const { user } = useSelector((state) => state.auth)
	const { location_keywords } = useSelector((state) => state.view)

	useEffect(() => {
		notifyEmy({
			heading: `Viewed ${location_keywords?.filter(x => x.id == room_id)[0]?.name} discussion room.`,
		})
	},[])

	const getRecentMessages = useCallback(
		async (scroll) => {
			try {
				const res = await axios(
					process.env.REACT_APP_API_URL +
						(message_id
							? `/messages/?location_keyword=${room_id}&id_gte=${
									message_id - 9
							  }&_sort=created_at:ASC`
							: `/messages/?location_keyword=${room_id}&_sort=created_at:ASC`),
					{
						headers: {
							authorization: `Bearer ${Cookies.get('token')}`,
						},
					}
				)
				// console.log('MSG --', res.data)
				setMessages(res.data)
				if (scroll) {
					document.getElementById('chat-end').scrollIntoView()
				}
				if (message_id) {
					setTimeout(() => {
						if (document.getElementById(`reply-${message_id}`)) {
							document.getElementById(`reply-${message_id}`).scrollIntoView({
								behavior: 'smooth',
							})
						} else {
							notification.error({ message: "Couldn't find the message 😥" })
						}
					}, 1000)
				}
			} catch (error) {
				return Promise.reject(error)
			}
		},
		[room_id, message_id]
	)

	useEffect(() => {
		if (newMessage) {
			setMessages([...messages, newMessage])
			if (!newMessage.reply) {
				document.getElementById('chat-end').scrollIntoView({
					behavior: 'smooth',
				})
			} else {
				notification.success({ message: 'Reply sent' })
			}
		}
	}, [newMessage])

	useLayoutEffect(() => {
		getRecentMessages(true)
	}, [getRecentMessages])

	const getNewMessages = async () => {
		if (messages.length > 0) {
			try {
				const res = await axios(
					process.env.REACT_APP_API_URL +
						`/messages/?location_keyword=${room_id}&id_gt=${
							messages[messages.length - 1]?.id
						}&_sort=created_at:ASC`,
					{
						headers: `Bearer ${Cookies.get('token')}`,
					}
				)
				if (res.data.length > 0) {
					if (messages?.includes('break')) {
						setMessages([...messages, ...res.data])
					} else {
						setMessages([...messages, 'break', ...res.data])
					}
				}
			} catch (error) {
				return Promise.reject(error)
			}
		} else {
			getRecentMessages()
		}
	}

	useInterval(() => {
		if (room_id) {
			console.log('CHECKING UPDATES')
			getNewMessages()
			// setTimeout(() => {
			// 	getRecentMessages(messages.length === 0)
			// }, 15000)
		}
	}, 50000)


	return (
		<div>
			{messages.map((val, i) => {
				if (typeof val === 'string') {
					return <DiscussionBreakPoint />
				}
				if(!val?.is_notification){
					return (
						<EachGroupMessage
							key={val.id}
							outgoing={user?.user?.id == val?.from?.id}
							data={val}
						/>
					)

				}else {
					return (
						<EachDiscussionNotification
							key={val?.id}
							notification={val?.message_text}
						/>
					)
				}
			})}

			<EachDiscussionNotification
				notification={`<strong>Welcome to ${
					location_keywords?.filter((x) => x?.id == room_id)[0]?.name
				} chat room.</strong>
<p class="text-grey-500 mb-3">Post your apartment and flatshare requests. You can also find users to team up with (Join paddy) & secure a space. </p>

<blockquote>"Topics beyond ${
					location_keywords?.filter((x) => x?.id == room_id)[0]?.name
				} are not allowed."</blockquote>`}
			/>
			<div
				style={{ paddingTop: Global.isMobile ? '30vh' : '15vh' }}
				id="chat-end"
			/>
		</div>
	)
}
