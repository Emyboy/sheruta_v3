import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PaymentAlert from '../../components/PaymentAlert/PaymentAlert'
import MessageService from '../../services/MessageService'
import EachConversation from './EachConversation'

export default function MessageList() {
	const [conversations, setConversation] = useState([])
	const { payment_plan } = useSelector((state) => state.view)

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
					<b>Conversations</b>
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
				{payment_plan ? (
					<ul style={{ paddingBottom: '15vh' }}>
						{conversations.length === 0 && (
							<li className="text-center mt-5">
								<h1>Your conversations will be listed here.</h1>
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
				) : (
					<div>
						<PaymentAlert message={"Can't view messages"} />
					</div>
				)}
			</div>
		</div>
	)
}
