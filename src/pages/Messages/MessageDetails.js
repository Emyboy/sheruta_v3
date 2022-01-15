import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Global from '../../Global'
import EachMessage from './EachMessage'
import { IoIosArrowBack } from 'react-icons/io'
import { IoCallSharp } from 'react-icons/io5'
import { useHistory } from 'react-router'
import MessageService from '../../services/MessageService'
import { useInterval } from 'react-use'
import { FiSend } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PaymentAlert from '../../components/PaymentAlert/PaymentAlert'
import { notifyEmy } from '../../services/Sheruta'
import Analytics, { AnalyticsTypes } from '../../services/Analytics'
import styled from 'styled-components'
import { Dots } from 'react-activity'
import moment from 'moment';

const Wrapper = styled.div`
	@media (max-width: 576px) {
		.card-footer {
			position: fixed;
			bottom: 10vh;
			width: 100%;
			z-index: 40;
			padding-top: 10px;
			padding-bottom: 10px;
		}
	}
`

export default function MessageDetails({ conversation_id }) {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const { user } = useSelector((state) => state.auth)
	const { payment_plan } = useSelector((state) => state.view)
	const [conversation, setConversation] = useState(null)
	const [otherUser, setOtherUser] = useState(null)
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const myRef = React.createRef()
	const [inputRows, setInputRows] = useState('2')

	// const conversation_id = props.match.params.conversation_id;

	const executeScroll = () => {
		console.log('HERE WE GO')
		// Bring this back :
		document.getElementById('end').scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest',
		})
	}

	const getMessages = async () => {
		if (conversation && conversation_id) {
			try {
				const msgs = await MessageService.getConversationMessages(
					conversation.id
				)
				setMessages(msgs.data)
				setLoading(false)
				// executeScroll()
				return Promise.resolve(msgs)
			} catch (error) {
				return Promise.reject(error)
			}
		}
	}

	useEffect(() => {
		if (message.length > 40) {
			setInputRows('3')
		} else if (message.length > 140) {
			setInputRows('5')
		} else {
			setInputRows('1')
		}
	}, [message])

	useEffect(() => {
		if (messages.length > 5) {
			setTimeout(() => {
				executeScroll()
			}, 90)
		}
		setTimeout(() => {
			executeScroll()
		}, 1700)
	}, [])

	const getConversation = () => {
		setLoading(true)
		axios(
			process.env.REACT_APP_API_URL + `/conversations/?uuid=${conversation_id}`
		)
			.then((res) => {
				if (res.data[0].owner.id !== user.user.id) {
					setOtherUser(res.data[0].owner)
				} else {
					setOtherUser(res.data[0].guest)
				}
				setConversation(res.data[0])
				// executeScroll()
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setLoading(false)
			})
	}

	useEffect(() => {
		getConversation()
	}, [conversation_id])

	useEffect(async () => {
		if (conversation && conversation_id) {
			const msgs = await MessageService.getConversationMessages(conversation.id)
			setMessages(msgs.data)
			// executeScroll();
		}
	}, [conversation])

	useEffect(() => {
		getMessages()
	}, [conversation])

	useInterval(() => {
		if (conversation && conversation_id) {
			getMessages()
		}
	}, 10000)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (message === null || message === '') {
			return
		}
		try {
			setLoading(true)
			const sent = await MessageService.sendMessage({
				to: otherUser,
				from: user.user.id,
				message_text: message,
				seen: false,
				conversation: conversation.id,
			})
			Analytics.create({ user_id: otherUser, type: AnalyticsTypes.message })
			if (sent) {
				setLoading(false)
				messages.push(sent.data)
				setMessage('')
				executeScroll()
				notifyEmy({
					heading: `sent a message to ${sent.data.to.first_name} saying >> ${sent.data.message_text} <<`,
				})
			}
		} catch (error) {
			setLoading(false)
			notifyEmy({
				heading: 'Error sending message',
				log: error,
				status: 'error',
			})
			Promise.reject(error)
		}
	}

	if (!otherUser) {
		return (
			<div
				className="d-flex text-center justify-content-center"
				id="end"
				style={{ paddingTop: '30vh' }}
			>
				<Dots />
			</div>
		)
	}
	return (
		<Wrapper className="row h-100 justify-content-center">
			<div className="col-lg-12">
				{!payment_plan ? (
					<div id="end">
						<PaymentAlert message={`Can't view message`} />
					</div>
				) : (
					<div className="card h-100 shadow-md rounded-xxl">
						<div className="card-header pl-0 pr-0 pb-0">
							{otherUser?.deactivated ? (
								<div className="text-center fw-bold text-danger w-100 p-4">
									Account Deactivated
								</div>
							) : (
								<div className="message-user border-bottom w-100 d-flex p-2 align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<figure className="avatar mr-3 mb-0">
											<img
												src={otherUser.avatar_url}
												alt="image"
												width="50"
												className="rounded-circle"
											/>
										</figure>
										<Link to={`/user/${otherUser.username}`}>
											<h4 className="mb-0 text-black">
												<b> {otherUser.first_name}</b>
											</h4>
											<small className="time text-muted">
												last seen: {moment(otherUser.last_seen).fromNow()}
											</small>
										</Link>
									</div>
									<a href={`tel:${otherUser.phone_number}`}>
										<button className="btn btn-sm">
											<IoCallSharp size={25} className="text-theme" />
										</button>
									</a>
								</div>
							)}
						</div>
						<div className="card-body pt-0 pb-0">
							<div className="scroll-bar" style={{ height: '65vh', zIndex: 0 }}>
								<div className="chat-body p-3 ">
									<div className="messages-content pb-5">
										{messages.map((val, i) => {
											return <EachMessage message={val} key={`msg-${i}`} />
										})}

										<div className="clearfix"></div>
									</div>
								</div>
								<div id="end"></div>
							</div>
						</div>
						<form
							className="card-footer chat-form d-flex justify-content-between align-items-center"
							onSubmit={handleSubmit}
						>
							{otherUser?.deactivated ? (
								<div className="text-center fw-bold text-danger w-100 p-4">
									Account Deactivated
								</div>
							) : (
								<>
									<textarea
										type="text"
										value={message}
										autoFocus
										placeholder="Start typing.."
										className="text-black w-100 p-1"
										onChange={(e) => setMessage(e.target.value)}
										// cols="40"
										disabled={loading}
										rows={inputRows}
										style={{
											borderRadius: message.length > 40 ? '7px' : '50px',
											// borderTopRightRadius: 0,
											// borderBottomRightRadius: 0,
										}}
									/>
									<button
										className="bg-current align-self-center"
										type="submit"
										style={{ width: '50px' }}
										disabled={loading}
									>
										<i className="ti-arrow-right text-white"></i>
									</button>
								</>
							)}
						</form>
					</div>
				)}
			</div>
		</Wrapper>
	)

	// return (
	// 	<div className="row">
	// 		{!payment_plan ? (
	// 			<div className="col-lg-12 position-relative mt-5" id="end">
	// 				<PaymentAlert message={'Subscribe to send messages'} />
	// 			</div>
	// 		) : (
	// 			<div className="col-lg-12 position-relative">
	// 				<div
	// 					className="chat-wrapper pt-0 w-100 position-relative  bg-white theme-dark-bg border rounded"
	// 					style={{ height: Global.isMobile ? '75vh' : '85vh' }}
	// 				>
	// 					{otherUser && (
	// 						<div className="message-user border-bottom w-100 d-flex p-2 align-items-center justify-content-between">
	// 							<div className="d-flex align-items-center">
	// 								<figure className="avatar mr-3 mb-0">
	// 									<img
	// 										src={otherUser.avatar_url}
	// 										alt="image"
	// 										width="50"
	// 										className="rounded-circle"
	// 									/>
	// 								</figure>
	// 								<Link to={`/user/${otherUser.username}`}>
	// 									<h4 className="mb-0 text-black">
	// 										<b> {otherUser.first_name}</b>
	// 									</h4>
	// 									<small className="time text-muted">
	// 										@{otherUser.username}
	// 									</small>
	// 								</Link>
	// 							</div>
	// 							<a href={`tel:${otherUser.phone_number}`}>
	// 								<button className="btn btn-sm">
	// 									<IoCallSharp size={25} className="text-theme" />
	// 								</button>
	// 							</a>
	// 						</div>
	// 					)}

	// 					<div className="scroll-bar" style={{ height: '65vh', zIndex: 0 }}>
	// 						<div className="chat-body p-3 ">
	// 							<div className="messages-content pb-5">
	// 								{messages.map((val, i) => {
	// 									return <EachMessage message={val} key={`msg-${i}`} />
	// 								})}

	// 								<div className="clearfix"></div>
	// 							</div>
	// 						</div>
	// 						<div id="end"></div>
	// 					</div>
	// 				</div>
	// 				<div
	// 					className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg border"
	// 					style={{ width: '95%', zIndex: 4 }}
	// 				>
	// 					<form
	// 						className="chat-form d-flex justify-content-between"
	// 						onSubmit={handleSubmit}
	// 					>
	// 						{/* <button className="bg-grey float-left">
	//                         <i className="ti-microphone text-grey-600"></i>
	//                     </button> */}
	// 						<div className=" w-100">
	// 							<textarea
	// 								type="text"
	// 								value={message}
	// 								autoFocus
	// 								placeholder="Start typing.."
	// 								className="text-black w-100 p-1"
	// 								onChange={(e) => setMessage(e.target.value)}
	// 								// cols="40"
	// 								disabled={loading}
	// 								rows={inputRows}
	// 								style={{
	// 									borderRadius: message.length > 40 ? '7px' : '50px',

	// 									// borderTopRightRadius: 0,
	// 									// borderBottomRightRadius: 0,
	// 								}}
	// 							/>
	// 						</div>
	// 						<button
	// 							className="bg-current align-self-center mb-2"
	// 							type="submit"
	// 							style={{ width: '50px' }}
	// 							disabled={loading}
	// 						>
	// 							<i className="ti-arrow-right text-white"></i>
	// 						</button>
	// 					</form>
	// 				</div>
	// 			</div>
	// 		)}
	// 	</div>
	// )
}
