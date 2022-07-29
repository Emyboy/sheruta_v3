import React from 'react'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Global from '../../../Global'

const InComingChat = styled.article`
	background-color: ${(props) => `${props.outgoing ? '#e3ffe2' : '#f0f0f0'}`};
`

export default function EachDiscussionContainer({ children, outgoing }) {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user
	return (
		<div className="mb-4 mr-3">
			<div
				className={`d-flex justify-content-${
					outgoing ? 'end' : 'start'
				} align-items`}
			>
				{!outgoing && (
					<div className="ml-2 mr-2 mb-2">
						<div
							className={`rounded-xl ${
								_user.is_online ? 'bg-success' : 'bg-danger'
							}`}
							style={{ padding: 2 }}
						>
							<Avatar src={_user.avatar_url} size={40} />
						</div>
					</div>
				)}
				<InComingChat
					outgoing={outgoing}
					className="rounded p-2"
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
