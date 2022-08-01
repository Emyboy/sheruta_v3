import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import EachDiscussionOptions from './EachDiscussionOptions'
import EachDiscussionEdit from './EachDiscussionEdit'
import EachDiscussionContainer from './EachDiscussionContainer'
import DiscussionDeleteAction from './DiscussionDeleteAction'
import { setGroupState } from '../../../redux/strapi_actions/group.action'
import renderHTML from 'react-render-html'
import styled from 'styled-components'

const MessageBody = styled.div`
	a {
		color: blue !important;
		font-weight: bold;
	}
	img {
		border-radius: 10px;
	}
`

export default function EachGroupMessage({ data, outgoing }) {
	const [showEdit, setShowEdit] = useState(false)
	const [showDelete, setShowDelete] = useState(false)
	const [messageData, setMessageData] = useState(data)
	const [deleted, setDeleted] = useState(false)

	if (deleted) {
		return null
	}

	if (showEdit) {
		return (
			<EachDiscussionEdit
				message={messageData}
				done={(e) => {
					setMessageData(e)
					setShowEdit(false)
				}}
			/>
		)
	}

	if (showDelete) {
		return (
			<DiscussionDeleteAction
				onCancel={() => setShowDelete(false)}
				done={() => setDeleted(true)}
				message={messageData}
			/>
		)
	}

	const EachMessageProps = {
		askDelete: () => setShowDelete(true),
		data: messageData,
		setShowEdit,
	}

	if (outgoing) {
		return <OutgoingGroupChat {...EachMessageProps} />
	}
	return <EachIncomingGroupChat {...EachMessageProps} />
}

export function OutgoingGroupChat({ askDelete, data, setShowEdit }) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user
	return (
		<EachDiscussionContainer outgoing from={data.from} isNew={data?.new}>
			<div className="d-flex align-items-center justify-content-between">
				<h5 className="fw-500 text-grey-600 m-0">{data.from.first_name}</h5>
				<EachDiscussionOptions
					onDeleteClick={() => askDelete()}
					onEditClick={() => setShowEdit(true)}
					editable
				/>
			</div>
			{data.reply && <Reply reply={data.reply} />}
			<MessageBody className='fw-500 text-black'>
				{renderHTML(data.message_text)}
			</MessageBody>
			<i>
				<small className="text-grey-600">
					{moment(data?.created_at).fromNow()}
				</small>
			</i>
		</EachDiscussionContainer>
	)
}

export function EachIncomingGroupChat({ askDelete, data }) {
	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const _user = user?.user
	return (
		<EachDiscussionContainer outgoing={false} from={data.from}>
			<div>
				<div className="d-flex align-items-center justify-content-between">
					<h5 className="fw-500 text-grey-600 m-0">{data.from.first_name}</h5>
					<EachDiscussionOptions
						onDeleteClick={() => askDelete()}
						onReply={() => dispatch(setGroupState({ reply: data }))}
					/>
				</div>
				{data.reply && <Reply reply={data.reply} />}
				<MessageBody className='fw-500 text-black'>{renderHTML(data.message_text)}</MessageBody>
				<i>
					<small className="text-grey-600">
						{moment(data?.created_at).fromNow()}
					</small>
				</i>
			</div>
		</EachDiscussionContainer>
	)
}

const Reply = ({ reply }) => {
	const from = reply?.from
	// console.log(reply)
	return (
		<div
			className="card p-2 mb-2 rounded-xxxl mt-2"
			style={{ background: '#f3fffd' }}
		>
			<div className="d-flex align-items-center justify-content-between mb-1">
				<small>
					<i className="fw-600 m-0 text-grey-500">{from?.first_name}</i>
				</small>
				<small className="m-0 text-grey-500">
					{moment(reply.created_at).fromNow()}
				</small>
			</div>
			<i>
				{renderHTML(
					reply?.message_text.length > 300
						? String(reply?.message_text.slice(0, 300) + ' ...')
						: reply?.message_text
				)}
			</i>
		</div>
	)
}
