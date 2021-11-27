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
import { notifyEmy } from '../../services/Sheruta'
import { Link } from 'react-router-dom'

export default function MessageDetails({ conversation_id }) {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const { user } = useSelector((state) => state.auth)
	const [conversation, setConversation] = useState(null)
	const [otherUser, setOtherUser] = useState(null)
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
			const msgs = await MessageService.getConversationMessages(conversation.id)
			setMessages(msgs.data)
			// executeScroll()
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
		}, 1000)
	}, [])

	useEffect(() => {
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
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

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
			const sent = await MessageService.sendMessage({
				to: otherUser,
				from: user.user.id,
				message_text: message,
				seen: false,
				conversation: conversation.id,
			})
			if (sent) {
				messages.push(sent.data)
				setMessage('')
				executeScroll()
				notifyEmy({
					heading: `sent a message to ${sent.data.to.first_name} saying >> ${sent.data.message_text} <<`,
				})
			}
		} catch (error) {
			notifyEmy({
				heading: 'Error sending message',
				log: error,
				status: 'error',
			})
			Promise.reject(error)
		}
	}

	return (
		<div className="row">
			<div className="col-lg-12 position-relative">
				<div
					className="chat-wrapper pt-0 w-100 position-relative  bg-white theme-dark-bg border rounded"
					style={{ height: '85vh' }}
				>
					{otherUser && (
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
									<small className="time text-muted">@{otherUser.username}</small>
								</Link>
							</div>
							<a href={`tel:${otherUser.phone_number}`}>
								<button className="btn btn-sm">
									<IoCallSharp size={25} className="text-theme" />
								</button>
							</a>
						</div>
					)}

					<div className="scroll-bar" style={{ height: '65vh', zIndex: 0 }}>
						<div className="chat-body p-3 ">
							<div className="messages-content pb-5">
								{messages.map((val, i) => {
									return <EachMessage message={val} key={`msg-${i}`} />
								})}

								<div id="end" className="clearfix"></div>
							</div>
						</div>
					</div>
				</div>
				<div
					className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg border"
					style={{ width: '95%', zIndex: 4 }}
				>
					<form
						className="chat-form d-flex justify-content-between"
						onSubmit={handleSubmit}
					>
						{/* <button className="bg-grey float-left">
                            <i className="ti-microphone text-grey-600"></i>
                        </button> */}
						<div className=" w-100">
							<textarea
								type="text"
								value={message}
								autoFocus
								placeholder="Start typing.."
								className="text-black w-100 p-1"
								onChange={(e) => setMessage(e.target.value)}
								// cols="40"
								rows={inputRows}
								style={{
									borderRadius: message.length > 40 ? '7px' : '50px',

									// borderTopRightRadius: 0,
									// borderBottomRightRadius: 0,
								}}
							/>
						</div>
						<button
							className="bg-current align-self-center"
							type="submit"
							style={{ width: '50px' }}
						>
							<i className="ti-arrow-right text-white"></i>
						</button>
					</form>
				</div>
			</div>
		</div>
		// {/* <div className="card rounded-3 rounded border border-gray shadow">
		//     {otherUser && (
		//         <div
		//             className={`user_heading ${
		//                 Global.isMobile ? "p-2" : "pl-2 p-3 "
		//             }`}
		//         >
		//             <a className="shadow">
		//                 <div className="wrap">
		//                     <div
		//                         className="d-flex justify-content-between"
		//                         style={{ alignItems: "center" }}
		//                     >
		//                         <div
		//                             className="d-flex"
		//                             style={{ alignItems: "center" }}
		//                         >
		//                             <button
		//                                 className="btn btn-sm pl-0"
		//                                 onClick={() =>
		//                                     history.push("/messages")
		//                                 }
		//                             >
		//                                 <IoIosArrowBack size={20} />
		//                             </button>
		//                             <img
		//                                 className="img-fluid"
		//                                 src={otherUser.avatar_url}
		//                                 width={Global.isMobile ? "40" : "50"}
		//                                 alt="s5.jpg"
		//                             />
		//                             <div className="meta">
		//                                 <h5 className="name">
		//                                     {otherUser.first_name}{" "}
		//                                     {otherUser.last_name}
		//                                 </h5>
		//                                 <p className="preview">

		//                                     {otherUser.username}
		//                                 </p>
		//                             </div>
		//                         </div>
		//                         <a href={`tel:${otherUser.phone_number}`}>
		//                             <button className="btn btn-sm">
		//                                 <IoCallSharp
		//                                     size={25}
		//                                     className="text-theme"
		//                                 />
		//                             </button>
		//                         </a>
		//                     </div>
		//                 </div>
		//             </a>
		//         </div>
		//     )}
		//     <div
		//         className="inbox_chatting_box border-bottom bg-them-light"
		//         style={{ height: "70vh" }}
		//     >
		//         <ul
		//             className={`chatting_content ${
		//                 Global.isMobile ? "p-1" : ""
		//             }`}
		//             style={{ marginBottom: Global.isMobile ? "30vh" : "10vh" }}
		//         >
		//             {messages.map((val, i) => {
		//                 return <EachMessage message={val} key={`msg-${i}`} />;
		//             })}
		//             <h6 className="text-muted text-center pt-3">The End</h6>
		//         </ul>
		//         <div id="end" ref={myRef}></div>
		//     </div>
		//     <div
		//         className="mi_text bg-white"
		//         style={
		//             Global.isMobile
		//                 ? {
		//                       position: "fixed",
		//                       width: "100vw",
		//                       bottom: "9%",
		//                   }
		//                 : null
		//         }
		//     >
		//         <div className="message_input_">
		//             <form
		//                 className="form-inline border-top"
		//                 onSubmit={handleSubmit}
		//             >
		//                 <div className="d-flex w-100">
		//                     <textarea
		//                         className="bg-them-light p-2 border-gray ml-1 mt-2 mb-2 mr-0 mb-4 w-100"
		//                         type="text"
		//                         placeholder="Enter message here..."
		//                         aria-label="Message"
		//                         value={message}
		//                         autoFocus
		//                         cols="40"
		//                         rows={inputRows}
		//                         style={{
		//                             zIndex: 0,
		//                             borderRadius:
		//                                 message.length > 90 ? "2px" : "50px",

		//                             borderTopRightRadius: 0,
		//                             borderBottomRightRadius: 0,
		//                         }}
		//                         onChange={(e) => setMessage(e.target.value)}
		//                     />
		//                     <button
		//                         className="btn-sm btn bg-theme text-white mb-3 mr-1"
		//                         style={{
		//                             height: "45px",
		//                             alignSelf: "center",
		//                             borderTopRightRadius: "15px",
		//                             borderBottomRightRadius: "15px",
		//                             borderTopLeftRadius: "0px",
		//                             borderBottomLeftRadius: "0px",
		//                         }}
		//                         type="submit"
		//                     >
		//                         <FiSend size={20} />
		//                     </button>
		//                 </div>

		//             </form>
		//         </div>
		//     </div>
		// </div> */}
	)
}
