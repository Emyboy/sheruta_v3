import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import MessageService from '../../services/MessageService'
import EachConversation from './EachConversation'

export default function MessageList() {
	const [conversations, setConversation] = useState([])

	const getConversation = async () => {
		try {
			const convs = await MessageService.getUserConversations()
			setConversation(convs)
		} catch (error) {
			notification.error({ message: 'Error loading messages' })
		}
	}

	useEffect(() => {
		getConversation()
	}, [])

	return (
		<div className="card mt-4 " style={{ height: '80vh' }}>
			<div className="card-header">
				<h1>
					<b >Conversations</b>
				</h1>
			</div>
			<div className="card-body scroll-bar">
				<div className="iu_heading">
					<div className="candidate_revew_search_box">
						{/* <form className="form-inline"> 
                        <input
                            className="form-control w-100 border-gray rounded"
                            type="search"
                            placeholder="Search Chat"
                            aria-label="Search"
                            autoFocus
                        />
                    </form> */}
					</div>
				</div>
				<ul style={{ paddingBottom: '15vh' }}>
					{conversations.length === 0 && (
						<li className="text-center mt-5">
							<h3>Your conversations will be listed here.</h3>
							<h6>
								Click on the message button on someone's profile to start a
								conversation.
							</h6>
						</li>
					)}
					{conversations.map((val, i) => {
						return <EachConversation key={'conv-' + i} conv={val} />
					})}
				</ul>
			</div>
		</div>
	)
}
