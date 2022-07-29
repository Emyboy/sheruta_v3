import React, { useState } from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import Global from '../../../Global'
import styled from 'styled-components'
import { HiDotsVertical } from 'react-icons/hi'
import moment from 'moment'
import EachDiscussionOptions from './EachDiscussionOptions'
import EachDiscussionEdit from './EachDiscussionEdit'
import EachDiscussionContainer from './EachDiscussionContainer'

const OutgoingChat = styled.article`
	/* background-color: #edeeed; */
`

export default function EachGroupMessage({ message, outgoing }) {
	const [showEdit, setShowEdit] = useState(false)

	if (showEdit) {
		return <EachDiscussionEdit />
	}

	if (outgoing) {
		return <OutgoingGroupChat message={message} />
	}
	return <EachIncomingGroupChat message={message} />
}

export function OutgoingGroupChat({ message }) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user
	return (
		<EachDiscussionContainer outgoing>
			<div className="d-flex align-items-center justify-content-between">
				<h5 className="fw-bold m-0">{_user.first_name}</h5>
				<EachDiscussionOptions />
			</div>
			<p>{message}</p>
			<i>
				<small className='text-grey-600'>{moment(new Date()).fromNow()}</small>
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
				<p>{message}</p>
				<i>
					<small className='text-grey-600'>{moment(new Date()).fromNow()}</small>
				</i>
			</div>
		</EachDiscussionContainer>
	)
}
