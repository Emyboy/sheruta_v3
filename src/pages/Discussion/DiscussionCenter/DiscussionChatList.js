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

export default function DiscussionChatList({ newMessage }) {
	const { room_id, message_id } = useParams()
	const [messages, setMessages] = useState([])
	const { user } = useSelector((state) => state.auth)

	const getRecentMessages = useCallback(async () => {
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
			if (!message_id) {
				document.getElementById('chat-end').scrollIntoView()
			} else {
				setTimeout(() => {
					document.getElementById(`reply-${message_id}`).scrollIntoView({
						behavior: 'smooth',
					})
				}, 1000)
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}, [room_id, message_id])

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
		getRecentMessages()
	}, [getRecentMessages])

	const getNewMessages = async () => {
		if (messages.length > 0) {
			try {
				const res = await axios(
					process.env.REACT_APP_API_URL +
						`/messages/?location_keyword=${room_id}&id_gt=${
							messages[messages.length - 1]?.id
						}&_sort=created_at:ASC`
				)
				if(res.data.length > 0){
					if(messages.includes("break")){
						setMessages([...messages,  ...res.data])
					}else {
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
			setTimeout(() => {
				getRecentMessages()
			}, 15000);
		}
	}, 20000)

	return (
		<div>
			{messages.map((val, i) => {
				if (typeof val === 'string') {
					console.log('THE VAL STRING --', val)
					return (
						<div className="container d-flex justify-content-center mt-5 mb-4">
							<button
								type="button"
								class="btn btn-sm bg-theme-light shadow-sm text-dark fw-500"
							>
								New Messages <br /> 👇🏽
							</button>
						</div>
					)
				}
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
