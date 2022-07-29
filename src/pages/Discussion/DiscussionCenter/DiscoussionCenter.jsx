import React from 'react'
import { IoSend } from 'react-icons/io5'

import { useSelector } from 'react-redux'
import DiscussionCenterHeader from './DiscussionCenterHeader'
import EachGroupMessage from '../EachDiscussionChat/EachGroupMessage'
import EachDiscussionNotification from '../DiscussionNotificatioin/EachDiscussionNotification'
import Global from '../../../Global'

export default function DiscussionCenter() {
	const { user } = useSelector((state) => state.auth)

	const _user = user?.user
	return (
		<div
			className="bg-white d-flex flex-column justify-content-between"
			style={{ height: '99vh' }}
		>
			<DiscussionCenterHeader />
			<div
				className="d-flex flex-column algin-items-start justify-content-start scroll-bar pt-4"
				style={{ height: '100%' }}
			>
				<EachGroupMessage message={"Hi everyone I'm new here 👋🏽"} outgoing />
				<EachGroupMessage message={"Welcome bro, hows's things??"} />
				<EachGroupMessage
					message={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
							voluptate enim dolorum explicabo aperiam tempora sed quo ut
							quisquam! Voluptate illum placeat inventore aliquam odio omnis
							aspernatur debitis libero facilis.`}
					outgoing
				/>
				<EachDiscussionNotification
					notification={'Josh just joined the group'}
				/>
				<EachGroupMessage
					message={'Come this place is not for nonsense talk 🙄'}
				/>
				<EachGroupMessage message={'mad 😂😂🤣'} outgoing />
				<EachGroupMessage message={"Hi everyone I'm new here 👋🏽"} />
				<EachDiscussionNotification
					notification={`dolorum explicabo aperiam tempora sed quo ut
							quisquam! Voluptate illum placeat inventore aliquam odio omnis
							aspernatur debitis libero `}
				/>
				<EachGroupMessage message={"Welcome bro, hows's things??"} />
				<EachGroupMessage
					message={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
							voluptate enim dolorum explicabo aperiam tempora sed quo ut
							quisquam! Voluptate illum placeat inventore aliquam odio omnis
							aspernatur debitis libero facilis.`}
				/>
				<EachGroupMessage
					message={'Come this place is not for nonsense talk 🙄'}
				/>
				<EachGroupMessage message={'mad 😂😂🤣'} />
				<div style={{ paddingTop: Global.isMobile ? '30vh' : '15vh' }} />
			</div>
			<div
				className="bg-white p-3 border-top"
				style={
					Global.isMobile
						? { position: 'absolute', bottom: 0, left: 0, right: 0 }
						: null
				}
			>
				<div className="bg-grey p-2 rounded-xl d-flex">
					<input
						className="form-control border-0 bg-grey rounded-xl font-xs"
						placeholder="Start typing..."
					/>
					<button
						className="btn bg-accent text-white align-self-start"
						style={{ borderRadius: '50px', height: '50px', width: '50px' }}
					>
						<IoSend size={24} />
					</button>
				</div>
			</div>
		</div>
	)
}
