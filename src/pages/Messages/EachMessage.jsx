// import moment from 'moment'
// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import MessageService from '../../services/MessageService'
// import { IoTrash } from 'react-icons/io5'
// import ReactHtmlParser from 'react-html-parser'
// import ReactMarkdown from 'react-markdown'
// import styled from 'styled-components'
// import Global from '../../Global'

// const MgsWrapper = styled.div`
// 	p {
// 		margin-bottom: 0 !important;
// 		color: black !important;
// 		font-weight: 600;
// 	}
// 	ul,
// 	li {
// 		list-style-type: inherit !important;
// 	}
// 	p > img {
// 		width: '2px' !important;
// 		height: '2px' !important;
// 	}
// `

// const Wrapper = styled.article`
// 	img {
// 		size: 30px !important;
// 		width: ${Global.isMobile ? '104%' : '70%'};
// 		border-radius: 10px;
// 	}
// `

// export default function EachMessage({ message }) {
// 	const { user } = useSelector((state) => state.auth)

// 	useEffect(() => {
// 		if (!message.seen && message.to.id === user.user.id) {
// 			MessageService.updateMessageSeen(message.id)
// 		}
// 	}, [])

// 	return (
// 		<Wrapper>
// 			{message.from.id === user.user.id ? (
// 				<div className="message-item outgoing-message z-index-0 ml-0">
// 					<div className="message-user">
// 						<div>
// 							<div className="time">
// 								{moment(message.created_at).fromNow()}
// 								<i
// 									className={`${
// 										message.seen ? 'ti-double-check' : 'ti-check'
// 									} text-info`}
// 								></i>
// 							</div>
// 						</div>
// 					</div>
// 					<MgsWrapper
// 						className="message-wrap pt-1 pb-1 shadow-sm "
// 						// style={{ background: 'pink' }}
// 					>
// 						{message.message_html ? (
// 							ReactHtmlParser(message.message_html)
// 						) : (
// 							<ReactMarkdown>{message.message_text}</ReactMarkdown>
// 						)}
// 					</MgsWrapper>
// 					{/* <span className="badge badge-danger rounded-circle position-fixed p-1  mt-1">
// 						<IoTrash />
// 					</span> */}
// 				</div>
// 			) : (
// 				// receive
// 				<div
// 					className="message-item"
// 					style={{ minWidth: Global.isMobile ? '100px' : "'200px'",  }}
// 				>
// 					<div className="message-user">
// 						<div>
// 							{/* <h5>Byrom Guittet</h5> */}
// 							<div className="time">{moment(message.created_at).fromNow()}</div>
// 						</div>
// 					</div>
// 					<MgsWrapper className="bg-them-light rounded p-2 shadow text-black">
// 						{message.message_html ? (
// 							ReactHtmlParser(message.message_html)
// 						) : (
// 							<ReactMarkdown>{message.message_text}</ReactMarkdown>
// 						)}
// 					</MgsWrapper>
// 				</div>
// 			)}
// 		</Wrapper>
// 	)
// }

import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MessageService from '../../services/MessageService'
import { IoTrash } from 'react-icons/io5'
import ReactHtmlParser from 'react-html-parser'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Global from '../../Global'

export default function EachMessage({ message }) {
	const { user } = useSelector((state) => state.auth)

	useEffect(() => {
		if (!message.seen && message.to.id === user.user.id) {
			MessageService.updateMessageSeen(message.id)
		}
	}, [])

	if (message.from.id === user.user.id) {
		return (
			<div className="message-item outgoing-message">
				<div className="message-user">
					{/* <figure className="avatar">
						<img src="images/user-1.png" alt="image" />
					</figure> */}
					<div>
						<h5>You</h5>
						<div className="time">
							{moment(message.created_at).fromNow()}
							<i
								className={`${
									message.seen ? 'ti-double-check' : 'ti-check'
								} text-info`}
							></i>
						</div>
					</div>
				</div>
				<div className="message-wrap pb-2">
					{message.message_html ? (
						ReactHtmlParser(message.message_html)
					) : (
						<ReactMarkdown>{message.message_text}</ReactMarkdown>
					)}
				</div>
			</div>
		)
	} else {
		// INCOMING
		return (
			<div className="message-item">
				<div className="message-user">
					{/* <figure className="avatar">
						<img src="images/user-9.png" alt="image" />
					</figure> */}
					<div>
						<h5 className="font-xssss mt-2">
							{message?.from?.first_name?.split(' ')[0]}
						</h5>
						<div className="time">{moment(message.created_at).fromNow()}</div>
					</div>
				</div>
				<div className="message-wrap shadow-none pb-2">
					{message.message_html ? (
						ReactHtmlParser(message.message_html)
					) : (
						<ReactMarkdown>{message.message_text}</ReactMarkdown>
					)}
				</div>
			</div>
		)
	}
}
