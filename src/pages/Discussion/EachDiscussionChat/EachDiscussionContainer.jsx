import React from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Global from '../../../Global'
import { useParams } from 'react-router'

const InComingChat = styled.article`
	background-color: ${(props) => `${props.outgoing ? '#e3ffe2' : '#f0f0f0'}`};
`

export default function EachDiscussionContainer({
	children,
	outgoing,
	from,
	isNew,
	message,
}) {
	const { user } = useSelector((state) => state.auth)
	const { message_id } = useParams()
	const _user = user?.user
	return (
		<div
			className={`mb-4 mr-3 ${
				message_id &&
				message_id == message?.id &&
				'p-2 animate__flash animate__animated animate__delay-2s bg-theme-light'
			}`}
			id={`reply-${message?.id}`}
		>
			<div
				className={`d-flex justify-content-${
					outgoing ? 'end' : 'start'
				} align-items`}
			>
				{!outgoing && (
					<div className="ml-2 mr-2 mb-2">
						<div
							className={`rounded-xl ${
								from.online ? 'bg-success' : 'bg-danger'
							}`}
							style={{ padding: 2 }}
						>
							<Avatar src={from.avatar_url} size={40} />
						</div>
					</div>
				)}
				<InComingChat
					outgoing={outgoing}
					className={`rounded shadow-sm border p-2 ${
						isNew ? 'animate__bounceInUp animate__animated ' : ''
					}`}
					style={{
						maxWidth: Global.isMobile ? '90%' : '80%',
						minWidth: Global.isMobile ? '200px' : '150px',
					}}
				>
					{children}
				</InComingChat>
			</div>
		</div>
	)
}
