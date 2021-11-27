import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EachConversation from '../../pages/Messages/EachConversation'
import { getAllSuggestionsByStatus } from '../../redux/strapi_actions/alice.actions'
import { getAllConversations } from '../../redux/strapi_actions/view.action'

export default function MessagePanel({ show }) {
	const dispatch = useDispatch()
	const { conversations } = useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)
	const { accepted_suggestions } = useSelector((state) => state.alice)

	useEffect(() => {
		if (show) {
			dispatch(getAllConversations())
			dispatch(getAllSuggestionsByStatus('accepted'))
		}
	}, [show])

	return (
		<div
			className={`right-chat nav-wrap mt-2 right-scroll-bar ${
				show && 'active-sidebar'
			}`}
			style={{ zIndex: 5 }}
		>
			<div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
				

				<div className="section full pe-3 ps-4 pt-4 position-relative _feed-body">
					<h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
						MESSAGES
					</h4>
					<ul className="list-group list-group-flush">
						{conversations && conversations.length === 0 && (
							<li className="text-center">
								<h6 className='text-muted'>No conversations yet</h6>
							</li>
						)}
						{conversations &&
							conversations.map((val, i) => {
								return <EachConversation conv={val} key={`conv-${i}`} />
							})}
					</ul>
				</div>
				<div className="section full pe-3 ps-4 pt-4 pb-4 position-relative _feed-body">
					<h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
						CONTACTS
					</h4>
					<ul className="list-group list-group-flush">
						{accepted_suggestions && accepted_suggestions.length === 0 && (
							<li className="text-center">
								<h6 className='text-muted'>No contacts yet</h6>
							</li>
						)}
						{accepted_suggestions &&
							accepted_suggestions
								.sort(
									(a, b) =>
										new Date(b.updated_at).getTime() -
										new Date(a.updated_at).getTime()
								)
								.map((val, i) => {
									const otherUser = val?.users_permissions_user
									return (
										<li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
											<span className="btn-round-sm me-3 ls-3 text-white font-xssss fw-700">
												<img
													src={otherUser?.avatar_url}
													alt="image"
													className="w35 rounded-3"
												/>
											</span>
											<h3 className="fw-700 mb-0 mt-0">
												<Link
													to={`/messages/new/${otherUser?.id}`}
													className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
												>
													{otherUser?.first_name}
												</Link>
											</h3>
											<span
												className={`shadow bg-${
													otherUser.online ? 'success' : 'danger'
												} ms-auto btn-round-xss`}
											></span>
										</li>
									)
								})}
					</ul>
				</div>
				{/* <div className="section full pe-3 ps-4 pt-0 pb-4 position-relative _feed-body">
					<h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
						Pages
					</h4>
					<ul className="list-group list-group-flush">
						<li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
							<span className="btn-round-sm bg-primary-gradiant me-3 ls-3 text-white font-xssss fw-700">
								UD
							</span>
							<h3 className="fw-700 mb-0 mt-0">
								<a
									className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
									href="#"
								>
									Armany Seary
								</a>
							</h3>
							<span className="bg-success ms-auto btn-round-xss"></span>
						</li>
						<li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
							<span className="btn-round-sm bg-gold-gradiant me-3 ls-3 text-white font-xssss fw-700">
								UD
							</span>
							<h3 className="fw-700 mb-0 mt-0">
								<a
									className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
									href="#"
								>
									Entropio Inc
								</a>
							</h3>
							<span className="bg-success ms-auto btn-round-xss"></span>
						</li>
					</ul>
				</div> */}
			</div>
		</div>
	)
}
