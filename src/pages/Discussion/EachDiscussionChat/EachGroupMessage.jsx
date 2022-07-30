import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import EachDiscussionOptions from './EachDiscussionOptions'
import EachDiscussionEdit from './EachDiscussionEdit'
import EachDiscussionContainer from './EachDiscussionContainer'
import DiscussionDeleteAction from './DiscussionDeleteAction'

export default function EachGroupMessage({ message, outgoing }) {
	const [showEdit, setShowEdit] = useState(false)
	const [showDelete, setShowDelete] = useState(false)

	if (showEdit) {
		return <EachDiscussionEdit />
	}

	if (showDelete) {
		return <DiscussionDeleteAction />
	}

	const EachMessageProps = {
		message,
		askDelete: () => setShowDelete(true),
	}

	if (outgoing) {
		return <OutgoingGroupChat {...EachMessageProps} />
	}
	return <EachIncomingGroupChat {...EachMessageProps} />
}

export function OutgoingGroupChat({ message, askDelete }) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user
	return (
		<EachDiscussionContainer outgoing>
			<div className="d-flex align-items-center justify-content-between">
				<h5 className="fw-bold m-0">{_user.first_name}</h5>
				<EachDiscussionOptions onDeleteClick={() => askDelete()} />
			</div>
			<Reply />
			<p>{message}</p>
			<i>
				<small className="text-grey-600">{moment(new Date()).fromNow()}</small>
			</i>
		</EachDiscussionContainer>
	)
}

export function EachIncomingGroupChat({ message }) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user
	return (
		<EachDiscussionContainer outgoing={false}>
			<div>
				<div className="d-flex align-items-center justify-content-between">
					<h5 className="fw-bold m-0">{_user.first_name}</h5>
					<EachDiscussionOptions />
				</div>
				<Reply />
				<p>{message}</p>
				<i>
					<small className="text-grey-600">
						{moment(new Date()).fromNow()}
					</small>
				</i>
			</div>
		</EachDiscussionContainer>
	)
}

const Reply = () => {
	return (
		<div
			className="card p-2 mb-2 rounded-xxxl mt-2"
			style={{ background: '#f3fffd' }}
		>
			<div className="d-flex align-items-center justify-content-between mb-1">
				<small>
					<i className="fw-600 m-0 text-grey-500">The person's name</i>
				</small>
				<small className="m-0 text-grey-500">4 mins ago</small>
			</div>
			<i>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate
				rer autem unde! Mollitia.
			</i>
		</div>
	)
}
