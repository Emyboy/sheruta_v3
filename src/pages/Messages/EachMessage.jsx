import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MessageService from '../../services/MessageService'
import { IoTrash } from 'react-icons/io5'
import ReactHtmlParser from 'react-html-parser'


export default function EachMessage({ message }) {
	const { user } = useSelector((state) => state.auth)

	useEffect(() => {
		if (!message.seen && message.to.id === user.user.id) {
			MessageService.updateMessageSeen(message.id)
		}
	}, [])

	return (
		<>
			{message.from.id === user.user.id ? (
				<div className="message-item outgoing-message z-index-0">
					<div className="message-user">
						<div>
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
					<div
						className="message-wrap pt-1 pb-1 shadow-sm "
						// style={{ background: 'pink' }}
					>
						{message.message_html
							? ReactHtmlParser(message.message_html)
							: message.message_text}
					</div>
					{/* <span className="badge badge-danger rounded-circle position-fixed p-1  mt-1">
						<IoTrash />
					</span> */}
				</div>
			) : (
				<div className="message-item">
					<div className="message-user">
						<div>
							{/* <h5>Byrom Guittet</h5> */}
							<div className="time">{moment(message.created_at).fromNow()}</div>
						</div>
					</div>
					<div className="message-wrap pt-1 pb-1 shadow">
						{message.message_html
							? ReactHtmlParser(message.message_html)
							: message.message_text}
					</div>
				</div>
			)}
		</>
	)
}
