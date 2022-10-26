import React, { useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MessageService from '../../services/MessageService'
import Global from '../../Global'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function EachConversation({ conv, onClick, isActive, standalone }) {
	const [otherUser, setOtherUser] = useState(null)
	const { user } = useSelector((state) => state.auth)
	const { messages } = useSelector((state) => state.view)
	const [latestMsg, setLatestMsg] = useState('')
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (conv.owner.id === user.user.id) {
			setOtherUser(conv.guest)
		} else {
			setOtherUser(conv.owner)
		}
	}, [])

	useEffect(async () => {
		// try {
		//   const _count = await  MessageService.getConversationNewMessages(conv.id)
		//   setCount(_count.data)
		//   console.log('COUNT ---', count);
		// } catch (error) {

		// }
		setCount(messages.filter((x) => x.conversation?.id === conv?.id).length)
	}, [messages])

	useEffect(async () => {
		try {
			const latestMessage = await MessageService.getLatestConversationMessage(
				conv.id
			)
			setLatestMsg(
				latestMessage.data.length > 0 && latestMessage.data[0].message_text
			)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	if (!conv.guest.deactivated && !conv.owner.deactivated) {
		return (
			<li
				className={`bg-transparent list-group-item no-icon  pt-2 pb-2 border-0 d-flex align-items-center border border-bottom ${
					isActive && 'bg-theme-light'
				} ${standalone ? 'px-3' : 'pe-0 ps-0'}`}
				onClick={() => (onClick ? onClick() : {})}
			>
				<Link to={`/messages/${conv.uuid}`} className="w-100">
					{otherUser && (
						<div className="d-flex justify-content-between w-100 align-items-center">
							<div className="d-flex">
								<figure className="avatar float-left mb-0 me-2">
									<LazyLoadImage
										effect="blur"
										src={otherUser?.avatar_url}
										alt="image"
										className="w35 rounded-3"
									/>
								</figure>
								<div className="fw-700 mb-0 mt-0">
									<a className="pr-3 d-flex font-xssss text-grey-600 d-block text-dark model-popup-chat align-items-center">
										<b className="mr-2">
											{otherUser?.first_name?.split(' ')[0]}
										</b>
										<span
											className={`mt-0 shadow bg-${
												otherUser.online ? 'success' : 'danger'
											}  btn-round-xss`}
										></span>
									</a>
									<small
										className="m-0 text-muted"
										style={{ fontSize: '10px' }}
									>
										{latestMsg.length > 27
											? Global.isMobile
												? latestMsg.slice(0, 27) + '....'
												: latestMsg.slice(0, 27) + '....'
											: latestMsg || '....'}
									</small>
								</div>
							</div>
							{count !== 0 && (
								<span className="badge badge-danger text-white badge-pill mt-0">
									{count}
								</span>
							)}
						</div>
					)}
				</Link>
			</li>
		)
	} else {
		return null
	}
}

export default memo(EachConversation)
