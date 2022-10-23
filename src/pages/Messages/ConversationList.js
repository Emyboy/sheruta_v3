import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { Dots } from 'react-activity'
import { useSelector } from 'react-redux'
import PaymentAlert from '../../components/PaymentAlert/PaymentAlert'
import MessageService from '../../services/MessageService'
import EachConversation from './EachConversation'
import { BsFillChatDotsFill } from 'react-icons/bs'

export default function MessageList() {
	const { conversations } = useSelector((state) => state.view)
	const { payment_plan } = useSelector((state) => state.view)
	const [loading, setLoading] = useState(true)


	return (
		<div className="card mt-4 " style={{ height: '80vh' }}>
			<div className="card-header">
				<h1>
					<b>Messages</b>
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
				{console.log('CONV --', conversations)}
				<ul style={{ paddingBottom: '15vh' }}>
					{conversations.length === 0 && (
						<li className="text-center mt-5">
							<BsFillChatDotsFill size={80} className="mb-3" />
							<h3>Your messages will be listed here.</h3>
							<h6>
								Click on the message button on someone's <br /> profile to start
								a conversation.
							</h6>
							{loading && (
								<div className="text-center">
									<Dots />
								</div>
							)}
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
